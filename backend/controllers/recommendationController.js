const recommendationService = require('../services/recommendationService');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

exports.getRecommendations = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const { type } = req.query;
  
  const { data, total } = await recommendationService.getRecommendations(req.user._id, type, page, limit);
  ApiResponse.paginated(res, data, page, limit, total);
});

exports.getRecommendation = asyncHandler(async (req, res) => {
  const recommendation = await recommendationService.getRecommendation(req.user._id, req.params.id);
  ApiResponse.success(res, recommendation, 'Recommendation fetched successfully');
});

exports.toggleSave = asyncHandler(async (req, res) => {
  const recommendation = await recommendationService.toggleSave(req.user._id, req.params.id);
  ApiResponse.success(res, recommendation, 'Recommendation save status toggled successfully');
});

exports.deleteRecommendation = asyncHandler(async (req, res) => {
  await recommendationService.deleteRecommendation(req.user._id, req.params.id);
  ApiResponse.success(res, null, 'Recommendation deleted successfully');
});
