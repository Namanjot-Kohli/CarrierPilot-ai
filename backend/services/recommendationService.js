const Recommendation = require('../models/Recommendation');

class RecommendationService {
  async getRecommendations(userId, type = null, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    
    const query = { userId };
    if (type) {
      query.type = type;
    }
    
    const recommendations = await Recommendation.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
      
    const total = await Recommendation.countDocuments(query);
    
    return { data: recommendations, page, limit, total };
  }

  async getRecommendation(userId, recommendationId) {
    const recommendation = await Recommendation.findOne({ _id: recommendationId, userId });
    if (!recommendation) {
      const error = new Error('Recommendation not found');
      error.statusCode = 404;
      throw error;
    }
    return recommendation;
  }

  async toggleSave(userId, recommendationId) {
    const recommendation = await Recommendation.findOne({ _id: recommendationId, userId });
    if (!recommendation) {
      const error = new Error('Recommendation not found');
      error.statusCode = 404;
      throw error;
    }
    
    recommendation.isSaved = !recommendation.isSaved;
    await recommendation.save();
    return recommendation;
  }

  async deleteRecommendation(userId, recommendationId) {
    const recommendation = await Recommendation.findOneAndDelete({ _id: recommendationId, userId });
    if (!recommendation) {
      const error = new Error('Recommendation not found');
      error.statusCode = 404;
      throw error;
    }
  }
}

module.exports = new RecommendationService();
