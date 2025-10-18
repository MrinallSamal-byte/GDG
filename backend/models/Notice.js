import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Notice title is required'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'Notice content is required'],
  },
  type: {
    type: String,
    enum: ['info', 'warning', 'success', 'urgent'],
    default: 'info',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  priority: {
    type: Number,
    default: 0,
  },
  expiryDate: {
    type: Date,
  },
  targetAudience: {
    type: String,
    enum: ['all', 'members', 'public'],
    default: 'all',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

// Index for better query performance
noticeSchema.index({ isActive: 1, priority: -1, createdAt: -1 });
noticeSchema.index({ expiryDate: 1 });

const Notice = mongoose.model('Notice', noticeSchema);

export default Notice;
