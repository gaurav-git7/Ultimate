const express = require('express');
const router = express.Router();
const { admin, collections } = require('../config/firebase');
const { authenticateUser, isAdmin } = require('./userRoutes');

// Get all bins (with filtering)
router.get('/', authenticateUser, async (req, res) => {
  try {
    const { 
      wasteType, 
      status, 
      fillLevel, 
      location, 
      owner,
      limit = 20,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;
    
    let query = collections.bins();
    
    // Apply filters if provided
    if (wasteType) {
      query = query.where('wasteType', '==', wasteType);
    }
    
    if (status) {
      query = query.where('status.alert', '==', status);
    }
    
    // If not admin, only show user's bins
    if (req.dbUser.role !== 'admin') {
      query = query.where('owner', '==', req.user.uid);
    } else if (owner) {
      query = query.where('owner', '==', owner);
    }
    
    // Note: Firestore doesn't support multiple inequality filters on different fields
    // So we'll need to do some filtering in memory for fill level and location
    
    // Fetch bins
    const snapshot = await query.get();
    let bins = [];
    
    snapshot.forEach(doc => {
      const binData = doc.data();
      binData.id = doc.id;
      bins.push(binData);
    });
    
    // Additional filtering that couldn't be done in Firestore query
    if (fillLevel) {
      const [operator, value] = fillLevel.split(':');
      const numValue = Number(value);
      
      if (operator === 'gt') {
        bins = bins.filter(bin => bin.status.fillLevel > numValue);
      } else if (operator === 'lt') {
        bins = bins.filter(bin => bin.status.fillLevel < numValue);
      } else {
        bins = bins.filter(bin => bin.status.fillLevel === Number(fillLevel));
      }
    }
    
    if (location) {
      const searchTerm = location.toLowerCase();
      bins = bins.filter(bin => 
        bin.location.address.toLowerCase().includes(searchTerm)
      );
    }
    
    // Sort bins
    bins.sort((a, b) => {
      const aValue = a[sortBy] || a.createdAt;
      const bValue = b[sortBy] || b.createdAt;
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : 1;
      } else {
        return aValue > bValue ? -1 : 1;
      }
    });
    
    // Apply limit
    bins = bins.slice(0, parseInt(limit));
    
    // Populate owner data
    const ownerIds = [...new Set(bins.map(bin => bin.owner))];
    const ownerDocs = await Promise.all(
      ownerIds.map(id => collections.users().doc(id).get())
    );
    
    const ownerData = {};
    ownerDocs.forEach(doc => {
      if (doc.exists) {
        const data = doc.data();
        ownerData[doc.id] = {
          displayName: data.displayName,
          email: data.email
        };
      }
    });
    
    // Add owner data to bins
    bins = bins.map(bin => ({
      ...bin,
      ownerData: ownerData[bin.owner] || null
    }));
    
    res.status(200).json(bins);
  } catch (error) {
    console.error('Error fetching bins:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get bin by ID
router.get('/:id', authenticateUser, async (req, res) => {
  try {
    const binDoc = await collections.bins().doc(req.params.id).get();
    
    if (!binDoc.exists) {
      return res.status(404).json({ message: 'Bin not found' });
    }
    
    const binData = binDoc.data();
    binData.id = binDoc.id;
    
    // Check ownership if not admin
    if (req.dbUser.role !== 'admin' && binData.owner !== req.user.uid) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Populate owner data
    if (binData.owner) {
      const ownerDoc = await collections.users().doc(binData.owner).get();
      if (ownerDoc.exists) {
        const ownerData = ownerDoc.data();
        binData.ownerData = {
          displayName: ownerData.displayName,
          email: ownerData.email
        };
      }
    }
    
    res.status(200).json(binData);
  } catch (error) {
    console.error('Error fetching bin:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new bin
router.post('/', authenticateUser, async (req, res) => {
  try {
    const { 
      binId, 
      name, 
      location, 
      capacity, 
      wasteType,
      status = { fillLevel: 0, batteryLevel: 100 }
    } = req.body;
    
    // Validate required fields
    if (!binId || !name || !location || !capacity || !wasteType) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        required: ['binId', 'name', 'location', 'capacity', 'wasteType']
      });
    }
    
    // Check if bin with same binId already exists
    const existingBinQuery = await collections.bins().where('binId', '==', binId).get();
    if (!existingBinQuery.empty) {
      return res.status(409).json({ message: 'Bin with this ID already exists' });
    }
    
    const newBin = {
      binId,
      name,
      location,
      capacity,
      wasteType,
      status: {
        ...status,
        lastEmptied: admin.firestore.FieldValue.serverTimestamp(),
        alert: 'none'
      },
      sensorData: {
        temperature: 20,
        humidity: 50,
        weight: 0
      },
      maintenance: {
        lastMaintenance: admin.firestore.FieldValue.serverTimestamp(),
        maintenanceHistory: []
      },
      owner: req.user.uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    // Save bin to Firestore
    const binRef = await collections.bins().add(newBin);
    
    // Get saved bin with id
    const savedBinDoc = await binRef.get();
    const savedBin = savedBinDoc.data();
    savedBin.id = savedBinDoc.id;
    
    // Create notification for new bin
    const notification = {
      title: 'New Bin Added',
      message: `A new ${wasteType} bin "${name}" has been added to your account.`,
      type: 'success',
      priority: 'medium',
      isRead: false,
      user: req.user.uid,
      relatedBin: savedBinDoc.id,
      category: 'bin',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    await collections.notifications().add(notification);
    
    res.status(201).json(savedBin);
  } catch (error) {
    console.error('Error creating bin:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update bin
router.put('/:id', authenticateUser, async (req, res) => {
  try {
    const binDoc = await collections.bins().doc(req.params.id).get();
    
    if (!binDoc.exists) {
      return res.status(404).json({ message: 'Bin not found' });
    }
    
    const bin = binDoc.data();
    
    // Check ownership if not admin
    if (req.dbUser.role !== 'admin' && bin.owner !== req.user.uid) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const {
      name,
      location,
      capacity,
      wasteType,
      status
    } = req.body;
    
    // Update fields if provided
    const updateData = { updatedAt: admin.firestore.FieldValue.serverTimestamp() };
    if (name) updateData.name = name;
    if (location) updateData.location = location;
    if (capacity) updateData.capacity = capacity;
    if (wasteType) updateData.wasteType = wasteType;
    
    if (status) {
      // Use a FieldValue to merge the status object rather than replace it
      const currentStatus = bin.status || {};
      updateData.status = { ...currentStatus, ...status };
      
      // Calculate alert status based on fill level
      if (status.fillLevel !== undefined) {
        const fillLevel = status.fillLevel;
        if (fillLevel >= 90) {
          updateData.status.alert = 'critical';
        } else if (fillLevel >= 75) {
          updateData.status.alert = 'warning';
        } else {
          updateData.status.alert = 'none';
        }
      }
    }
    
    await collections.bins().doc(req.params.id).update(updateData);
    
    // Get updated bin data
    const updatedBinDoc = await collections.bins().doc(req.params.id).get();
    const updatedBin = updatedBinDoc.data();
    updatedBin.id = updatedBinDoc.id;
    
    res.status(200).json(updatedBin);
  } catch (error) {
    console.error('Error updating bin:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update bin sensor data
router.patch('/:id/sensor', authenticateUser, async (req, res) => {
  try {
    const { fillLevel, batteryLevel, temperature, humidity, weight } = req.body;
    
    const binDoc = await collections.bins().doc(req.params.id).get();
    
    if (!binDoc.exists) {
      return res.status(404).json({ message: 'Bin not found' });
    }
    
    const bin = binDoc.data();
    
    // Check ownership if not admin
    if (req.dbUser.role !== 'admin' && bin.owner !== req.user.uid) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Update sensor data
    const updates = { updatedAt: admin.firestore.FieldValue.serverTimestamp() };
    
    if (fillLevel !== undefined) {
      updates['status.fillLevel'] = fillLevel;
      
      // Set alert level based on fill level
      if (fillLevel >= 90) {
        updates['status.alert'] = 'critical';
      } else if (fillLevel >= 75) {
        updates['status.alert'] = 'warning';
      } else {
        updates['status.alert'] = 'none';
      }
    }
    
    if (batteryLevel !== undefined) updates['status.batteryLevel'] = batteryLevel;
    if (temperature !== undefined) updates['sensorData.temperature'] = temperature;
    if (humidity !== undefined) updates['sensorData.humidity'] = humidity;
    if (weight !== undefined) updates['sensorData.weight'] = weight;
    
    await collections.bins().doc(req.params.id).update(updates);
    
    // Get updated bin data
    const updatedBinDoc = await collections.bins().doc(req.params.id).get();
    const updatedBin = updatedBinDoc.data();
    updatedBin.id = updatedBinDoc.id;
    
    // Create notification if fill level is high
    if (fillLevel !== undefined && fillLevel >= 80) {
      const notification = {
        title: 'Bin Almost Full',
        message: `Bin "${bin.name}" has reached ${fillLevel}% capacity and needs to be emptied soon.`,
        type: 'warning',
        priority: fillLevel >= 90 ? 'high' : 'medium',
        isRead: false,
        user: bin.owner,
        relatedBin: req.params.id,
        category: 'alert',
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      };
      
      await collections.notifications().add(notification);
    }
    
    // Create notification for low battery
    if (batteryLevel !== undefined && batteryLevel <= 20) {
      const notification = {
        title: 'Low Battery Alert',
        message: `Bin "${bin.name}" battery level is at ${batteryLevel}% and needs to be charged soon.`,
        type: 'warning',
        priority: batteryLevel <= 10 ? 'high' : 'medium',
        isRead: false,
        user: bin.owner,
        relatedBin: req.params.id,
        category: 'alert',
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      };
      
      await collections.notifications().add(notification);
    }
    
    res.status(200).json(updatedBin);
  } catch (error) {
    console.error('Error updating bin sensor data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Record bin emptying
router.post('/:id/empty', authenticateUser, async (req, res) => {
  try {
    const binDoc = await collections.bins().doc(req.params.id).get();
    
    if (!binDoc.exists) {
      return res.status(404).json({ message: 'Bin not found' });
    }
    
    const bin = binDoc.data();
    
    // Check ownership if not admin
    if (req.dbUser.role !== 'admin' && bin.owner !== req.user.uid) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Get maintenance history
    const maintenanceHistory = bin.maintenance?.maintenanceHistory || [];
    
    // Create new maintenance record
    const maintenanceRecord = {
      date: admin.firestore.FieldValue.serverTimestamp(),
      action: 'emptied',
      performedBy: req.user.uid,
      notes: req.body.notes || 'Regular emptying'
    };
    
    // Update bin
    await collections.bins().doc(req.params.id).update({
      'status.fillLevel': 0,
      'status.lastEmptied': admin.firestore.FieldValue.serverTimestamp(),
      'status.alert': 'none',
      'maintenance.maintenanceHistory': admin.firestore.FieldValue.arrayUnion(maintenanceRecord),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    // Get updated bin data
    const updatedBinDoc = await collections.bins().doc(req.params.id).get();
    const updatedBin = updatedBinDoc.data();
    updatedBin.id = updatedBinDoc.id;
    
    // Create notification
    const notification = {
      title: 'Bin Emptied',
      message: `Bin "${bin.name}" has been emptied successfully.`,
      type: 'success',
      priority: 'medium',
      isRead: false,
      user: bin.owner,
      relatedBin: req.params.id,
      category: 'maintenance',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    await collections.notifications().add(notification);
    
    res.status(200).json(updatedBin);
  } catch (error) {
    console.error('Error recording bin emptying:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete bin
router.delete('/:id', authenticateUser, isAdmin, async (req, res) => {
  try {
    const binDoc = await collections.bins().doc(req.params.id).get();
    
    if (!binDoc.exists) {
      return res.status(404).json({ message: 'Bin not found' });
    }
    
    // Delete bin
    await collections.bins().doc(req.params.id).delete();
    
    // Delete related notifications
    const notificationsQuery = await collections.notifications()
      .where('relatedBin', '==', req.params.id)
      .get();
    
    const batch = admin.firestore().batch();
    
    notificationsQuery.forEach(doc => {
      batch.delete(doc.ref);
    });
    
    await batch.commit();
    
    res.status(200).json({ message: 'Bin deleted successfully' });
  } catch (error) {
    console.error('Error deleting bin:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get bin statistics
router.get('/:id/stats', authenticateUser, async (req, res) => {
  try {
    const binDoc = await collections.bins().doc(req.params.id).get();
    
    if (!binDoc.exists) {
      return res.status(404).json({ message: 'Bin not found' });
    }
    
    const bin = binDoc.data();
    
    // Check ownership if not admin
    if (req.dbUser.role !== 'admin' && bin.owner !== req.user.uid) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Calculate statistics
    const emptyCount = bin.maintenance?.maintenanceHistory?.filter(m => m.action === 'emptied').length || 0;
    
    // Convert Firestore timestamps to JavaScript Date objects
    const binCreatedAt = bin.createdAt?.toDate() || new Date();
    const lastEmptied = bin.status?.lastEmptied?.toDate() || binCreatedAt;
    
    const daysSinceCreation = Math.round((new Date() - binCreatedAt) / (1000 * 60 * 60 * 24));
    
    const avgDaysBetweenEmptying = emptyCount > 1 && daysSinceCreation > 0
      ? Math.round(daysSinceCreation / emptyCount)
      : 0;
    
    const stats = {
      totalCapacity: bin.capacity,
      currentFillLevel: bin.status.fillLevel,
      currentFillVolume: Math.round((bin.status.fillLevel / 100) * bin.capacity),
      batteryLevel: bin.status.batteryLevel,
      lastEmptied,
      totalEmptyCount: emptyCount,
      avgDaysBetweenEmptying,
      daysInOperation: daysSinceCreation,
      currentStatus: bin.status.alert !== 'none' ? 'Needs Attention' : 'Normal'
    };
    
    res.status(200).json(stats);
  } catch (error) {
    console.error('Error fetching bin statistics:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 