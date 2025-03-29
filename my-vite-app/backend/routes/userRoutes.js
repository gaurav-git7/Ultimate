const express = require('express');
const router = express.Router();
const { admin, collections } = require('../config/firebase');

// Middleware to verify Firebase token
const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    
    // Check if user exists in our Firestore DB
    const userDoc = await collections.users().doc(decodedToken.uid).get();
    
    // If user doesn't exist in our DB, create them
    if (!userDoc.exists) {
      const firebaseUser = await admin.auth().getUser(decodedToken.uid);
      const newUser = {
        uid: decodedToken.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName || 'User',
        photoURL: firebaseUser.photoURL,
        role: 'user', // Default role
        preferences: {
          theme: 'system',
          notifications: {
            email: true,
            push: true,
            sms: false
          }
        },
        lastLogin: admin.firestore.FieldValue.serverTimestamp(),
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        isActive: true
      };
      
      await collections.users().doc(decodedToken.uid).set(newUser);
      req.dbUser = newUser;
      req.dbUser.id = decodedToken.uid;
    } else {
      // Update last login time
      const userData = userDoc.data();
      await collections.users().doc(decodedToken.uid).update({
        lastLogin: admin.firestore.FieldValue.serverTimestamp()
      });
      
      req.dbUser = userData;
      req.dbUser.id = userDoc.id;
    }
    
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

// Middleware to check admin role
const isAdmin = (req, res, next) => {
  if (req.dbUser && req.dbUser.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Forbidden: Admin access required' });
  }
};

// Get current user profile
router.get('/profile', authenticateUser, async (req, res) => {
  try {
    const userDoc = await collections.users().doc(req.user.uid).get();
    
    if (!userDoc.exists) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const userData = userDoc.data();
    userData.id = userDoc.id;
    
    res.status(200).json(userData);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', authenticateUser, async (req, res) => {
  try {
    const { displayName, contactInfo, preferences, organization } = req.body;
    
    const updateData = {};
    if (displayName) updateData.displayName = displayName;
    if (contactInfo) updateData.contactInfo = contactInfo;
    if (preferences) updateData.preferences = preferences;
    if (organization) updateData.organization = organization;
    updateData.updatedAt = admin.firestore.FieldValue.serverTimestamp();
    
    await collections.users().doc(req.user.uid).update(updateData);
    
    // Get updated user data
    const updatedUserDoc = await collections.users().doc(req.user.uid).get();
    if (!updatedUserDoc.exists) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const updatedUserData = updatedUserDoc.data();
    updatedUserData.id = updatedUserDoc.id;
    
    res.status(200).json(updatedUserData);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all users (admin only)
router.get('/', authenticateUser, isAdmin, async (req, res) => {
  try {
    const usersSnapshot = await collections.users().get();
    const users = [];
    
    usersSnapshot.forEach(doc => {
      const userData = doc.data();
      userData.id = doc.id;
      users.push(userData);
    });
    
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get specific user by ID (admin only)
router.get('/:id', authenticateUser, isAdmin, async (req, res) => {
  try {
    const userDoc = await collections.users().doc(req.params.id).get();
    
    if (!userDoc.exists) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const userData = userDoc.data();
    userData.id = userDoc.id;
    
    res.status(200).json(userData);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user role (admin only)
router.patch('/:id/role', authenticateUser, isAdmin, async (req, res) => {
  try {
    const { role } = req.body;
    
    if (!role || !['user', 'admin', 'manager'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role specified' });
    }
    
    const userDoc = await collections.users().doc(req.params.id).get();
    if (!userDoc.exists) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    await collections.users().doc(req.params.id).update({
      role,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    // Get updated user data
    const updatedUserDoc = await collections.users().doc(req.params.id).get();
    const updatedUserData = updatedUserDoc.data();
    updatedUserData.id = updatedUserDoc.id;
    
    res.status(200).json(updatedUserData);
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Deactivate/activate user (admin only)
router.patch('/:id/status', authenticateUser, isAdmin, async (req, res) => {
  try {
    const { isActive } = req.body;
    
    if (typeof isActive !== 'boolean') {
      return res.status(400).json({ message: 'Invalid status specified' });
    }
    
    const userDoc = await collections.users().doc(req.params.id).get();
    if (!userDoc.exists) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    await collections.users().doc(req.params.id).update({
      isActive,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    // Get updated user data
    const updatedUserDoc = await collections.users().doc(req.params.id).get();
    const updatedUserData = updatedUserDoc.data();
    updatedUserData.id = updatedUserDoc.id;
    
    res.status(200).json(updatedUserData);
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Register or update FCM token for the user
router.post('/fcm-token', authenticateUser, async (req, res) => {
  try {
    const { fcmToken } = req.body;
    const userId = req.user.uid;
    
    if (!fcmToken) {
      return res.status(400).json({ message: 'FCM token is required' });
    }
    
    // Check if this token already exists
    const tokenQuery = await collections.fcmTokens()
      .where('token', '==', fcmToken)
      .get();
    
    if (!tokenQuery.empty) {
      // Token exists, update it
      const tokenDoc = tokenQuery.docs[0];
      await tokenDoc.ref.update({
        userId,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        lastActive: admin.firestore.FieldValue.serverTimestamp()
      });
      
      return res.status(200).json({ 
        message: 'FCM token updated successfully',
        tokenId: tokenDoc.id
      });
    }
    
    // Token doesn't exist, create a new one
    const tokenData = {
      token: fcmToken,
      userId,
      deviceInfo: req.body.deviceInfo || null,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      lastActive: admin.firestore.FieldValue.serverTimestamp()
    };
    
    const tokenRef = await collections.fcmTokens().add(tokenData);
    
    res.status(201).json({
      message: 'FCM token registered successfully',
      tokenId: tokenRef.id
    });
  } catch (error) {
    console.error('Error registering FCM token:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all FCM tokens for the current user
router.get('/fcm-tokens', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.uid;
    
    const tokensSnapshot = await collections.fcmTokens()
      .where('userId', '==', userId)
      .get();
    
    const tokens = [];
    tokensSnapshot.forEach(doc => {
      tokens.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    res.status(200).json(tokens);
  } catch (error) {
    console.error('Error fetching FCM tokens:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete an FCM token
router.delete('/fcm-token/:tokenId', authenticateUser, async (req, res) => {
  try {
    const { tokenId } = req.params;
    const userId = req.user.uid;
    
    // Verify the token belongs to the requesting user
    const tokenDoc = await collections.fcmTokens().doc(tokenId).get();
    
    if (!tokenDoc.exists) {
      return res.status(404).json({ message: 'Token not found' });
    }
    
    const tokenData = tokenDoc.data();
    
    // Only allow users to delete their own tokens or admin users
    if (tokenData.userId !== userId && req.dbUser.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Cannot delete another user\'s token' });
    }
    
    await collections.fcmTokens().doc(tokenId).delete();
    
    res.status(200).json({ 
      message: 'FCM token deleted successfully',
      tokenId
    });
  } catch (error) {
    console.error('Error deleting FCM token:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = { router, authenticateUser, isAdmin }; 