const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const { protect } = require('../middleware/auth');
const { chatLimiter } = require('../middleware/rateLimiter');
const { validateMessage } = require('../utils/validators');
const validate = require('../middleware/validate');

router.use(protect);

router.post('/', chatLimiter, validateMessage, validate, chatController.sendMessage);
router.get('/conversations', chatController.getConversations);
router.get('/conversations/:id', chatController.getConversation);
router.delete('/conversations/:id', chatController.deleteConversation);
router.patch('/conversations/:id', chatController.updateConversation);

module.exports = router;
