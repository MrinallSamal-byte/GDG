import express from 'express';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import Event from '../models/Event.js';
import TeamMember from '../models/TeamMember.js';
import Poll from '../models/Poll.js';
import PlanOfAction from '../models/PlanOfAction.js';
import Notice from '../models/Notice.js';
import { emitDataUpdate } from '../services/socketService.js';

const router = express.Router();

// Model mapping for dynamic collection access
const modelMap = {
  events: Event,
  'team-members': TeamMember,
  polls: Poll,
  'plan-of-action': PlanOfAction,
  notices: Notice,
};

// Validation middleware
const validateCollection = (req, res, next) => {
  const { collection } = req.params;
  if (!modelMap[collection]) {
    return res.status(400).json({
      success: false,
      message: `Invalid collection: ${collection}`,
    });
  }
  req.model = modelMap[collection];
  next();
};

// Apply authentication and admin middleware to all routes
router.use(protect, adminOnly);

// ==================== CREATE ====================
// POST /api/admin/add/:collection
router.post('/add/:collection', validateCollection, async (req, res) => {
  try {
    const { model } = req;
    const data = { ...req.body, createdBy: req.user._id };

    // Server-side validation
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Request body cannot be empty',
      });
    }

    const newItem = await model.create(data);

    // Emit real-time update
    emitDataUpdate(req.params.collection, 'create', newItem);

    res.status(201).json({
      success: true,
      message: 'Item created successfully',
      data: newItem,
    });
  } catch (error) {
    console.error('Error creating item:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create item',
      error: error.message,
    });
  }
});

// ==================== READ ====================
// GET /api/admin/list/:collection
router.get('/list/:collection', validateCollection, async (req, res) => {
  try {
    const { model } = req;
    const { page = 1, limit = 50, sort = '-createdAt' } = req.query;

    const items = await model
      .find()
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('createdBy', 'name email')
      .lean();

    const count = await model.countDocuments();

    res.json({
      success: true,
      data: items,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: count,
        pages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch items',
      error: error.message,
    });
  }
});

// GET /api/admin/get/:collection/:id
router.get('/get/:collection/:id', validateCollection, async (req, res) => {
  try {
    const { model } = req;
    const { id } = req.params;

    const item = await model.findById(id).populate('createdBy', 'name email');

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
      });
    }

    res.json({
      success: true,
      data: item,
    });
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch item',
      error: error.message,
    });
  }
});

// ==================== UPDATE ====================
// PUT /api/admin/update/:collection/:id
router.put('/update/:collection/:id', validateCollection, async (req, res) => {
  try {
    const { model } = req;
    const { id } = req.params;
    const updateData = req.body;

    // Server-side validation
    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Update data cannot be empty',
      });
    }

    // Prevent updating certain fields
    delete updateData.createdBy;
    delete updateData._id;

    const updatedItem = await model.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email');

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
      });
    }

    // Emit real-time update
    emitDataUpdate(req.params.collection, 'update', updatedItem);

    res.json({
      success: true,
      message: 'Item updated successfully',
      data: updatedItem,
    });
  } catch (error) {
    console.error('Error updating item:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update item',
      error: error.message,
    });
  }
});

// ==================== DELETE ====================
// DELETE /api/admin/delete/:collection/:id
router.delete('/delete/:collection/:id', validateCollection, async (req, res) => {
  try {
    const { model } = req;
    const { id } = req.params;

    const deletedItem = await model.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
      });
    }

    // Emit real-time update
    emitDataUpdate(req.params.collection, 'delete', deletedItem);

    res.json({
      success: true,
      message: 'Item deleted successfully',
      data: deletedItem,
    });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete item',
      error: error.message,
    });
  }
});

// ==================== BULK OPERATIONS ====================
// POST /api/admin/bulk-delete/:collection
router.post('/bulk-delete/:collection', validateCollection, async (req, res) => {
  try {
    const { model } = req;
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'IDs array is required and cannot be empty',
      });
    }

    const result = await model.deleteMany({ _id: { $in: ids } });

    // Emit real-time update for bulk delete
    emitDataUpdate(req.params.collection, 'bulk-delete', { ids, count: result.deletedCount });

    res.json({
      success: true,
      message: `${result.deletedCount} items deleted successfully`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error('Error bulk deleting items:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete items',
      error: error.message,
    });
  }
});

// ==================== STATS ====================
// GET /api/admin/stats
router.get('/stats', async (req, res) => {
  try {
    const stats = await Promise.all([
      Event.countDocuments(),
      TeamMember.countDocuments(),
      Poll.countDocuments(),
      PlanOfAction.countDocuments(),
      Notice.countDocuments(),
    ]);

    const [events, teamMembers, polls, planOfAction, notices] = stats;

    res.json({
      success: true,
      data: {
        events,
        teamMembers,
        polls,
        planOfAction,
        notices,
        total: events + teamMembers + polls + planOfAction + notices,
      },
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch stats',
      error: error.message,
    });
  }
});

export default router;
