const express = require('express');
const router = express.Router();
const { admin, collections, sendBinOverflowNotification } = require('../config/firebase');
const { authenticateUser } = require('./userRoutes');

// Store for real-time bin data (in-memory cache before saving to database)
// In a production environment, you might use Redis or similar
const binDataCache = new Map();

// Get real-time data for a specific bin
router.get('/:binId', authenticateUser, async (req, res) => {
  try {
    const { binId } = req.params;
    
    // First check our in-memory cache for the most recent data
    if (binDataCache.has(binId)) {
      return res.status(200).json(binDataCache.get(binId));
    }
    
    // If not in cache, get from Firestore
    const binDataQuery = await collections.bins()
      .where('binId', '==', binId)
      .orderBy('timestamp', 'desc')
      .limit(1)
      .get();
    
    if (binDataQuery.empty) {
      return res.status(404).json({ message: 'No data found for this bin' });
    }
    
    const binData = binDataQuery.docs[0].data();
    binData.id = binDataQuery.docs[0].id;
    
    // Cache the data
    binDataCache.set(binId, binData);
    
    res.status(200).json(binData);
  } catch (error) {
    console.error('Error fetching bin data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get bin data history
router.get('/:binId/history', authenticateUser, async (req, res) => {
  try {
    const { binId } = req.params;
    const { limit = 10 } = req.query;

    try {
      // Try with compound query (requires index)
      const binDataQuery = await collections.bins()
        .where('binId', '==', binId)
        .orderBy('timestamp', 'desc')
        .limit(parseInt(limit))
        .get();
      
      if (binDataQuery.empty) {
        return res.status(404).json({ message: 'No data found for this bin' });
      }
      
      const history = [];
      binDataQuery.forEach(doc => {
        const data = doc.data();
        data.id = doc.id;
        history.push(data);
      });
      
      res.status(200).json(history);
    } catch (indexError) {
      console.error('Index error, falling back to alternative approach:', indexError);
      
      // Fallback approach - get all documents with binId and sort manually
      // This is less efficient but works without compound index
      const simpleQuery = await collections.bins()
        .where('binId', '==', binId)
        .get();
      
      if (simpleQuery.empty) {
        return res.status(404).json({ message: 'No data found for this bin' });
      }
      
      const history = [];
      simpleQuery.forEach(doc => {
        const data = doc.data();
        data.id = doc.id;
        
        // Add parsed date for sorting if timestamp exists
        if (data.timestamp) {
          // Handle Firestore timestamps
          if (data.timestamp.toDate) {
            data.parsedDate = data.timestamp.toDate();
          } else if (typeof data.timestamp === 'string') {
            data.parsedDate = new Date(data.timestamp);
          }
        }
        
        history.push(data);
      });
      
      // Sort manually by timestamp (desc)
      history.sort((a, b) => {
        if (!a.parsedDate) return 1;
        if (!b.parsedDate) return -1;
        return b.parsedDate - a.parsedDate;
      });
      
      // Limit results
      const limitedHistory = history.slice(0, parseInt(limit));
      
      // Remove parsed date before sending
      limitedHistory.forEach(item => {
        delete item.parsedDate;
      });
      
      res.status(200).json(limitedHistory);
    }
  } catch (error) {
    console.error('Error fetching bin history:', error);
    res.status(500).json({ 
      message: 'Server error', 
      details: process.env.NODE_ENV === 'development' ? error.message : undefined 
    });
  }
});

// Receive data from ESP8266
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    
    // Validate required fields
    if (!data.binId) {
      return res.status(400).json({ message: 'Missing required field: binId' });
    }
    
    if (data.distance === undefined || data.fillPercentage === undefined) {
      return res.status(400).json({ 
        message: 'Missing required fields: distance or fillPercentage' 
      });
    }
    
    // Add timestamp and default values
    const timestamp = admin.firestore.FieldValue.serverTimestamp();
    
    // Calculate status if not provided
    let status = data.status;
    if (!status) {
      if (data.fillPercentage >= 80) {
        status = 'critical';
      } else if (data.fillPercentage >= 50) {
        status = 'warning';
      } else {
        status = 'normal';
      }
    }
    
    // Create the record with all the ESP8266 data
    const binData = {
      ...data,
      status,
      timestamp,
      lastUpdated: timestamp
    };
    
    // Store in Firestore
    const docRef = await collections.bins().add(binData);
    
    // Update the in-memory cache
    binDataCache.set(data.binId, {
      ...binData,
      id: docRef.id,
      timestamp: new Date().toISOString() // Replace server timestamp for immediate use
    });
    
    // Check if this is a critical level and needs notification
    if (status === 'critical') {
      // Find the bin owner
      const binQuery = await collections.bins()
        .where('binId', '==', data.binId)
        .limit(1)
        .get();
        
      if (!binQuery.empty) {
        const bin = binQuery.docs[0].data();
        if (bin.owner) {
          // Create notification for the owner
          const notification = {
            title: 'Bin Alert: Overflow Detected',
            message: `Your bin at ${data.location || 'unknown location'} has reached ${data.fillPercentage}% capacity and needs attention.`,
            type: 'warning',
            priority: 'high',
            isRead: false,
            user: bin.owner,
            relatedBin: docRef.id,
            category: 'alert',
            createdAt: timestamp
          };
          
          await collections.notifications().add(notification);
        }
      }
    }
    
    // Check if bin is overflowing and send notification if fill percentage is > 80%
    const OVERFLOW_THRESHOLD = 80;
    if (data.fillPercentage > OVERFLOW_THRESHOLD) {
      console.log(`Bin ${data.binId} is overflowing (${data.fillPercentage}%). Sending notification.`);
      
      // Send FCM notification for overflowing bin
      const notificationResult = await sendBinOverflowNotification(
        data.binId,
        data.fillPercentage,
        data.location || 'Not specified'
      );
      
      console.log('Notification result:', notificationResult);
    }
    
    res.status(201).json({ 
      message: 'Data received successfully',
      id: docRef.id
    });
  } catch (error) {
    console.error('Error saving bin data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Clear bin data history (for testing)
router.delete('/:binId/history', authenticateUser, async (req, res) => {
  try {
    const { binId } = req.params;
    
    // Only admins can clear history
    if (req.dbUser.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can clear bin history' });
    }
    
    const binDataQuery = await collections.bins()
      .where('binId', '==', binId)
      .get();
    
    if (binDataQuery.empty) {
      return res.status(404).json({ message: 'No data found for this bin' });
    }
    
    // Delete all documents in batches of 500 (Firestore limit)
    const batch = admin.firestore().batch();
    let count = 0;
    
    binDataQuery.forEach(doc => {
      batch.delete(doc.ref);
      count++;
    });
    
    await batch.commit();
    binDataCache.delete(binId);
    
    res.status(200).json({ 
      message: 'Bin history cleared successfully',
      count
    });
  } catch (error) {
    console.error('Error clearing bin history:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all bin data
router.get('/', async (req, res) => {
    try {
        const binDataSnapshot = await collections.binData().get();
        const binData = [];
        binDataSnapshot.forEach(doc => {
            binData.push({
                id: doc.id,
                ...doc.data()
            });
        });
        res.status(200).json(binData);
    } catch (error) {
        console.error('Error fetching bin data:', error);
        res.status(500).json({ error: 'Failed to fetch bin data' });
    }
});

// Get bin data for a specific bin
router.get('/bin/:binId', async (req, res) => {
    try {
        const { binId } = req.params;
        const binDataSnapshot = await collections.binData()
            .where('binId', '==', binId)
            .orderBy('timestamp', 'desc')
            .limit(50)
            .get();

        const binData = [];
        binDataSnapshot.forEach(doc => {
            binData.push({
                id: doc.id,
                ...doc.data()
            });
        });
        res.status(200).json(binData);
    } catch (error) {
        console.error('Error fetching bin data:', error);
        res.status(500).json({ error: 'Failed to fetch bin data' });
    }
});

// Update bin data
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        
        await collections.binData().doc(id).update(updatedData);
        
        res.status(200).json({
            id,
            ...updatedData,
            message: 'Bin data updated successfully'
        });
    } catch (error) {
        console.error('Error updating bin data:', error);
        res.status(500).json({ error: 'Failed to update bin data' });
    }
});

// Delete bin data
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        await collections.binData().doc(id).delete();
        
        res.status(200).json({
            id,
            message: 'Bin data deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting bin data:', error);
        res.status(500).json({ error: 'Failed to delete bin data' });
    }
});

module.exports = router; 