const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
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
  type: {
    type: String,
    enum: ['career', 'project', 'certification', 'course', 'skill'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  details: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  isSaved: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

recommendationSchema.index({ userId: 1, type: 1 });

module.exports = mongoose.model('Recommendation', recommendationSchema);
