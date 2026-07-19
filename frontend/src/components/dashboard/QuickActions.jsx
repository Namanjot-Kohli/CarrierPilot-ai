import React from 'react';
import { useNavigate } from 'react-router-dom';
import { QUICK_PROMPTS } from '../../utils/constants';
import Card from '../ui/Card';
import { HiOutlineLightBulb } from 'react-icons/hi2';

const QuickActions = () => {
  const navigate = useNavigate();

  const handleAction = (prompt) => {
    navigate('/chat', { state: { initialPrompt: prompt.description } });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {QUICK_PROMPTS.map((prompt, index) => (
        <Card 
          key={index}
          hover
          className="cursor-pointer border border-transparent hover:border-indigo-500/30 transition-all group"
          onClick={() => handleAction(prompt)}
        >
          <div className="flex flex-col h-full">
            <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 w-fit mb-4 group-hover:scale-110 transition-transform">
              <HiOutlineLightBulb className="w-6 h-6" />
            </div>
            <h4 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
              {prompt.title}
            </h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mt-auto">
              {prompt.description}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default QuickActions;
