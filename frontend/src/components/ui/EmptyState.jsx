import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineFolderOpen } from 'react-icons/hi2';

export const EmptyState = ({
  icon = <HiOutlineFolderOpen size={48} />,
  title = 'No items found',
  description = 'Get started by creating a new one.',
  action,
  className = ''
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center p-8 text-center bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-gray-200 dark:border-slate-700 ${className}`}
    >
      <div className="text-gray-400 dark:text-gray-500 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
        {title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-6">
        {description}
      </p>
      {action && (
        <div>
          {action}
        </div>
      )}
    </motion.div>
  );
};

export default EmptyState;
