const admin = require('firebase-admin');
const dotenv = require('dotenv');
const serviceAccount = require('../serviceAccountKey.json'); // Path to your service account key

dotenv.config();

const initializeFirebaseAdmin = () => {
  try {
    // Check if we already initialized Firebase
    if (admin.apps.length) return admin;
    
    // Initialize the admin SDK if not already initialized
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
    }

    // Get Firestore instance
    const db = admin.firestore();
    
    // Set Firestore settings
    db.settings({ timestampsInSnapshots: true });

    console.log('Firebase Admin SDK initialized successfully');
    return admin;
  } catch (error) {
    console.error('Error initializing Firebase Admin SDK:', error);
    
    // For development environment, provide a fallback - will work with warnings
    if (process.env.NODE_ENV === 'development' && !admin.apps.length) {
      const firebaseApp = admin.initializeApp({
        projectId: process.env.FIREBASE_PROJECT_ID || 'dev-project',
      });
      console.log('Firebase Admin SDK initialized in development mode (limited functionality)');
      return admin;
    }
    throw error;
  }
};

// Create Firestore collection references
const getFirestore = () => {
  return admin.firestore();
};

const collections = {
  users: () => getFirestore().collection('users'),
  bins: () => getFirestore().collection('bins'),
  binData: () => getFirestore().collection('binData'),
  notifications: () => getFirestore().collection('notifications'),
  fcmTokens: () => getFirestore().collection('fcmTokens')
};

// Function to send FCM notification to a specific user
const sendFcmNotification = async (userId, notification) => {
  try {
    // Get the user's FCM tokens
    const tokensSnapshot = await collections.fcmTokens()
      .where('userId', '==', userId)
      .get();
    
    if (tokensSnapshot.empty) {
      console.log(`No FCM tokens found for user ${userId}`);
      return { success: false, error: 'No FCM tokens found for user' };
    }
    
    const tokens = [];
    tokensSnapshot.forEach(doc => {
      const data = doc.data();
      if (data.token) {
        tokens.push(data.token);
      }
    });
    
    if (tokens.length === 0) {
      console.log(`No valid FCM tokens found for user ${userId}`);
      return { success: false, error: 'No valid FCM tokens found for user' };
    }
    
    // Default notification structure
    const message = {
      notification: {
        title: notification.title || 'Smart Bin Alert',
        body: notification.body || 'Your bin requires attention',
      },
      data: notification.data || {},
      tokens: tokens,
    };
    
    // Send the notification
    const response = await admin.messaging().sendMulticast(message);
    
    console.log(`${response.successCount} messages were sent successfully`);
    
    // Check for failures
    if (response.failureCount > 0) {
      const failedTokens = [];
      response.responses.forEach((resp, idx) => {
        if (!resp.success) {
          failedTokens.push({
            token: tokens[idx],
            error: resp.error.code
          });
          
          // If token is invalid, remove it from database
          if (resp.error.code === 'messaging/invalid-argument' || 
              resp.error.code === 'messaging/invalid-registration-token' || 
              resp.error.code === 'messaging/registration-token-not-registered') {
            collections.fcmTokens()
              .where('token', '==', tokens[idx])
              .get()
              .then(snapshot => {
                snapshot.forEach(doc => {
                  doc.ref.delete();
                });
              });
          }
        }
      });
      console.log('Failed tokens:', failedTokens);
      return { success: true, successCount: response.successCount, failureCount: response.failureCount };
    }
    
    return { success: true, successCount: response.successCount };
  } catch (error) {
    console.error('Error sending FCM notification:', error);
    return { success: false, error: error.message };
  }
};

// Function to send bin overflow notification to the bin owner
const sendBinOverflowNotification = async (binId, fillPercentage, location) => {
  try {
    // Get the bin document to find the owner
    const binSnapshot = await collections.bins().where('binId', '==', binId).get();
    
    if (binSnapshot.empty) {
      console.log(`Bin ${binId} not found`);
      return { success: false, error: 'Bin not found' };
    }
    
    let owner = null;
    binSnapshot.forEach(doc => {
      const data = doc.data();
      owner = data.owner;
    });
    
    if (!owner) {
      console.log(`No owner found for bin ${binId}`);
      return { success: false, error: 'No owner found for bin' };
    }
    
    // Create notification object
    const notification = {
      title: `⚠️ Bin #${binId} is full!`,
      body: `The bin at ${location || 'unknown location'} is ${fillPercentage}% full and requires attention.`,
      data: {
        binId: binId,
        fillPercentage: String(fillPercentage),
        location: location || '',
        timestamp: new Date().toISOString(),
        type: 'overflow'
      }
    };
    
    // Send notification
    return await sendFcmNotification(owner, notification);
  } catch (error) {
    console.error('Error sending bin overflow notification:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  admin,
  db: getFirestore,
  collections,
  initializeFirebaseAdmin,
  sendFcmNotification,
  sendBinOverflowNotification
}; 