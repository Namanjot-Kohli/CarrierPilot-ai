const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const User = require('../models/User');
const env = require('../config/env');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Extract token from Authorization header or cookies
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return ApiResponse.error(res, 'Not authorized to access this route', 401);
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, env.JWT_SECRET);

    // Find user by ID
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return ApiResponse.error(res, 'The user belonging to this token no longer exists', 401);
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (err) {
    return ApiResponse.error(res, 'Not authorized to access this route', 401);
  }
});

module.exports = { protect };
