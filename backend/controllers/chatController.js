const chatService = require('../services/chatService');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

exports.sendMessage = asyncHandler(async (req, res) => {
  const { message, conversationId } = req.body;
  const result = await chatService.sendMessage(req.user._id, message, conversationId);
  ApiResponse.success(res, result, 'Message sent successfully');
});

exports.getConversations = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  
  const { data, total } = await chatService.getConversations(req.user._id, page, limit);
  ApiResponse.paginated(res, data, page, limit, total);
});

exports.getConversation = asyncHandler(async (req, res) => {
  const conversation = await chatService.getConversation(req.user._id, req.params.id);
  ApiResponse.success(res, conversation, 'Conversation fetched successfully');
});

exports.deleteConversation = asyncHandler(async (req, res) => {
  await chatService.deleteConversation(req.user._id, req.params.id);
  ApiResponse.success(res, null, 'Conversation deleted successfully');
});

exports.updateConversation = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const conversation = await chatService.updateConversation(req.user._id, req.params.id, { title });
  ApiResponse.success(res, conversation, 'Conversation updated successfully');
});
