import React from 'react';
import MilestoneItem from './MilestoneItem';

const RoadmapTimeline = ({ milestones = [], onToggleMilestone }) => {
  return (
    <div className="relative py-4">
      {/* Vertical line connecting milestones */}
      <div className="absolute left-[27px] md:left-[39px] top-4 bottom-4 w-[2px] bg-slate-200 dark:bg-slate-800" />
      
      <div className="space-y-6">
        {milestones.map((milestone, index) => {
          const isFirstUncompleted = !milestone.completed && 
            (index === 0 || milestones[index - 1]?.completed);
            
          return (
            <MilestoneItem 
              key={milestone.id || index}
              milestone={milestone}
              index={index}
              isCurrent={isFirstUncompleted}
              onToggle={() => onToggleMilestone(milestone.id, !milestone.completed)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RoadmapTimeline;
