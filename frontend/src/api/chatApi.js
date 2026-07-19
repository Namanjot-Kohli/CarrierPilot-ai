import axiosInstance from './axios.js';

export const sendMessage = async (message, conversationId) => {
  const payload = { message };
  if (conversationId) payload.conversationId = conversationId;
  const response = await axiosInstance.post('/chat', payload);
  return response.data;
};

export const getConversations = async (page = 1, limit = 20) => {
  const response = await axiosInstance.get(`/chat/conversations?page=${page}&limit=${limit}`);
  return response.data;
};

export const getConversation = async (id) => {
  const response = await axiosInstance.get(`/chat/conversations/${id}`);
  return response.data;
};

export const deleteConversation = async (id) => {
  const response = await axiosInstance.delete(`/chat/conversations/${id}`);
  return response.data;
};

export const updateConversation = async (id, title) => {
  const response = await axiosInstance.put(`/chat/conversations/${id}`, { title });
  return response.data;
};
