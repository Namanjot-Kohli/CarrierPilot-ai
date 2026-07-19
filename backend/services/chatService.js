const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const Roadmap = require('../models/Roadmap');
const Recommendation = require('../models/Recommendation');
const User = require('../models/User');
const AgentOrchestrator = require('../agents/core/AgentOrchestrator');

class ChatService {
  constructor() {
    this.orchestrator = new AgentOrchestrator();
  }

  async sendMessage(userId, content, conversationId = null) {
    let conversation;
    
    if (conversationId) {
      conversation = await Conversation.findOne({ _id: conversationId, userId });
      if (!conversation) {
        const error = new Error('Conversation not found');
        error.statusCode = 404;
        throw error;
      }
    } else {
      const title = content.substring(0, 50) + (content.length > 50 ? '...' : '');
      conversation = await Conversation.create({
        userId,
        title,
        type: 'general',
        isActive: true,
        lastMessageAt: new Date()
      });
    }

    // Save user message
    await Message.create({
      conversationId: conversation._id,
      role: 'user',
      content
    });

    // Get conversation history (last 20 messages)
    const history = await Message.find({ conversationId: conversation._id })
      .sort({ createdAt: -1 })
      .limit(20);
    history.reverse(); // chronological order

    const userProfile = await User.findById(userId);
    const existingRoadmap = await Roadmap.findOne({ conversationId: conversation._id, userId });

    // Call orchestrator
    const result = await this.orchestrator.processMessage(content, history, userProfile, existingRoadmap);

    // Save assistant message
    const assistantMessage = await Message.create({
      conversationId: conversation._id,
      role: 'assistant',
      content: result.response,
      suggestedRoadmap: result.roadmap || null,
      agentMetadata: {
        plan: result.plan,
        reasoning: result.reasoning,
        agentsUsed: result.agentsUsed
      },
      agentsInvolved: result.agentsUsed || []
    });

    // Handle recommendations
    if (result.recommendations && result.recommendations.length > 0) {
      const recommendationsToSave = result.recommendations.map(rec => ({
        ...rec,
        userId,
        conversationId: conversation._id,
        isSaved: false
      }));
      await Recommendation.insertMany(recommendationsToSave);
    }

    // Update conversation
    conversation.lastMessageAt = new Date();
    await conversation.save();

    return { conversation, message: assistantMessage };
  }

  async getConversations(userId, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    
    const conversations = await Conversation.find({ userId })
      .sort({ lastMessageAt: -1 })
      .skip(skip)
      .limit(limit);
      
    const total = await Conversation.countDocuments({ userId });
    
    return { data: conversations, page, limit, total };
  }

  async getConversation(userId, conversationId) {
    const conversation = await Conversation.findOne({ _id: conversationId, userId });
    if (!conversation) {
      const error = new Error('Conversation not found');
      error.statusCode = 404;
      throw error;
    }
    
    const messages = await Message.find({ conversationId })
      .sort({ createdAt: 1 });
      
    return { ...conversation.toObject(), messages };
  }

  async deleteConversation(userId, conversationId) {
    const conversation = await Conversation.findOne({ _id: conversationId, userId });
    if (!conversation) {
      const error = new Error('Conversation not found');
      error.statusCode = 404;
      throw error;
    }
    
    await Message.deleteMany({ conversationId });
    await Conversation.deleteOne({ _id: conversationId });
  }

  async updateConversation(userId, conversationId, updates) {
    const conversation = await Conversation.findOneAndUpdate(
      { _id: conversationId, userId },
      { title: updates.title },
      { new: true, runValidators: true }
    );
    
    if (!conversation) {
      const error = new Error('Conversation not found');
      error.statusCode = 404;
      throw error;
    }
    
    return conversation;
  }
}

module.exports = new ChatService();
