import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { HiOutlineDocumentDuplicate, HiOutlineCpuChip, HiOutlineMap, HiCheck } from 'react-icons/hi2';
import { formatRelativeTime } from '../../utils/formatters';
import { useToast } from '../../context/ToastContext';
import * as roadmapApi from '../../api/roadmapApi';
import { useNavigate } from 'react-router-dom';

const MessageBubble = ({ message }) => {
  const isUser = message.role === 'user';
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [savedRoadmapId, setSavedRoadmapId] = useState(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    addToast('Copied to clipboard', 'success');
  };

  const handleSaveRoadmap = async () => {
    if (saving || savedRoadmapId) return;
    setSaving(true);
    try {
      // Attach the conversationId to maintain the 1-to-1 link
      const dataToSave = { ...message.suggestedRoadmap, conversationId: message.conversationId };
      const res = await roadmapApi.createRoadmap(dataToSave);
      setSavedRoadmapId(res.data._id);
      addToast('Roadmap saved to your profile!', 'success');
    } catch (error) {
      console.error(error);
      addToast('Failed to save roadmap', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} w-full group`}
    >
      {!isUser && (
        <div className="flex-shrink-0 mr-4 mt-1">
          <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <HiOutlineCpuChip className="w-5 h-5" />
          </div>
        </div>
      )}
      
      <div className={`max-w-[80%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        <div 
          className={`relative px-5 py-3.5 rounded-2xl ${
            isUser 
              ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-tr-sm shadow-md' 
              : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-tl-sm shadow-sm'
          }`}
        >
          {isUser ? (
            <div className="whitespace-pre-wrap break-words">{message.content}</div>
          ) : (
            <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-700 w-full overflow-x-auto break-words">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}

          {!isUser && message.suggestedRoadmap && (
            <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-semibold mb-1">
                  <HiOutlineMap className="w-5 h-5" />
                  AI Suggested Learning Roadmap
                </div>
                <div className="text-sm text-indigo-600/80 dark:text-indigo-300/80">
                  {message.suggestedRoadmap.title}
                </div>
              </div>
              
              {savedRoadmapId ? (
                <button
                  onClick={() => navigate(`/roadmaps/${savedRoadmapId}`)}
                  className="flex-shrink-0 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                >
                  View Roadmap
                </button>
              ) : (
                <button
                  onClick={handleSaveRoadmap}
                  disabled={saving}
                  className="flex-shrink-0 px-4 py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-indigo-600 dark:text-indigo-400 text-sm font-medium rounded-lg border border-indigo-200 dark:border-indigo-700 transition-colors shadow-sm disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Accept & Save'}
                </button>
              )}
            </div>
          )}

          {!isUser && (
            <button 
              onClick={handleCopy}
              className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity rounded-md hover:bg-slate-100 dark:hover:bg-slate-700"
              title="Copy message"
            >
              <HiOutlineDocumentDuplicate className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 mt-1 px-1">
          <span className="text-xs text-slate-400 dark:text-slate-500">
            {message.timestamp ? formatRelativeTime(message.timestamp) : 'Just now'}
          </span>
          
          {!isUser && message.agentsInvolved && message.agentsInvolved.length > 0 && (
            <div className="flex gap-1">
              {message.agentsInvolved.map((agent, i) => (
                <span key={i} className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800/50">
                  {agent}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
