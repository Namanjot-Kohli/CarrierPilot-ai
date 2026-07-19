import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import EmptyState from '../ui/EmptyState';
import { HiOutlineCodeBracketSquare } from 'react-icons/hi2';

const SkillRadar = ({ skills = [], loading }) => {
  if (loading) {
    return (
      <Card className="h-full">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Your Skills</h3>
        <div className="flex flex-wrap gap-2 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-8 bg-slate-200 dark:bg-slate-700 rounded-full w-20"></div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Your Skills</h3>
        <Link to="/profile" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
          Edit
        </Link>
      </div>

      {!skills || skills.length === 0 ? (
        <div className="flex-1 flex">
          <EmptyState 
            icon={<HiOutlineCodeBracketSquare />}
            title="No skills added"
            description="Add skills to get better career and project recommendations."
            actionLabel="Update Profile"
            onAction={() => window.location.href = '/profile'}
          />
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 mt-2">
          {skills.map((skill, index) => (
            <Badge key={index} color="indigo" size="md" className="font-medium">
              {skill}
            </Badge>
          ))}
        </div>
      )}
    </Card>
  );
};

export default SkillRadar;
