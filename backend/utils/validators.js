const { body } = require('express-validator');

const validateSignup = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please include a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

const validateLogin = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please include a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
];

const validateProfileUpdate = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  body('title').optional().trim().isString(),
  body('bio').optional().trim().isString(),
  body('skills').optional().isArray().withMessage('Skills must be an array'),
  body('experience_level')
    .optional()
    .isIn(['student', 'junior', 'mid', 'senior']).withMessage('Invalid experience level'),
  body('interests').optional().isArray().withMessage('Interests must be an array'),
  body('education').optional().trim().isString(),
  body('current_role').optional().trim().isString(),
  body('target_role').optional().trim().isString()
];

const validateMessage = [
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required'),
  body('conversationId')
    .optional()
    .isMongoId().withMessage('Invalid conversation ID')
];

module.exports = {
  validateSignup,
  validateLogin,
  validateProfileUpdate,
  validateMessage
};
