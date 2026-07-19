const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');
const { validateSignup, validateLogin } = require('../utils/validators');
const validate = require('../middleware/validate');

router.post('/signup', authLimiter, validateSignup, validate, authController.signup);
router.post('/login', authLimiter, validateLogin, validate, authController.login);
router.post('/refresh', authController.refreshToken);
router.post('/logout', protect, authController.logout);
router.get('/me', protect, authController.getMe);

module.exports = router;
