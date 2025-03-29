const admin = require('firebase-admin');
const functions = require('firebase-functions');

// Initialize Firebase Admin SDK
admin.initializeApp();

// Import and export the email sender functions
const emailSender = require('./emailSender');

// Export all the functions
exports.processEmailNotifications = emailSender.processEmailNotifications;
exports.sendDailyReports = emailSender.sendDailyReports;

// Simple function to test if everything is working
exports.helloWorld = functions.https.onRequest((req, res) => {
  res.status(200).send('Hello from Smart Bin Firebase Functions!');
}); 