const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const { validateProfileUpdate } = require('../utils/validators');
const validate = require('../middleware/validate');

router.use(protect);

router.get('/profile', userController.getProfile);
router.get('/stats', userController.getStats);
router.get('/activity', userController.getActivity);
router.put('/profile', validateProfileUpdate, validate, userController.updateProfile);
router.put('/password', userController.changePassword);

module.exports = router;
