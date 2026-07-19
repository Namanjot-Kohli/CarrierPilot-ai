import { useState, useCallback } from 'react';
import * as chatApi from '../api/chatApi.js';
import { useToast } from './useToast.js';

export const useChat = () => {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [activeConversation, setActiveConversation] = useState(null);
  const { addToast } = useToast();

  const loadConversations = useCallback(async () => {
    setLoading(true);
    try {
      const res = await chatApi.getConversations();
      setConversations(res.data || []);
    } catch (error) {
      addToast('Failed to load conversations', 'error');
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  const loadConversation = useCallback(async (id) => {
    setLoading(true);
    try {
      const res = await chatApi.getConversation(id);
      const conversationData = res.data;
      setMessages(conversationData.messages || []);
      setActiveConversation(conversationData);
    } catch (error) {
      addToast('Failed to load conversation', 'error');
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  const sendMessage = useCallback(async (message, conversationId = null) => {
    setSending(true);
    
    // Optimistic update
    const tempMessage = { id: Date.now().toString(), role: 'user', content: message, createdAt: new Date().toISOString() };
    setMessages((prev) => [...prev, tempMessage]);

    try {
      const res = await chatApi.sendMessage(message, conversationId || activeConversation?._id || activeConversation?.id);
      const data = res.data; // This is { conversation, message }
      
      // Update with real response
      if (!activeConversation && data.conversation) {
        setActiveConversation(data.conversation);
        setConversations(prev => [data.conversation, ...prev]);
      }
      
      setMessages((prev) => {
        // Keep optimistic user message, append the assistant message
        return [...prev, data.message];
      });
      return data;
    } catch (error) {
      addToast('Failed to send message', 'error');
      // Rollback optimistic update on error
      setMessages((prev) => prev.filter((m) => m.id !== tempMessage.id));
      throw error;
    } finally {
      setSending(false);
    }
  }, [activeConversation, addToast]);

  const deleteChat = useCallback(async (id) => {
    try {
      await chatApi.deleteConversation(id);
      setConversations((prev) => prev.filter((c) => c._id !== id && c.id !== id));
      if (activeConversation?._id === id || activeConversation?.id === id) {
        setActiveConversation(null);
        setMessages([]);
      }
      addToast('Conversation deleted', 'success');
    } catch (error) {
      addToast('Failed to delete conversation', 'error');
    }
  }, [activeConversation, addToast]);

  const createNewConversation = useCallback(() => {
    setActiveConversation(null);
    setMessages([]);
  }, []);

  return {
    conversations,
    messages,
    loading,
    sending,
    activeConversation,
    loadConversations,
    loadConversation,
    sendMessage,
    deleteConversation: deleteChat,
    createNewConversation
  };
};
