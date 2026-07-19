const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/', recommendationController.getRecommendations);
router.get('/:id', recommendationController.getRecommendation);
router.patch('/:id/save', recommendationController.toggleSave);
router.delete('/:id', recommendationController.deleteRecommendation);

module.exports = router;
