const dotenv = require('dotenv');
const path = require('path');

// Load .env from the backend directory
dotenv.config({ path: path.join(__dirname, '..', '.env') });

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/careerpilot',
  JWT_SECRET: process.env.JWT_SECRET || 'default_jwt_secret_change_me',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'default_jwt_refresh_secret_change_me',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '15m',
  JWT_REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE || '7d',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  NODE_ENV: process.env.NODE_ENV || 'development'
};
