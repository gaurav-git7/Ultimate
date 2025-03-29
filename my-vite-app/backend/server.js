const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const { initializeFirebaseAdmin } = require('./config/firebase');

// Load environment variables
dotenv.config();

// Initialize Firebase Admin SDK
initializeFirebaseAdmin();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

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

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', time: new Date() });
});

// ESP8266 specific route - no authentication for hardware
app.get('/api/esp-test', (req, res) => {
  res.status(200).json({ 
    message: 'ESP8266 connection successful!',
    timestamp: new Date().toISOString()
  });
});

// Test notification endpoint
app.post('/api/send-test-notification', async (req, res) => {
  try {
    const { binId, location } = req.body;
    
    if (!binId) {
      return res.status(400).json({ error: 'Bin ID is required' });
    }
    
    // Create test notification with bin overflow
    const { sendBinOverflowNotification } = require('./config/firebase');
    const result = await sendBinOverflowNotification(
      binId, 
      90, // simulate high fill level
      location || 'Test Location'
    );
    
    res.status(200).json({ 
      success: true, 
      message: 'Test notification sent',
      result 
    });
  } catch (error) {
    console.error('Error sending test notification:', error);
    res.status(500).json({ error: 'Failed to send test notification' });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`ESP8266 endpoint available at: http://localhost:${PORT}/api/esp/test`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  // Do not crash the server, just log the error
});

module.exports = app; 