import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { HiOutlineBookmark, HiBookmark, HiOutlineXMark } from 'react-icons/hi2';

const RecommendationCard = ({ recommendation, onToggleSave, onDelete }) => {
  const isSaved = recommendation.saved;

  return (
    <Card hover className="h-full flex flex-col relative group">
      <div className="absolute top-4 right-4 z-10 flex items-center gap-1">
        <button 
          title="Not interested (Remove)"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if(onDelete) onDelete(recommendation.id);
          }}
          className="p-2 rounded-full text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/20 transition-colors"
        >
          <HiOutlineXMark className="w-5 h-5" />
        </button>
        <button 
          title={isSaved ? "Remove from saved" : "Save this item"}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if(onToggleSave) onToggleSave(recommendation.id);
          }}
          className={`p-2 rounded-full transition-colors ${
            isSaved 
              ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30' 
              : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-800'
          }`}
        >
          {isSaved ? <HiBookmark className="w-5 h-5" /> : <HiOutlineBookmark className="w-5 h-5" />}
        </button>
      </div>

      <div className="mb-3 pr-10">
        <Badge color="blue" size="sm" className="uppercase tracking-wider font-semibold mb-2">
          {recommendation.type}
        </Badge>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-2">
          {recommendation.title}
        </h3>
      </div>
      
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3 flex-1">
        {recommendation.description}
      </p>

      {recommendation.skills && recommendation.skills.length > 0 && (
        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-wrap gap-1.5">
            {recommendation.skills.slice(0, 3).map((skill, index) => (
              <span key={index} className="text-[10px] px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md">
                {skill}
              </span>
            ))}
            {recommendation.skills.length > 3 && (
              <span className="text-[10px] px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-md">
                +{recommendation.skills.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};

export default RecommendationCard;
