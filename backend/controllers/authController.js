const authService = require('../services/authService');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');
const config = require('../config/env');

const cookieOptions = {
  httpOnly: true,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  sameSite: 'lax',
  secure: config.NODE_ENV === 'production'
};

exports.signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const { user, accessToken, refreshToken } = await authService.signup(name, email, password);
  
  res.cookie('refreshToken', refreshToken, cookieOptions);
  
  ApiResponse.success(res, { user, accessToken }, 'User created successfully', 201);
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, accessToken, refreshToken } = await authService.login(email, password);
  
  res.cookie('refreshToken', refreshToken, cookieOptions);
  
  ApiResponse.success(res, { user, accessToken }, 'Logged in successfully');
});

exports.refreshToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken;
  
  const { accessToken, refreshToken } = await authService.refreshToken(incomingRefreshToken);
  
  res.cookie('refreshToken', refreshToken, cookieOptions);
  
  ApiResponse.success(res, { accessToken }, 'Token refreshed successfully');
});

exports.logout = asyncHandler(async (req, res) => {
  res.clearCookie('refreshToken', { ...cookieOptions, maxAge: 0 });
  ApiResponse.success(res, null, 'Logged out successfully');
});

exports.getMe = asyncHandler(async (req, res) => {
  ApiResponse.success(res, { user: req.user }, 'User fetched successfully');
});
