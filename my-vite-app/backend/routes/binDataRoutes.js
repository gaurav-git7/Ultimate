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
    const binData = req.body;
    
    // Validate input
    if (!binData || !binData.binId) {
      return res.status(400).json({ message: 'Bin ID is required' });
    }
    
    // Add timestamp if not provided
    if (!binData.timestamp) {
      binData.timestamp = admin.firestore.FieldValue.serverTimestamp();
    }
    
    // Convert string timestamp to Firestore timestamp if needed
    if (typeof binData.timestamp === 'string') {
      binData.timestamp = new Date(binData.timestamp);
    }
    
    // Add bin data to Firestore
    const docRef = await collections.bins().add(binData);
    
    // Update cache
    binDataCache.set(binData.binId, binData);
    
    // Prune history to keep only the latest 10 entries
    await pruneHistoryData(binData.binId, 10);
    
    res.status(201).json({ 
      id: docRef.id, 
      ...binData,
      message: 'Bin data added successfully'
    });
  } catch (error) {
    console.error('Error creating bin data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Function to prune history data to keep only the latest n entries
const pruneHistoryData = async (binId, retentionLimit = 10) => {
  try {
    console.log(`Pruning history for bin ${binId} to keep latest ${retentionLimit} entries`);
    
    // Get all entries for the bin, sorted by timestamp descending
    const allHistoryQuery = await collections.bins()
      .where('binId', '==', binId)
      .orderBy('timestamp', 'desc')
      .get();
    
    if (allHistoryQuery.empty || allHistoryQuery.size <= retentionLimit) {
      console.log(`No pruning needed for bin ${binId}, only ${allHistoryQuery.size} entries found`);
      return;
    }
    
    // Calculate how many entries to delete
    const entriesToDelete = allHistoryQuery.size - retentionLimit;
    console.log(`Will delete ${entriesToDelete} older entries for bin ${binId}`);
    
    // Get the documents to delete (the oldest ones)
    const docsToDelete = [];
    let counter = 0;
    
    allHistoryQuery.forEach(doc => {
      // Skip the newest entries up to the retention limit
      if (counter >= retentionLimit) {
        docsToDelete.push(doc.ref);
      }
      counter++;
    });
    
    // Delete old entries in batches (Firestore has a limit of 500 operations per batch)
    if (docsToDelete.length > 0) {
      const batchSize = 500;
      let batch = admin.firestore().batch();
      let batchCount = 0;
      
      for (let i = 0; i < docsToDelete.length; i++) {
        batch.delete(docsToDelete[i]);
        batchCount++;
        
        // Commit batch if it reaches the limit
        if (batchCount >= batchSize) {
          await batch.commit();
          batch = admin.firestore().batch();
          batchCount = 0;
        }
      }
      
      // Commit any remaining operations
      if (batchCount > 0) {
        await batch.commit();
      }
      
      console.log(`Successfully pruned ${docsToDelete.length} history entries for bin ${binId}`);
    }
  } catch (error) {
    console.error(`Error pruning history data for bin ${binId}:`, error);
    // We don't throw the error as this is a background operation
  }
};

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

// Endpoint to prune bin history to keep only latest entries
router.post('/:binId/prune-history', authenticateUser, async (req, res) => {
  try {
    const { binId } = req.params;
    const limit = parseInt(req.query.limit || req.body.limit || 10);
    
    // Validate limit
    if (isNaN(limit) || limit < 1 || limit > 100) {
      return res.status(400).json({ message: 'Invalid limit. Must be between 1 and 100.' });
    }
    
    // Call pruning function
    await pruneHistoryData(binId, limit);
    
    res.status(200).json({ 
      message: `Bin history pruned successfully to latest ${limit} entries`,
      binId,
      limit
    });
  } catch (error) {
    console.error('Error pruning bin history:', error);
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