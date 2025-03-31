import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase app
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.log("Firebase already initialized:", error);
  app = getAuth().app;
}

// Initialize messaging
let messaging;
try {
  messaging = getMessaging(app);
} catch (error) {
  console.error("Error initializing Firebase messaging:", error);
}

// Function to initialize messaging
export const initializeMessaging = () => {
  if (!messaging && typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    try {
      messaging = getMessaging(app);
      console.log("Firebase messaging initialized");
    } catch (error) {
      console.error("Error initializing Firebase messaging:", error);
    }
  }
  return messaging;
};

// Request permission and get FCM token
export const requestNotificationPermission = async () => {
  try {
    if (!messaging) {
      messaging = initializeMessaging();
      if (!messaging) return null;
    }

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.log("Notification permission denied");
      return null;
    }

    const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY || "BDfWEqI_6Qk0M6YOtm86SqzuESrctZy10Ey1OAzdOfI1xlGuQhhFlj_0-tFpS1qUHJaC8vRdBrnpj2v9s1XRIUU";
    const token = await getToken(messaging, { vapidKey });
    
    if (token) {
      console.log("FCM token obtained:", token);
      return token;
    }
    return null;
  } catch (error) {
    console.error("Error getting notification permission:", error);
    return null;
  }
};

// Save FCM token to user's profile
export const saveFcmToken = async (userId, token) => {
  if (!token || !userId) return false;
  
  try {
    const response = await fetch('/api/users/fcm-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify({
        fcmToken: token,
        deviceInfo: {
          platform: navigator.platform,
          userAgent: navigator.userAgent,
          language: navigator.language
        }
      })
    });

    if (!response.ok) {
      throw new Error('Failed to save FCM token');
    }

    return true;
  } catch (error) {
    console.error("Error saving FCM token:", error);
    return false;
  }
};

// Set up message listener
export const setupMessageListener = (callback) => {
  if (!messaging) {
    messaging = initializeMessaging();
    if (!messaging) return;
  }

  onMessage(messaging, (payload) => {
    console.log("Message received:", payload);
    if (callback) callback(payload);
  });
};

// Send test notification
export const sendTestNotification = async (notification) => {
  try {
    if (!messaging) {
      messaging = initializeMessaging();
      if (!messaging) {
        throw new Error("Messaging not initialized");
      }
    }

    // Send notification using Firebase Cloud Functions
    const response = await fetch('/api/notifications/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify(notification)
    });

    if (!response.ok) {
      throw new Error('Failed to send notification');
    }

    return true;
  } catch (error) {
    console.error("Error sending notification:", error);
    throw error;
  }
}; 