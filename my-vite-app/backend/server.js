const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const { initializeFirebaseAdmin } = require('./config/firebase');
const fetch = require('node-fetch');
const admin = require('firebase-admin');

// Load environment variables
dotenv.config();

// Initialize Firebase Admin SDK
initializeFirebaseAdmin();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Utility function for standardized error responses
const sendErrorResponse = (res, status, message, error = null) => {
  console.error(`Error (${status}): ${message}`, error);
  return res.status(status).json({
    success: false,
    error: true,
    message,
    details: process.env.NODE_ENV === 'development' ? (error?.message || error) : undefined,
    timestamp: new Date().toISOString()
  });
};

// Utility function for standardized success responses
const sendSuccessResponse = (res, status, data, message = null) => {
  return res.status(status).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  });
};

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

// Import routes
const { router: userRoutes } = require('./routes/userRoutes');
const binRoutes = require('./routes/binRoutes');
const binDataRoutes = require('./routes/binDataRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const espRoutes = require('./routes/espRoutes');

// Route middleware
app.use('/api/users', userRoutes);
app.use('/api/bins', binRoutes);
app.use('/api/bin-data', binDataRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/esp', espRoutes);

// Add routes that match what the ESP8266 is trying to use
// Proxy to redirect /bins/[binId] to /api/bin-data/[binId]
app.put('/bins/:binId', (req, res) => {
  try {
    console.log(`Received data from ESP8266 for bin ${req.params.binId}`);
    
    // Forward the request to the binDataRoutes
    const binData = req.body;
    binData.binId = req.params.binId; // Ensure binId is included
    
    // Save the data directly to Firestore
    try {
      binData.timestamp = new Date().toISOString();
      binData.lastUpdated = new Date().toISOString();
      
      // Calculate status if not provided
      if (!binData.status) {
        if (binData.fillPercentage >= 80) {
          binData.status = 'critical';
        } else if (binData.fillPercentage >= 50) {
          binData.status = 'warning';
        } else {
          binData.status = 'normal';
        }
      }
      
      // Add to database
      admin.firestore().collection('bins').add(binData)
        .then(docRef => {
          console.log(`Successfully stored bin data with ID: ${docRef.id}`);
          sendSuccessResponse(res, 201, { id: docRef.id, ...binData }, "Data received successfully");
        })
        .catch(error => {
          console.error("Error storing bin data:", error);
          sendErrorResponse(res, 500, "Failed to store data", error);
        });
    } catch (error) {
      console.error("Error handling bin data:", error);
      sendErrorResponse(res, 500, "Server error processing data", error);
    }
  } catch (error) {
    console.error('Error in ESP8266 proxy route:', error);
    sendErrorResponse(res, 500, "Server error in ESP8266 route", error);
  }
});

// Proxy to redirect GET /bins/[binId] to /api/bin-data/[binId]
app.get('/bins/:binId', async (req, res) => {
  try {
    console.log(`ESP8266 requesting data for bin ${req.params.binId}`);
    const binId = req.params.binId;
    
    // Query Firestore for the actual bin data
    const querySnapshot = await admin.firestore().collection('bins')
      .where('binId', '==', binId)
      .orderBy('timestamp', 'desc')
      .limit(1)
      .get();
    
    if (querySnapshot.empty) {
      return sendErrorResponse(res, 404, `No data found for bin ${binId}`);
    }
    
    // Get the most recent document
    const binData = querySnapshot.docs[0].data();
    binData.id = querySnapshot.docs[0].id;
    
    // Return the actual data
    return sendSuccessResponse(res, 200, binData);
    
  } catch (error) {
    console.error('Error retrieving bin data:', error);
    return sendErrorResponse(res, 500, `Failed to retrieve bin data for bin ${req.params.binId}`, error);
  }
});

// POST route for creating a new bin
app.post('/bins', (req, res) => {
  try {
    console.log('Received request to create new bin');
    
    // Forward to our internal API
    const binData = req.body;
    
    // Use our existing route
    req.url = '/api/bin-data';
    req.method = 'POST';
    app._router.handle(req, res);
  } catch (error) {
    console.error('Error in ESP8266 create bin route:', error);
    sendErrorResponse(res, 500, "Error creating new bin", error);
  }
});

// POST route for bin history
app.post('/bins/:binId/history', async (req, res) => {
  try {
    console.log(`Received history data for bin ${req.params.binId}`);
    
    // Add binId to the request body
    const historyData = {
      ...req.body,
      binId: req.params.binId
    };
    
    try {
      // Store the history data directly in Firestore
      const historyDocRef = await admin.firestore().collection('binHistory').add({
        ...historyData,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      });
      
      sendSuccessResponse(res, 201, { id: historyDocRef.id, ...historyData }, "History data stored successfully");
    } catch (error) {
      console.error('Error storing history:', error);
      sendErrorResponse(res, 500, `Error storing history for bin ${req.params.binId}`, error);
    }
  } catch (error) {
    console.error('Error in history route:', error);
    sendErrorResponse(res, 500, "Server error in history route", error);
  }
});

// GET route for bin history
app.get('/bins/:binId/history', async (req, res) => {
  try {
    console.log(`ESP8266 requesting history for bin ${req.params.binId}`);
    const binId = req.params.binId;
    const limit = parseInt(req.query.limit) || 10;
    
    // Query Firestore for actual history data
    const querySnapshot = await admin.firestore().collection('binHistory')
      .where('binId', '==', binId)
      .orderBy('timestamp', 'desc')
      .limit(limit)
      .get();
    
    if (querySnapshot.empty) {
      // Fall back to main bin collection if no history collection exists
      console.log(`No history found in binHistory collection, checking bins collection`);
      const mainHistorySnapshot = await admin.firestore().collection('bins')
        .where('binId', '==', binId)
        .orderBy('timestamp', 'desc')
        .limit(limit)
        .get();
      
      if (mainHistorySnapshot.empty) {
        return sendErrorResponse(res, 404, `No history found for bin ${binId}`);
      }
      
      // Map the documents to their data
      const historyData = mainHistorySnapshot.docs.map(doc => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      
      return sendSuccessResponse(res, 200, historyData);
    }
    
    // Map the documents to their data
    const historyData = querySnapshot.docs.map(doc => {
      const data = doc.data();
      data.id = doc.id;
      return data;
    });
    
    // Return the actual history data
    return sendSuccessResponse(res, 200, historyData);
  } catch (error) {
    console.error('Error retrieving bin history:', error);
    return sendErrorResponse(res, 500, `Failed to retrieve history for bin ${req.params.binId}`, error);
  }
});

// ESP test route - accessible without authentication
app.get('/bins/test', (req, res) => {
  sendSuccessResponse(res, 200, null, 'ESP8266 server connection successful');
});

// Health check route
app.get('/health', (req, res) => {
  sendSuccessResponse(res, 200, { status: 'ok' }, 'Server is healthy');
});

// ESP8266 specific route - no authentication for hardware
app.get('/api/esp-test', (req, res) => {
  sendSuccessResponse(res, 200, null, 'ESP8266 connection successful!');
});

// Test notification endpoint
app.post('/api/send-test-notification', async (req, res) => {
  try {
    const { binId, location } = req.body;
    
    if (!binId) {
      return sendErrorResponse(res, 400, "Bin ID is required");
    }
    
    // Get actual fill level from database
    const querySnapshot = await admin.firestore().collection('bins')
      .where('binId', '==', binId)
      .orderBy('timestamp', 'desc')
      .limit(1)
      .get();
    
    let fillLevel = 0;
    let binData = null;
    if (!querySnapshot.empty) {
      binData = querySnapshot.docs[0].data();
      fillLevel = binData.fillPercentage || 0;
    }
    
    // Create test notification with actual bin data
    const { sendBinOverflowNotification } = require('./config/firebase');
    const result = await sendBinOverflowNotification(
      binId, 
      fillLevel,
      location || 'Unknown Location'
    );
    
    sendSuccessResponse(res, 200, {
      result,
      binId,
      fillLevel,
      binData,
      location: location || 'Unknown Location'
    }, 'Test notification sent');
  } catch (error) {
    console.error('Error sending test notification:', error);
    sendErrorResponse(res, 500, "Failed to send test notification", error);
  }
});

// 404 handler
app.use((req, res) => {
  sendErrorResponse(res, 404, `Route not found: ${req.method} ${req.originalUrl}`);
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  sendErrorResponse(res, 500, "Server error", err);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`ESP8266 endpoint available at: http://localhost:${PORT}/api/esp/test`);
});

module.exports = app; 