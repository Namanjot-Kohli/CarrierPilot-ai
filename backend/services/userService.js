const User = require('../models/User');
const Conversation = require('../models/Conversation');
const Roadmap = require('../models/Roadmap');
const Recommendation = require('../models/Recommendation');

class UserService {
  async getProfile(userId) {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    return user;
  }

  async updateProfile(userId, updates) {
    const allowedUpdates = [
      'name', 'title', 'bio', 'skills', 'experienceLevel', 
      'interests', 'education', 'currentRole', 'targetRole'
    ];
    
    const updateData = {};
    for (const key of allowedUpdates) {
      if (updates[key] !== undefined) {
        updateData[key] = updates[key];
      }
    }
    
    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    
    return user;
  }

  async changePassword(userId, currentPassword, newPassword) {
    const user = await User.findById(userId).select('+password');
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      const error = new Error('Incorrect current password');
      error.statusCode = 400;
      throw error;
    }
    
    user.password = newPassword;
    await user.save();
  }

  async getStats(userId) {
    const [conversations, roadmaps, savedItems] = await Promise.all([
      Conversation.countDocuments({ userId }),
      Roadmap.countDocuments({ userId, status: 'active' }),
      Recommendation.countDocuments({ userId, isSaved: true })
    ]);
    
    return {
      conversations,
      roadmaps,
      savedItems
    };
  }

  async getActivity(userId) {
    const [conversations, roadmaps, recommendations] = await Promise.all([
      Conversation.find({ userId }).sort({ updatedAt: -1 }).limit(5),
      Roadmap.find({ userId }).sort({ updatedAt: -1 }).limit(5),
      Recommendation.find({ userId, isSaved: true }).sort({ updatedAt: -1 }).limit(5)
    ]);

    const activities = [
      ...conversations.map(c => ({
        id: c._id.toString(),
        type: 'chat',
        title: c.title || 'Conversation',
        actionLabel: 'Updated',
        targetId: c._id.toString(),
        timestamp: c.updatedAt
      })),
      ...roadmaps.map(r => ({
        id: r._id.toString(),
        type: 'roadmap',
        title: r.title || 'Roadmap',
        actionLabel: 'Updated',
        targetId: r._id.toString(),
        timestamp: r.updatedAt
      })),
      ...recommendations.map(r => ({
        id: r._id.toString(),
        type: 'recommendation',
        title: r.title || 'Recommendation',
        actionLabel: 'Saved',
        targetId: r._id.toString(),
        timestamp: r.updatedAt
      }))
    ];

    // Sort combined activities by timestamp desc and take top 5
    return activities
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 5);
  }
}

module.exports = new UserService();
