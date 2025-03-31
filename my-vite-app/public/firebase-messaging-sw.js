// Import and configure the Firebase SDK
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// Firebase configuration with hardcoded values
// Note: Service workers cannot access environment variables, so we need to hardcode the values
firebase.initializeApp({
  apiKey: "AIzaSyAUzefEnnQsgERlBKeqfBcaY9cqGUbylkA",
  authDomain: "wastefoodmanagement-48e25.firebaseapp.com",
  projectId: "wastefoodmanagement-48e25",
  storageBucket: "wastefoodmanagement-48e25.firebasestorage.app",
  messagingSenderId: "935643868580",
  appId: "1:935643868580:web:52aa60abe42423100ce531",
  measurementId: "G-80DCRL63DY"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  // Customize notification here
  const notificationTitle = payload.notification?.title || 'Smart Bin Alert';
  const notificationOptions = {
    body: payload.notification?.body || 'Your bin needs attention!',
    icon: '/images/logo.png',
    badge: '/images/logo.png',
    data: payload.data
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  console.log('[firebase-messaging-sw.js] Notification click received', event);
  
  event.notification.close();
  
  // This looks to see if the current is already open and focuses it
  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    })
    .then((clientList) => {
      // If a dashboard tab is open, focus that; otherwise open a new tab
      let url = '/dashboard';
      if (event.notification.data && event.notification.data.binId) {
        url = `/dashboard?binId=${event.notification.data.binId}`;
      }

      for (const client of clientList) {
        if (client.url.includes('/dashboard') && 'focus' in client) {
          return client.focus();
        }
      }
      
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
}); 