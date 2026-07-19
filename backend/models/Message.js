const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true,
    index: true
  },
  role: {
    type: String,
    enum: ['user', 'assistant', 'system'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  suggestedRoadmap: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  agentMetadata: {
    plan: String,
    reasoning: String,
    agentsUsed: [String]
  },
  agentsInvolved: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

messageSchema.index({ conversationId: 1, createdAt: 1 });

module.exports = mongoose.model('Message', messageSchema);
