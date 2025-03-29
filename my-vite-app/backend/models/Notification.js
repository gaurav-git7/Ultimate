const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['info', 'warning', 'error', 'success'],
      default: 'info'
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium'
    },
    isRead: {
      type: Boolean,
      default: false
    },
    readAt: {
      type: Date
    },
    targetUrl: {
      type: String
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    relatedBin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bin'
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed
    },
    expiresAt: {
      type: Date
    },
    category: {
      type: String,
      enum: ['system', 'bin', 'maintenance', 'security', 'alert'],
      default: 'system'
    }
  },
  {
    timestamps: true
  }
);

// Index for querying unread notifications for a user
NotificationSchema.index({ user: 1, isRead: 1 });

// Middleware to mark notification as read
NotificationSchema.methods.markAsRead = function() {
  this.isRead = true;
  this.readAt = new Date();
  return this.save();
};

// Add expiration time for notifications
NotificationSchema.pre('save', function(next) {
  if (!this.expiresAt) {
    const expirationDays = {
      'low': 30,
      'medium': 14,
      'high': 7,
      'urgent': 3
    };
    
    const days = expirationDays[this.priority] || 14;
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    
    this.expiresAt = expirationDate;
  }
  
  next();
});

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification; 