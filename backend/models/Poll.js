import mongoose from 'mongoose';

const pollSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Poll question is required'],
    trim: true,
  },
  options: [{
    text: {
      type: String,
      required: true,
    },
    votes: {
      type: Number,
      default: 0,
    },
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
  totalVotes: {
    type: Number,
    default: 0,
  },
  votedUsers: [{
    type: String, // Store IP or user ID
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

// Index for better query performance
pollSchema.index({ isActive: 1, endDate: -1 });

const Poll = mongoose.model('Poll', pollSchema);

export default Poll;
