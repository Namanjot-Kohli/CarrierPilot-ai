const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/env');

class AuthService {
  async signup(name, email, password) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error('User already exists');
      error.statusCode = 400;
      throw error;
    }
    
    const user = await User.create({ name, email, password });
    
    const accessToken = this.generateAccessToken(user._id);
    const refreshToken = this.generateRefreshToken(user._id);
    
    return { user, accessToken, refreshToken };
  }

  async login(email, password) {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      throw error;
    }
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      throw error;
    }
    
    const accessToken = this.generateAccessToken(user._id);
    const refreshToken = this.generateRefreshToken(user._id);
    
    return { user, accessToken, refreshToken };
  }

  async refreshToken(refreshTokenStr) {
    if (!refreshTokenStr) {
      const error = new Error('No refresh token provided');
      error.statusCode = 401;
      throw error;
    }
    
    try {
      const decoded = jwt.verify(refreshTokenStr, config.JWT_REFRESH_SECRET);
      const user = await User.findById(decoded.id);
      if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
      }
      
      const accessToken = this.generateAccessToken(user._id);
      const newRefreshToken = this.generateRefreshToken(user._id);
      
      return { accessToken, refreshToken: newRefreshToken };
    } catch (err) {
      const error = new Error('Invalid refresh token');
      error.statusCode = 401;
      throw error;
    }
  }

  generateAccessToken(userId) {
    return jwt.sign({ id: userId }, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRE || '15m'
    });
  }

  generateRefreshToken(userId) {
    return jwt.sign({ id: userId }, config.JWT_REFRESH_SECRET, {
      expiresIn: config.JWT_REFRESH_EXPIRE || '7d'
    });
  }
}

module.exports = new AuthService();
