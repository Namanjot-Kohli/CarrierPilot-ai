const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  skills: {
    type: [String],
    default: []
  },
  resources: [{
    title: String,
    url: String,
    type: { type: String, default: 'link' }
  }],
  weekNumber: Number,
  duration: String,
  isCompleted: {
    type: Boolean,
    default: false
  }
});

const roadmapSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  targetRole: {
    type: String,
    default: ''
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'intermediate'
  },
  estimatedWeeks: {
    type: Number,
    default: 0
  },
  milestones: [milestoneSchema],
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'paused'],
    default: 'active'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Roadmap', roadmapSchema);
