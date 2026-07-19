import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { formatRelativeTime } from '../../utils/formatters';
import { HiOutlineClock, HiOutlineAcademicCap, HiOutlineTrash, HiArrowRight } from 'react-icons/hi2';
import Button from '../ui/Button';

const RoadmapCard = ({ roadmap, onDelete }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'emerald';
      case 'completed': return 'indigo';
      case 'paused': return 'amber';
      default: return 'gray';
    }
  };

  const completedMilestones = roadmap.milestones?.filter(m => m.completed).length || 0;
  const totalMilestones = roadmap.milestones?.length || 0;
  const progress = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;

  return (
    <Card className="h-full flex flex-col">
      <div className="flex justify-between items-start mb-3">
        <Badge color={getStatusColor(roadmap.status)} size="sm" className="uppercase tracking-wider font-semibold">
          {roadmap.status}
        </Badge>
        <span className="text-xs text-slate-400">
          Updated {formatRelativeTime(roadmap.updatedAt)}
        </span>
      </div>

      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">
        {roadmap.title}
      </h3>
      
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 flex-1">
        {roadmap.description}
      </p>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-1.5">
          <HiOutlineAcademicCap className="w-4 h-4 text-indigo-500" />
          <span className="truncate">{roadmap.targetRole}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <HiOutlineClock className="w-4 h-4 text-amber-500" />
          <span>{roadmap.estimatedDuration}</span>
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Progress
          </span>
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
            {progress}% ({completedMilestones}/{totalMilestones})
          </span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden mb-5">
          <div 
            className="bg-gradient-to-r from-indigo-500 to-violet-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/50">
          <button
            onClick={() => navigate(`/roadmaps/${roadmap.id}`)}
            className="flex-1 flex items-center justify-center gap-2 py-2 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:hover:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-lg text-sm font-semibold transition-colors"
          >
            View Roadmap
            <HiArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if(window.confirm('Are you sure you want to delete this roadmap?')) {
                onDelete && onDelete(roadmap.id);
              }
            }}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            title="Delete Roadmap"
          >
            <HiOutlineTrash className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Card>
  );
};

export default RoadmapCard;
