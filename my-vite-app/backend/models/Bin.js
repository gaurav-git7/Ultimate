const mongoose = require('mongoose');

const BinSchema = new mongoose.Schema(
  {
    binId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    location: {
      address: {
        type: String,
        required: true
      },
      coordinates: {
        lat: {
          type: Number,
          required: true
        },
        lng: {
          type: Number,
          required: true
        }
      }
    },
    capacity: {
      type: Number,
      required: true,
      default: 100 // in liters
    },
    status: {
      fillLevel: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
      },
      batteryLevel: {
        type: Number,
        default: 100,
        min: 0,
        max: 100
      },
      lastEmptied: {
        type: Date,
        default: Date.now
      },
      isActive: {
        type: Boolean,
        default: true
      },
      connectionStatus: {
        type: String,
        enum: ['online', 'offline', 'maintenance'],
        default: 'online'
      },
      alert: {
        type: String,
        enum: ['none', 'warning', 'critical'],
        default: 'none'
      }
    },
    sensorData: {
      temperature: {
        type: Number,
        default: 20 // in Celsius
      },
      humidity: {
        type: Number,
        default: 50 // in percentage
      },
      weight: {
        type: Number,
        default: 0 // in kilograms
      }
    },
    maintenance: {
      lastMaintenance: {
        type: Date,
        default: Date.now
      },
      nextMaintenance: Date,
      maintenanceHistory: [
        {
          date: {
            type: Date,
            required: true
          },
          type: {
            type: String,
            required: true
          },
          notes: String,
          technician: String
        }
      ]
    },
    wasteType: {
      type: String,
      enum: ['general', 'recyclable', 'organic', 'hazardous', 'electronic'],
      default: 'general'
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual for bin status calculation
BinSchema.virtual('statusLabel').get(function() {
  const fillLevel = this.status.fillLevel;

  if (fillLevel >= 90) {
    return 'critical';
  } else if (fillLevel >= 75) {
    return 'warning';
  } else {
    return 'normal';
  }
});

// Middleware to auto-update alerts based on fill level
BinSchema.pre('save', function(next) {
  const fillLevel = this.status.fillLevel;
  
  if (fillLevel >= 90) {
    this.status.alert = 'critical';
  } else if (fillLevel >= 75) {
    this.status.alert = 'warning';
  } else {
    this.status.alert = 'none';
  }
  
  next();
});

const Bin = mongoose.model('Bin', BinSchema);

module.exports = Bin; 