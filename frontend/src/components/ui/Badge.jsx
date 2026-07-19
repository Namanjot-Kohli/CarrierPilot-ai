import React from 'react';
import { HiXMark } from 'react-icons/hi2';

export const Badge = ({
  children,
  color = 'indigo',
  size = 'md',
  onRemove,
  dot = false,
  className = ''
}) => {
  const colors = {
    indigo: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-500/20 dark:text-indigo-300 border-indigo-200 dark:border-indigo-500/30',
    violet: 'bg-violet-100 text-violet-800 dark:bg-violet-500/20 dark:text-violet-300 border-violet-200 dark:border-violet-500/30',
    cyan: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-500/20 dark:text-cyan-300 border-cyan-200 dark:border-cyan-500/30',
    green: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30',
    amber: 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 border-amber-200 dark:border-amber-500/30',
    red: 'bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300 border-rose-200 dark:border-rose-500/30',
    gray: 'bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-300 border-gray-200 dark:border-gray-600',
  };

  const dotColors = {
    indigo: 'bg-indigo-500',
    violet: 'bg-violet-500',
    cyan: 'bg-cyan-500',
    green: 'bg-emerald-500',
    amber: 'bg-amber-500',
    red: 'bg-rose-500',
    gray: 'bg-gray-500',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  };

  return (
    <span className={`inline-flex items-center font-medium rounded-full border ${colors[color]} ${sizes[size]} ${className}`}>
      {dot && (
        <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${dotColors[color]}`}></span>
      )}
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className={`ml-1.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full hover:bg-black/10 focus:bg-black/20 focus:outline-none dark:hover:bg-white/20`}
        >
          <span className="sr-only">Remove</span>
          <HiXMark className="h-3 w-3" />
        </button>
      )}
    </span>
  );
};

export default Badge;
