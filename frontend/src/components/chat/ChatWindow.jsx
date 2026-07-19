import React, { useEffect, useRef, useState } from 'react';
import MessageBubble from './MessageBubble';
import AgentThinking from './AgentThinking';
import ChatInput from './ChatInput';
import { QUICK_PROMPTS } from '../../utils/constants';
import EmptyState from '../ui/EmptyState';
import { HiOutlineChatBubbleBottomCenterText, HiOutlineLightBulb } from 'react-icons/hi2';

const ChatWindow = ({ conversation, messages, loading, sending, onSendMessage, onSelectPrompt }) => {
  const messagesEndRef = useRef(null);
  const [inputValue, setInputValue] = useState('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, sending]);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white truncate">
          {conversation ? conversation.title : 'New Conversation'}
        </h2>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {!conversation && messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-4">
                <HiOutlineChatBubbleBottomCenterText className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">How can I help you today?</h3>
              <p className="text-slate-500 dark:text-slate-400">Select a prompt below or type your own question to get started.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {QUICK_PROMPTS.slice(0, 4).map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setInputValue(prompt.description)}
                  className="p-4 text-left border border-slate-200 dark:border-slate-700 rounded-xl hover:border-indigo-500 dark:hover:border-indigo-400 hover:shadow-md transition-all bg-white dark:bg-slate-800"
                >
                  <div className="flex items-center gap-3 mb-2 text-indigo-600 dark:text-indigo-400">
                    <HiOutlineLightBulb className="w-5 h-5" />
                    <span className="font-semibold">{prompt.title}</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{prompt.description}</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, index) => (
              <MessageBubble key={msg.id || index} message={msg} />
            ))}
            {sending && <AgentThinking />}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <ChatInput 
          value={inputValue}
          onChange={setInputValue}
          onSend={onSendMessage} 
          disabled={sending || loading} 
        />
      </div>
    </div>
  );
};

export default ChatWindow;
