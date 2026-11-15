const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

// All resume analysis endpoints are protected
router.use(protect);

router.post('/analyze', upload.single('resume'), resumeController.analyzeResume);
router.get('/history', resumeController.getHistory);
router.get('/:id', resumeController.getAnalysisById);
router.delete('/:id', resumeController.deleteAnalysis);

module.exports = router;
