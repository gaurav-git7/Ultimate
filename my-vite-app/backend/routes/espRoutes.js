const express = require('express');
const router = express.Router();
const { admin, collections } = require('../config/firebase');
const { v4: uuidv4 } = require('uuid');

// Store for real-time bin data (in-memory cache before saving to database)
// In a production environment, you might use Redis or similar
const binDataCache = new Map();

// Middleware to log all ESP8266 requests
router.use((req, res, next) => {
  console.log(`[ESP] ${req.method} ${req.originalUrl} at ${new Date().toISOString()}`);
  next();
});

// Test endpoint for ESP8266 - No authentication required
router.get('/test', (req, res) => {
  res.status(200).json({ 
    message: 'ESP8266 connection successful!',
    timestamp: new Date().toISOString()
  });
});

// Receive data from ESP8266 - No authentication required
router.post('/data', async (req, res) => {
  try {
    console.log('Received ESP8266 data:', req.body);
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
      // Create notification for all admins
      const notification = {
        title: 'Bin Alert: Overflow Detected',
        message: `Bin ${data.binId} at ${data.location || 'unknown location'} has reached ${data.fillPercentage}% capacity and needs attention.`,
        type: 'warning',
        priority: 'high',
        isRead: false,
        relatedBin: data.binId,
        category: 'alert',
        createdAt: timestamp
      };
      
      await collections.notifications().add(notification);
    }
    
    res.status(201).json({ 
      message: 'Data received successfully',
      id: docRef.id
    });
  } catch (error) {
    console.error('Error saving ESP8266 data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get bin status by ID
router.get('/bin/:binId/status', async (req, res) => {
  try {
    const { binId } = req.params;
    
    // Check cache first
    if (binDataCache.has(binId)) {
      return res.status(200).json({
        success: true,
        data: binDataCache.get(binId)
      });
    }
    
    // If not in cache, check Firestore
    const binRef = collections.bins().doc(binId);
    const binDoc = await binRef.get();
    
    if (!binDoc.exists) {
      return res.status(404).json({
        success: false,
        message: `No bin found with ID: ${binId}`
      });
    }
    
    const binData = binDoc.data();
    
    // Store in cache for future requests
    if (binData.lastReading) {
      binDataCache.set(binId, {
        ...binData.lastReading,
        timestamp: new Date(binData.lastReading.timestamp)
      });
    }
    
    res.status(200).json({
      success: true,
      data: binData
    });
  } catch (error) {
    console.error('Error getting bin status:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Register a new ESP8266 device/bin
router.post('/register', async (req, res) => {
  try {
    const { binId, name, location } = req.body;
    
    if (!binId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required field: binId'
      });
    }
    
    // Create or update bin in Firestore
    const binRef = collections.bins().doc(binId);
    const binDoc = await binRef.get();
    
    if (binDoc.exists) {
      // Update existing bin
      await binRef.update({
        name: name || `Bin ${binId}`,
        location: location || 'Unknown',
        isActive: true,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      res.status(200).json({
        success: true,
        message: `Bin ${binId} updated successfully`,
        binId
      });
    } else {
      // Create new bin
      await binRef.set({
        binId,
        name: name || `Bin ${binId}`,
        location: location || 'Unknown',
        isActive: true,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      res.status(201).json({
        success: true,
        message: `Bin ${binId} registered successfully`,
        binId
      });
    }
  } catch (error) {
    console.error('Error registering bin:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Empty a bin (reset fill level)
router.post('/bin/:binId/empty', async (req, res) => {
  try {
    const { binId } = req.params;
    const { notes } = req.body;
    
    // Update bin status in Firestore
    const binRef = collections.bins().doc(binId);
    const binDoc = await binRef.get();
    
    if (!binDoc.exists) {
      return res.status(404).json({
        success: false,
        message: `No bin found with ID: ${binId}`
      });
    }
    
    // Create emptying record
    const emptyingId = uuidv4();
    const timestamp = new Date().toISOString();
    const emptyingRecord = {
      id: emptyingId,
      binId,
      timestamp,
      notes: notes || 'Bin emptied',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    // Add to emptying-history collection
    await collections.emptyingHistory().doc(emptyingId).set(emptyingRecord);
    
    // Update bin status
    await binRef.update({
      'lastReading.fillPercentage': 0,
      'lastReading.status': 'normal',
      'lastReading.timestamp': timestamp,
      'lastEmptied': timestamp,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    // Update cache
    if (binDataCache.has(binId)) {
      const cachedData = binDataCache.get(binId);
      binDataCache.set(binId, {
        ...cachedData,
        fillPercentage: 0,
        status: 'normal',
        timestamp: new Date(timestamp)
      });
    }
    
    res.status(200).json({
      success: true,
      message: `Bin ${binId} marked as emptied`,
      emptyingId
    });
  } catch (error) {
    console.error('Error emptying bin:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

module.exports = router; 