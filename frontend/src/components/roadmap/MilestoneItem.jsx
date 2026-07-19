import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCheck, HiOutlineChevronDown, HiOutlineChevronUp, HiOutlineLink } from 'react-icons/hi2';
import Badge from '../ui/Badge';

const MilestoneItem = ({ milestone, index, isCurrent, onToggle }) => {
  const [expanded, setExpanded] = useState(isCurrent || milestone.completed === false);
  const { completed } = milestone;

  return (
    <div className="relative flex items-start group">
      {/* Timeline Node */}
      <div className="flex flex-col items-center mr-4 md:mr-6 z-10">
        <button
          onClick={onToggle}
          className={`w-14 h-14 md:w-20 md:h-20 rounded-full flex flex-col items-center justify-center border-4 transition-all duration-300 ${
            completed 
              ? 'bg-emerald-500 border-emerald-100 dark:border-emerald-900/50 text-white'
              : isCurrent
                ? 'bg-indigo-600 border-indigo-100 dark:border-indigo-900/50 text-white ring-4 ring-indigo-500/20 animate-pulse'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:border-indigo-300'
          }`}
        >
          {completed ? (
            <HiCheck className="w-6 h-6 md:w-8 md:h-8" />
          ) : (
            <>
              <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest opacity-80">Week</span>
              <span className="text-lg md:text-xl font-bold">{milestone.week || index + 1}</span>
            </>
          )}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden transition-shadow hover:shadow-md mt-1">
        <div 
          className="p-4 md:p-5 cursor-pointer flex justify-between items-start select-none"
          onClick={() => setExpanded(!expanded)}
        >
          <div>
            <h4 className={`text-lg font-bold mb-1 ${completed ? 'text-slate-500 dark:text-slate-400 line-through' : 'text-slate-900 dark:text-white'}`}>
              {milestone.title}
            </h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">
              {milestone.description}
            </p>
          </div>
          <button className="text-slate-400 p-1 hover:text-slate-600 dark:hover:text-slate-300 transition-colors ml-4 flex-shrink-0">
            {expanded ? <HiOutlineChevronUp className="w-5 h-5" /> : <HiOutlineChevronDown className="w-5 h-5" />}
          </button>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-4 md:px-5 pb-5 border-t border-slate-100 dark:border-slate-700 pt-4">
                <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm leading-relaxed">
                  {milestone.description}
                </p>

                {milestone.skills && milestone.skills.length > 0 && (
                  <div className="mb-4">
                    <h5 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Skills to acquire</h5>
                    <div className="flex flex-wrap gap-2">
                      {milestone.skills.map((skill, i) => (
                        <Badge key={i} color="indigo" size="sm">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {milestone.resources && milestone.resources.length > 0 && (
                  <div>
                    <h5 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Recommended Resources</h5>
                    <ul className="space-y-2">
                      {milestone.resources.map((resource, i) => (
                        <li key={i}>
                          <a 
                            href={resource.url || '#'} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-start gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline group"
                            onClick={(e) => !resource.url && e.preventDefault()}
                          >
                            <HiOutlineLink className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                            <span>{resource.title} {resource.type && <span className="text-slate-400 text-xs ml-1">({resource.type})</span>}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-end">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggle();
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      completed
                        ? 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow-md'
                    }`}
                  >
                    {completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MilestoneItem;
