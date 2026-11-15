import React from 'react';

export const ScoreCircle = ({ score = 0, size = 120, strokeWidth = 10, label = 'Overall Score', verdict = '' }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const normalizedScore = Math.min(100, Math.max(0, score));
  const offset = circumference - (normalizedScore / 100) * circumference;

  const getColor = (s) => {
    if (s >= 85) return { stroke: '#0d9488', text: 'text-teal-600 dark:text-teal-400', badge: 'bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800' };
    if (s >= 70) return { stroke: '#3b82f6', text: 'text-blue-600 dark:text-blue-400', badge: 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800' };
    if (s >= 55) return { stroke: '#f59e0b', text: 'text-amber-600 dark:text-amber-400', badge: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800' };
    return { stroke: '#ef4444', text: 'text-rose-600 dark:text-rose-400', badge: 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800' };
  };

  const styleConfig = getColor(normalizedScore);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-slate-100 dark:text-slate-800"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={styleConfig.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            fill="transparent"
          />
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-extrabold tracking-tight ${styleConfig.text}`}>
            {normalizedScore}
          </span>
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            / 100
          </span>
        </div>
      </div>

      {label && (
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-2">
          {label}
        </span>
      )}

      {verdict && (
        <span className={`mt-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styleConfig.badge}`}>
          {verdict}
        </span>
      )}
    </div>
  );
};
