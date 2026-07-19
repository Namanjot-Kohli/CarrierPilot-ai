import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { HiOutlineBookmark, HiBookmark, HiOutlineClock, HiOutlineFire, HiOutlineXMark } from 'react-icons/hi2';

const ProjectCard = ({ project, onToggleSave, onDelete }) => {
  const isSaved = project.saved;

  const getDifficultyColor = (diff) => {
    switch(diff?.toLowerCase()) {
      case 'beginner': return 'emerald';
      case 'intermediate': return 'amber';
      case 'advanced': return 'rose';
      default: return 'gray';
    }
  };

  return (
    <Card hover className="h-full flex flex-col relative">
      <div className="absolute top-4 right-4 z-10 flex items-center gap-1">
        <button 
          title="Not interested (Remove)"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if(onDelete) onDelete(project.id);
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
            if(onToggleSave) onToggleSave(project.id);
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
        <Badge color="purple" size="sm" className="uppercase tracking-wider font-semibold mb-2">
          Project
        </Badge>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-2">
          {project.title}
        </h3>
      </div>
      
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3 flex-1">
        {project.description}
      </p>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
          <HiOutlineFire className="w-4 h-4 text-orange-500" />
          <span className="capitalize">{project.difficulty || 'Intermediate'}</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
          <HiOutlineClock className="w-4 h-4 text-blue-500" />
          <span>{project.estimatedHours ? `${project.estimatedHours} hrs` : 'N/A'}</span>
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
        <p className="text-xs text-slate-400 mb-2 font-medium">Tech Stack</p>
        <div className="flex flex-wrap gap-1.5">
          {project.techStack?.map((tech, index) => (
            <span key={index} className="text-[10px] px-2 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 rounded border border-indigo-100 dark:border-indigo-800/50">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
