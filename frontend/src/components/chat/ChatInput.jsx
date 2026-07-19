import React, { useState, useRef, useEffect } from 'react';
import { HiPaperAirplane } from 'react-icons/hi2';

const ChatInput = ({ value, onChange, onSend, disabled }) => {
  const textareaRef = useRef(null);

  const handleInput = (e) => {
    onChange(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (value.trim() && !disabled) {
      onSend(value.trim());
      onChange('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  return (
    <div className="relative flex items-end gap-2 bg-slate-50 dark:bg-slate-800 p-2 rounded-2xl border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500 transition-all">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        placeholder="Type a message... (Shift+Enter for new line)"
        disabled={disabled}
        className="flex-1 max-h-[150px] min-h-[44px] bg-transparent border-none resize-none focus:ring-0 px-3 py-2.5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm"
        rows={1}
      />
      <button
        onClick={handleSubmit}
        disabled={disabled || !value.trim()}
        className={`p-2.5 rounded-xl flex-shrink-0 flex items-center justify-center transition-all ${
          value.trim() && !disabled
            ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
            : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
        }`}
      >
        <HiPaperAirplane className="w-5 h-5 -rotate-45" />
      </button>
    </div>
  );
};

export default ChatInput;
