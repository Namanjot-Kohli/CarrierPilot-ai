import React from 'react';
import Card from '../ui/Card';
import { HiArrowTrendingUp, HiArrowTrendingDown } from 'react-icons/hi2';

const StatsCard = ({ title, value, icon, trend, trendLabel, color = 'indigo' }) => {
  const isPositive = trend >= 0;
  
  const colorStyles = {
    indigo: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
    emerald: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
    amber: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
    rose: 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400',
    blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
  };

  return (
    <Card hover className="relative overflow-hidden group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{value}</h3>
          
          {trend !== undefined && (
            <div className="flex items-center gap-1 mt-2 text-sm">
              <span className={`flex items-center ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                {isPositive ? <HiArrowTrendingUp className="w-4 h-4 mr-1" /> : <HiArrowTrendingDown className="w-4 h-4 mr-1" />}
                {Math.abs(trend)}%
              </span>
              <span className="text-slate-500 dark:text-slate-400 ml-1">{trendLabel}</span>
            </div>
          )}
        </div>
        
        <div className={`p-3 rounded-xl ${colorStyles[color]} transition-transform group-hover:scale-110`}>
          {icon}
        </div>
      </div>
      
      {/* Decorative gradient blob */}
      <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity bg-${color}-500 pointer-events-none`} />
    </Card>
  );
};

export default StatsCard;
