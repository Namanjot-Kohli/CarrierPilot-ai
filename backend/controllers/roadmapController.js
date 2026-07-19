const roadmapService = require('../services/roadmapService');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

exports.getRoadmaps = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  
  const { data, total } = await roadmapService.getRoadmaps(req.user._id, page, limit);
  ApiResponse.paginated(res, data, page, limit, total);
});

exports.createRoadmap = asyncHandler(async (req, res) => {
  const roadmap = await roadmapService.createRoadmap(req.user._id, req.body);
  ApiResponse.success(res, roadmap, 'Roadmap created successfully', 201);
});

exports.getRoadmap = asyncHandler(async (req, res) => {
  const roadmap = await roadmapService.getRoadmap(req.user._id, req.params.id);
  ApiResponse.success(res, roadmap, 'Roadmap fetched successfully');
});

exports.updateProgress = asyncHandler(async (req, res) => {
  const { progress } = req.body;
  const roadmap = await roadmapService.updateProgress(req.user._id, req.params.id, progress);
  ApiResponse.success(res, roadmap, 'Roadmap progress updated successfully');
});

exports.toggleMilestone = asyncHandler(async (req, res) => {
  const roadmap = await roadmapService.toggleMilestone(req.user._id, req.params.id, req.params.milestoneId);
  ApiResponse.success(res, roadmap, 'Milestone toggled successfully');
});

exports.deleteRoadmap = asyncHandler(async (req, res) => {
  await roadmapService.deleteRoadmap(req.user._id, req.params.id);
  ApiResponse.success(res, null, 'Roadmap deleted successfully');
});
