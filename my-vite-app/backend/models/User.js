const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
      ]
    },
    displayName: {
      type: String,
      required: true
    },
    photoURL: {
      type: String
    },
    role: {
      type: String,
      enum: ['user', 'manager', 'admin'],
      default: 'user'
    },
    preferences: {
      theme: {
        type: String,
        enum: ['light', 'dark', 'system'],
        default: 'system'
      },
      notifications: {
        email: {
          type: Boolean,
          default: true
        },
        push: {
          type: Boolean,
          default: true
        },
        sms: {
          type: Boolean,
          default: false
        }
      },
      dashboardLayout: {
        type: String,
        default: 'default'
      }
    },
    contactInfo: {
      phone: {
        type: String
      },
      address: {
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String
      }
    },
    organization: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization'
      },
      name: String,
      role: String
    },
    lastLogin: {
      type: Date,
      default: Date.now
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

UserSchema.virtual('bins', {
  ref: 'Bin',
  localField: '_id',
  foreignField: 'owner',
  justOne: false
});

const User = mongoose.model('User', UserSchema);

module.exports = User; 