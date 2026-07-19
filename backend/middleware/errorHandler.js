const ApiResponse = require('../utils/apiResponse');
const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack || err.message);

  let error = { ...err };
  error.message = err.message;
  let statusCode = err.statusCode || 500;
  let errors = null;

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`;
    error = new Error(message);
    statusCode = 404;
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new Error(message);
    statusCode = 400;
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = 'Validation Failed';
    errors = Object.values(err.errors).map((val) => val.message);
    error = new Error(message);
    statusCode = 400;
  }

  // JWT Errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token. Please log in again.';
    error = new Error(message);
    statusCode = 401;
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Your token has expired. Please log in again.';
    error = new Error(message);
    statusCode = 401;
  }

  ApiResponse.error(res, error.message || 'Server Error', statusCode, errors);
};

module.exports = errorHandler;
