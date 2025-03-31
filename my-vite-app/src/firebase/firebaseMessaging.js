import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getAuth } from "firebase/auth";

// Firebase configuration - this should match the config in your firebase-messaging-sw.js file
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase app if it hasn't been initialized yet
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  // If Firebase is already initialized, use the existing instance
  console.log("Firebase already initialized:", error);
  app = getAuth().app;
}

// Get messaging instance
let messaging;

// Function to initialize messaging (should only be called in browser environment)
export const initializeMessaging = () => {
  try {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      messaging = getMessaging(app);
      console.log("Firebase messaging initialized");
      return messaging;
    }
  } catch (error) {
    console.error("Error initializing Firebase messaging:", error);
  }
  return null;
};

// Request permission and get FCM token
export const requestNotificationPermission = async () => {
  try {
    if (!messaging) {
      messaging = initializeMessaging();
      if (!messaging) return null;
    }

    console.log("Requesting notification permission...");
    const permission = await Notification.requestPermission();
    
    if (permission !== "granted") {
      console.log("Notification permission denied");
      return null;
    }
    
    console.log("Notification permission granted");
    
    // Get FCM token using your VAPID key
    const vapidKey = import.meta.env.VITE_vapidKey || "BDfWEqI_6Qk0M6YOtm86SqzuESrctZy10Ey1OAzdOfI1xlGuQhhFlj_0-tFpS1qUHJaC8vRdBrnpj2v9s1XRIUU";
    console.log("Using VAPID key:", vapidKey);
    
    const token = await getToken(messaging, { 
      vapidKey: vapidKey
    });
    
    if (token) {
      console.log("FCM token:", token);
      return token;
    } else {
      console.log("No registration token available");
      return null;
    }
  } catch (error) {
    console.error("Error getting notification permission:", error);
    return null;
  }
};

// Save FCM token to user's profile
export const saveFcmToken = async (userId, token) => {
  if (!token || !userId) return false;
  
  try {
    // Call our API endpoint to save the token
    const response = await fetch('/api/users/fcm-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Get token from storage
      },
      body: JSON.stringify({
        fcmToken: token,
        deviceInfo: {
          platform: navigator.platform,
          userAgent: navigator.userAgent,
          language: navigator.language
        }
      }),
    });
    
    if (response.ok) {
      console.log("FCM token saved to user profile");
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error saving FCM token:", error);
    return false;
  }
};

// Listen for incoming FCM messages
export const setupMessageListener = (callback) => {
  if (!messaging) {
    messaging = initializeMessaging();
    if (!messaging) return;
  }
  
  onMessage(messaging, (payload) => {
    console.log("Message received:", payload);
    
    // Create a notification if the app is in the foreground
    if (Notification.permission === "granted") {
      const notificationTitle = payload.notification?.title || "Smart Bin Alert";
      const notificationOptions = {
        body: payload.notification?.body || "You have a new notification",
        icon: "/images/logo.png",
        badge: "/images/logo.png",
        data: payload.data,
      };
      
      const notification = new Notification(notificationTitle, notificationOptions);
      notification.onclick = () => {
        window.focus();
        notification.close();
        
        // Handle notification click action
        if (callback && typeof callback === 'function') {
          callback(payload);
        }
      };
    }
  });
};

// For sending test notifications from the frontend (development only)
export const sendTestNotification = async (binId, location) => {
  try {
    const response = await fetch('/api/send-test-notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify({
        binId,
        location,
      }),
    });
    
    return response.ok;
  } catch (error) {
    console.error("Error sending test notification:", error);
    return false;
  }
}; 