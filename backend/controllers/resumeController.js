const resumeService = require('../services/resumeService');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc   Analyze uploaded resume with Groq AI
 * @route  POST /api/resume/analyze
 * @access Private
 */
exports.analyzeResume = asyncHandler(async (req, res) => {
  if (!req.file) {
    return ApiResponse.badRequest(res, 'Please upload a resume file (PDF or DOCX).');
  }

  const { targetRole, experienceLevel, jobDescription } = req.body;

  const result = await resumeService.analyzeResume({
    buffer: req.file.buffer,
    originalName: req.file.originalname,
    mimetype: req.file.mimetype,
    targetRole: targetRole ? targetRole.trim() : '',
    experienceLevel: experienceLevel ? experienceLevel.trim() : 'Not specified',
    jobDescription: jobDescription ? jobDescription.trim() : '',
    userId: req.user._id
  });

  return ApiResponse.success(res, result, 'Resume analysis generated successfully', 201);
});

/**
 * @desc   Get all past resume analyses for current user
 * @route  GET /api/resume/history
 * @access Private
 */
exports.getHistory = asyncHandler(async (req, res) => {
  const history = await resumeService.getUserAnalyses(req.user._id);
  return ApiResponse.success(res, history, 'Resume analysis history fetched successfully');
});

/**
 * @desc   Get single resume analysis by ID
 * @route  GET /api/resume/:id
 * @access Private
 */
exports.getAnalysisById = asyncHandler(async (req, res) => {
  const record = await resumeService.getAnalysisById(req.user._id, req.params.id);
  return ApiResponse.success(res, record, 'Resume analysis fetched successfully');
});

/**
 * @desc   Delete a resume analysis
 * @route  DELETE /api/resume/:id
 * @access Private
 */
exports.deleteAnalysis = asyncHandler(async (req, res) => {
  await resumeService.deleteAnalysis(req.user._id, req.params.id);
  return ApiResponse.success(res, null, 'Resume analysis deleted successfully');
});
