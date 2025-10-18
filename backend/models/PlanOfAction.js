import mongoose from 'mongoose';

const planOfActionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  category: {
    type: String,
    enum: ['technical', 'community', 'outreach', 'internal', 'other'],
    default: 'other',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium',
  },
  status: {
    type: String,
    enum: ['planned', 'in-progress', 'completed', 'on-hold'],
    default: 'planned',
  },
  targetDate: {
    type: Date,
  },
  completedDate: {
    type: Date,
  },
  order: {
    type: Number,
    default: 0,
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
planOfActionSchema.index({ status: 1, priority: -1, order: 1 });

const PlanOfAction = mongoose.model('PlanOfAction', planOfActionSchema);

export default PlanOfAction;
