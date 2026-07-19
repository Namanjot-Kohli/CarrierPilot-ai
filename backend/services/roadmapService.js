const Roadmap = require('../models/Roadmap');

class RoadmapService {
  async getRoadmaps(userId, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    
    const roadmaps = await Roadmap.find({ userId })
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit);
      
    const total = await Roadmap.countDocuments({ userId });
    
    return { data: roadmaps, page, limit, total };
  }

  async createRoadmap(userId, data) {
    // If we have a conversationId, we try to upsert to maintain the 1-to-1 relationship.
    // If not, we just create a new one.
    if (data.conversationId) {
      return await Roadmap.findOneAndUpdate(
        { conversationId: data.conversationId, userId },
        { 
          $set: {
            ...data,
            userId
          } 
        },
        { upsert: true, new: true, runValidators: true }
      );
    } else {
      return await Roadmap.create({
        ...data,
        userId
      });
    }
  }

  async getRoadmap(userId, roadmapId) {
    const roadmap = await Roadmap.findOne({ _id: roadmapId, userId });
    if (!roadmap) {
      const error = new Error('Roadmap not found');
      error.statusCode = 404;
      throw error;
    }
    return roadmap;
  }

  async updateProgress(userId, roadmapId, progress) {
    const roadmap = await Roadmap.findOne({ _id: roadmapId, userId });
    if (!roadmap) {
      const error = new Error('Roadmap not found');
      error.statusCode = 404;
      throw error;
    }
    
    roadmap.progress = progress;
    if (progress === 100) {
      roadmap.status = 'completed';
    } else {
      roadmap.status = 'active';
    }
    
    await roadmap.save();
    return roadmap;
  }

  async toggleMilestone(userId, roadmapId, milestoneId) {
    const roadmap = await Roadmap.findOne({ _id: roadmapId, userId });
    if (!roadmap) {
      const error = new Error('Roadmap not found');
      error.statusCode = 404;
      throw error;
    }
    
    const milestone = roadmap.milestones.id(milestoneId);
    if (!milestone) {
      const error = new Error('Milestone not found');
      error.statusCode = 404;
      throw error;
    }
    
    milestone.isCompleted = !milestone.isCompleted;
    
    // Recalculate progress
    const completedCount = roadmap.milestones.filter(m => m.isCompleted).length;
    roadmap.progress = Math.round((completedCount / roadmap.milestones.length) * 100);
    
    if (roadmap.progress === 100) {
      roadmap.status = 'completed';
    } else {
      roadmap.status = 'active';
    }
    
    await roadmap.save();
    return roadmap;
  }

  async deleteRoadmap(userId, roadmapId) {
    const roadmap = await Roadmap.findOneAndDelete({ _id: roadmapId, userId });
    if (!roadmap) {
      const error = new Error('Roadmap not found');
      error.statusCode = 404;
      throw error;
    }
  }
}

module.exports = new RoadmapService();
