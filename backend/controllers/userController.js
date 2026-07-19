const userService = require('../services/userService');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

exports.getProfile = asyncHandler(async (req, res) => {
  const user = await userService.getProfile(req.user._id);
  ApiResponse.success(res, user, 'Profile fetched successfully');
});

exports.updateProfile = asyncHandler(async (req, res) => {
  const user = await userService.updateProfile(req.user._id, req.body);
  ApiResponse.success(res, user, 'Profile updated successfully');
});

exports.changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  await userService.changePassword(req.user._id, currentPassword, newPassword);
  ApiResponse.success(res, null, 'Password changed successfully');
});

exports.getStats = asyncHandler(async (req, res) => {
  const stats = await userService.getStats(req.user._id);
  ApiResponse.success(res, stats, 'User stats fetched successfully');
});

exports.getActivity = asyncHandler(async (req, res) => {
  const activity = await userService.getActivity(req.user._id);
  ApiResponse.success(res, activity, 'User activity fetched successfully');
});
