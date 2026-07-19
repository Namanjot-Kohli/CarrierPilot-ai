const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  title: {
    type: String,
    default: 'New Conversation'
  },
  summary: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    enum: ['career', 'resume', 'skills', 'roadmap', 'general'],
    default: 'general'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastMessageAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

conversationSchema.index({ userId: 1, lastMessageAt: -1 });

module.exports = mongoose.model('Conversation', conversationSchema);
