const express = require('express');
const router = express.Router();
const { collections, sendFcmNotification } = require('../config/firebase');
const { authenticateUser, isAdmin } = require('./userRoutes');

// Get all notifications for the current user
router.get('/', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.uid;
    
    // Get all notifications for this user, ordered by creation date (newest first)
    const notificationsQuery = await collections.notifications()
      .where('user', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();
    
    if (notificationsQuery.empty) {
      return res.status(200).json([]);
    }
    
    const notifications = [];
    notificationsQuery.forEach(doc => {
      const notificationData = doc.data();
      notifications.push({
        id: doc.id,
        ...notificationData
      });
    });
    
    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get unread notification count
router.get('/unread-count', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.uid;
    
    // Count unread notifications
    const unreadQuery = await collections.notifications()
      .where('user', '==', userId)
      .where('isRead', '==', false)
      .get();
    
    res.status(200).json({ count: unreadQuery.size });
  } catch (error) {
    console.error('Error fetching unread count:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark notification as read
router.patch('/:id/read', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.uid;
    
    // Get the notification
    const notificationDoc = await collections.notifications().doc(id).get();
    
    if (!notificationDoc.exists) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    
    // Verify the notification belongs to the current user
    const notificationData = notificationDoc.data();
    if (notificationData.user !== userId && req.dbUser.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Cannot modify another user\'s notification' });
    }
    
    // Update the notification
    await collections.notifications().doc(id).update({
      isRead: true,
      readAt: new Date().toISOString()
    });
    
    res.status(200).json({
      id,
      message: 'Notification marked as read'
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark all notifications as read
router.post('/mark-all-read', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.uid;
    
    // Get all unread notifications
    const unreadQuery = await collections.notifications()
      .where('user', '==', userId)
      .where('isRead', '==', false)
      .get();
    
    if (unreadQuery.empty) {
      return res.status(200).json({ message: 'No unread notifications' });
    }
    
    // Update all notifications in batches (Firestore has a limit of 500 operations per batch)
    const batch = collections.db().batch();
    let count = 0;
    
    unreadQuery.forEach(doc => {
      batch.update(doc.ref, {
        isRead: true,
        readAt: new Date().toISOString()
      });
      count++;
    });
    
    await batch.commit();
    
    res.status(200).json({
      message: 'All notifications marked as read',
      count
    });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a notification
router.delete('/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.uid;
    
    // Get the notification
    const notificationDoc = await collections.notifications().doc(id).get();
    
    if (!notificationDoc.exists) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    
    // Verify the notification belongs to the current user
    const notificationData = notificationDoc.data();
    if (notificationData.user !== userId && req.dbUser.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Cannot delete another user\'s notification' });
    }
    
    // Delete the notification
    await collections.notifications().doc(id).delete();
    
    res.status(200).json({
      id,
      message: 'Notification deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Send a test notification (development only)
router.post('/send-test', authenticateUser, async (req, res) => {
  try {
    // Only allow in development environment or for admins
    if (process.env.NODE_ENV !== 'development' && req.dbUser.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Test notifications allowed only in development' });
    }
    
    const { title, body, binId, fillPercentage } = req.body;
    const userId = req.user.uid;
    
    // Create notification in Firestore
    const notificationData = {
      title: title || 'Test Notification',
      message: body || 'This is a test notification',
      type: 'test',
      priority: 'normal',
      isRead: false,
      user: userId,
      relatedBin: binId || null,
      category: 'test',
      createdAt: new Date().toISOString()
    };
    
    // Add to notifications collection
    await collections.notifications().add(notificationData);
    
    // Send FCM notification
    const notification = {
      title: title || 'Test Notification',
      body: body || 'This is a test notification',
      data: {
        type: 'test',
        binId: binId || '',
        fillPercentage: fillPercentage ? String(fillPercentage) : '',
        timestamp: new Date().toISOString()
      }
    };
    
    const result = await sendFcmNotification(userId, notification);
    
    res.status(200).json({
      message: 'Test notification sent',
      result
    });
  } catch (error) {
    console.error('Error sending test notification:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 