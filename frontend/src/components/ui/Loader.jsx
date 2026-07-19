import React from 'react';

export const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className={`relative ${className}`}>
      <div className={`rounded-full border-gray-200 dark:border-slate-700 ${sizes[size]}`}></div>
      <div className={`absolute top-0 left-0 rounded-full border-t-primary-500 animate-spin ${sizes[size]}`}></div>
    </div>
  );
};

export const PageLoader = ({ text = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-slate-950">
    <Spinner size="lg" className="mb-4" />
    <p className="text-gray-500 dark:text-gray-400 font-medium animate-pulse">{text}</p>
  </div>
);

export const SkeletonCard = ({ className = '' }) => (
  <div className={`bg-white dark:bg-slate-800 rounded-2xl p-5 border border-gray-100 dark:border-slate-700/50 shadow-sm animate-pulse ${className}`}>
    <div className="flex items-center space-x-4 mb-4">
      <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-slate-700"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-1/2"></div>
      </div>
    </div>
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-full"></div>
      <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-5/6"></div>
      <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-4/6"></div>
    </div>
  </div>
);

export const SkeletonText = ({ lines = 3, className = '' }) => (
  <div className={`space-y-3 animate-pulse ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div 
        key={i} 
        className={`h-4 bg-gray-200 dark:bg-slate-700 rounded ${i === lines - 1 ? 'w-2/3' : 'w-full'}`}
      ></div>
    ))}
  </div>
);

export default { Spinner, PageLoader, SkeletonCard, SkeletonText };
