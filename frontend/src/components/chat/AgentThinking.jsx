import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineCpuChip } from 'react-icons/hi2';

const AgentThinking = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-start w-full"
    >
      <div className="flex-shrink-0 mr-4 mt-1">
        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
          <HiOutlineCpuChip className="w-5 h-5 animate-pulse" />
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-tl-sm px-5 py-3.5 shadow-sm flex items-center gap-3">
        <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">AI is thinking</span>
        <div className="flex gap-1 mt-1">
          <motion.div
            className="w-1.5 h-1.5 bg-indigo-500 rounded-full"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="w-1.5 h-1.5 bg-indigo-500 rounded-full"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="w-1.5 h-1.5 bg-indigo-500 rounded-full"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default AgentThinking;
