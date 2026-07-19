import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { HiOutlineBars3 } from 'react-icons/hi2';
import { useChat } from '../hooks/useChat';
import ConversationList from '../components/chat/ConversationList';
import ChatWindow from '../components/chat/ChatWindow';
import Button from '../components/ui/Button';

const Chat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
  const {
    conversations,
    messages,
    loading,
    sending,
    activeConversation,
    loadConversations,
    loadConversation,
    sendMessage,
    deleteConversation,
    createNewConversation
  } = useChat();

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  useEffect(() => {
    if (id) {
      loadConversation(id);
      setMobileSidebarOpen(false);
    }
  }, [id, loadConversation]);

  // Handle initial prompt from navigation state
  useEffect(() => {
    const handleInitialPrompt = async () => {
      if (location.state?.initialPrompt && !loading && activeConversation && messages.length === 0) {
        const prompt = location.state.initialPrompt;
        // Clear state to avoid infinite loops
        navigate(location.pathname, { replace: true, state: {} });
        await sendMessage(prompt);
      }
    };
    handleInitialPrompt();
  }, [location.state, loading, activeConversation, messages.length, sendMessage, navigate, location.pathname]);

  const handleSelectConversation = (convId) => {
    navigate(`/chat/${convId}`);
  };

  const handleNewConversation = () => {
    createNewConversation();
    navigate('/chat');
    setMobileSidebarOpen(false);
  };

  const handleDeleteConversation = async (convId) => {
    await deleteConversation(convId);
    if (id === convId || !id) {
      navigate('/chat');
      createNewConversation();
    }
  };

  const handleSendMessage = async (content) => {
    try {
      const data = await sendMessage(content, id || null);
      if (!id && data?.conversation) {
        navigate(`/chat/${data.conversation.id || data.conversation._id}`, { replace: true });
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] min-h-[600px] flex rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm relative">
      
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden absolute top-4 left-4 z-20">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="bg-white/80 dark:bg-slate-900/80 backdrop-blur"
        >
          <HiOutlineBars3 className="w-5 h-5" />
        </Button>
      </div>

      {/* Sidebar - Overlay on mobile */}
      <div className={`
        absolute inset-y-0 left-0 z-10 w-80 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${mobileSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
      `}>
        <ConversationList
          conversations={conversations}
          activeId={id}
          onSelect={handleSelectConversation}
          onNew={handleNewConversation}
          onDelete={handleDeleteConversation}
          loading={loading && conversations.length === 0}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 w-full relative">
        {/* Mobile backdrop */}
        {mobileSidebarOpen && (
          <div 
            className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm z-0 md:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}
        
        <ChatWindow
          conversation={activeConversation}
          messages={messages}
          loading={loading}
          sending={sending}
          onSendMessage={handleSendMessage}
          onSelectPrompt={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
