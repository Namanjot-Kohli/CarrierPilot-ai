const express = require('express');
const router = express.Router();
const roadmapController = require('../controllers/roadmapController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/', roadmapController.getRoadmaps);
router.post('/', roadmapController.createRoadmap);
router.get('/:id', roadmapController.getRoadmap);
router.patch('/:id', roadmapController.updateProgress);
router.patch('/:id/milestones/:milestoneId', roadmapController.toggleMilestone);
router.delete('/:id', roadmapController.deleteRoadmap);

module.exports = router;
