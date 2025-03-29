// Browser notification service

// Check if browser notifications are supported
export const isNotificationSupported = () => {
  return 'Notification' in window;
};

// Request permission for browser notifications
export const requestNotificationPermission = async () => {
  if (!isNotificationSupported()) {
    console.log('Browser notifications not supported');
    return false;
  }

  // Request permission
  const permission = await Notification.requestPermission();
  
  // Log and return result
  console.log('Notification permission:', permission);
  return permission === 'granted';
};

// Send a browser notification
export const sendNotification = (title, options = {}) => {
  if (!isNotificationSupported()) {
    console.log('Browser notifications not supported');
    return null;
  }

  // Check permission
  if (Notification.permission !== 'granted') {
    console.log('Notification permission not granted');
    return null;
  }

  // Default notification options
  const defaultOptions = {
    icon: '/images/logo.png', // Path to your logo
    badge: '/images/logo.png',
    vibrate: [200, 100, 200],
    tag: 'smart-bin-notification', // Tag to replace existing notifications
    renotify: true, // Notify again for notifications with the same tag
    requireInteraction: true, // Keep the notification until user interacts
    silent: false
  };

  // Create and show notification
  try {
    const notification = new Notification(title, { ...defaultOptions, ...options });
    
    // Add click event handler
    notification.onclick = function() {
      window.focus();
      notification.close();
      
      // If a URL was provided, navigate to it
      if (options.url) {
        window.location.href = options.url;
      }
    };
    
    return notification;
  } catch (error) {
    console.error('Error creating notification:', error);
    return null;
  }
};

// Specific function for bin overflow notification
export const sendBinOverflowNotification = (binId, location) => {
  return sendNotification(
    `⚠️ Bin #${binId} is full!`, 
    {
      body: `The bin at ${location || 'unknown location'} requires immediate attention.`,
      url: '/dashboard',
      timestamp: new Date().getTime(),
      actions: [
        {
          action: 'view',
          title: 'View Details',
        },
        {
          action: 'schedule',
          title: 'Schedule Pickup',
        }
      ]
    }
  );
};

// Store notification settings in localStorage
export const saveNotificationSettings = (settings) => {
  localStorage.setItem('smartbin_notification_settings', JSON.stringify(settings));
};

// Get notification settings from localStorage
export const getNotificationSettings = () => {
  const settings = localStorage.getItem('smartbin_notification_settings');
  return settings ? JSON.parse(settings) : {
    enabled: true,
    threshold: 80, // Notify when bin is 80% full
    sound: true,
    vibration: true
  };
}; 