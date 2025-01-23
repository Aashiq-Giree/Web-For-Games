const mongoose = require('mongoose');

// Create Schema
const TimeTrackingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    duration: {
      type: Number, // Time spent in seconds
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
);

// Create Model
const TimeTracking = mongoose.model('TimeTracking', TimeTrackingSchema);

module.exports = TimeTracking;
