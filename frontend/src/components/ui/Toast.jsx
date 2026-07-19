import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCheckCircle, HiExclamationCircle, HiInformationCircle, HiXCircle, HiXMark } from 'react-icons/hi2';
import { useToast } from '../../hooks/useToast.js';

const ToastItem = ({ toast, removeToast }) => {
  const icons = {
    success: <HiCheckCircle className="text-emerald-500" size={24} />,
    error: <HiXCircle className="text-rose-500" size={24} />,
    info: <HiInformationCircle className="text-blue-500" size={24} />,
    warning: <HiExclamationCircle className="text-amber-500" size={24} />
  };

  const bgColors = {
    success: 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20',
    error: 'bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20',
    info: 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20',
    warning: 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20'
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={`flex items-start p-4 mb-3 rounded-xl border shadow-sm backdrop-blur-md w-80 pointer-events-auto ${bgColors[toast.type]}`}
    >
      <div className="flex-shrink-0 mr-3">
        {icons[toast.type]}
      </div>
      <div className="flex-1 mr-2 text-sm text-gray-800 dark:text-gray-200">
        {toast.message}
      </div>
      <button
        onClick={() => removeToast(toast.id)}
        className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
      >
        <HiXMark size={18} />
      </button>
    </motion.div>
  );
};

export const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} removeToast={removeToast} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
