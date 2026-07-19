import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import EmptyState from '../ui/EmptyState';
import { formatRelativeTime } from '../../utils/formatters';
import { HiOutlineChatBubbleLeftEllipsis, HiOutlineDocumentCheck, HiOutlineBookmark, HiOutlineClock } from 'react-icons/hi2';

const RecentActivity = ({ activities = [], loading }) => {
  const navigate = useNavigate();

  const getIcon = (type) => {
    switch (type) {
      case 'chat': return <HiOutlineChatBubbleLeftEllipsis className="w-5 h-5 text-indigo-500" />;
      case 'roadmap': return <HiOutlineDocumentCheck className="w-5 h-5 text-emerald-500" />;
      case 'recommendation': return <HiOutlineBookmark className="w-5 h-5 text-amber-500" />;
      default: return <HiOutlineClock className="w-5 h-5 text-slate-500" />;
    }
  };

  const handleAction = (activity) => {
    switch (activity.type) {
      case 'chat': navigate(`/chat/${activity.targetId}`); break;
      case 'roadmap': navigate(`/roadmaps/${activity.targetId}`); break;
      case 'recommendation': navigate(`/recommendations`); break;
      default: break;
    }
  };

  if (loading) {
    return (
      <Card>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Recent Activity</h3>
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700"></div>
              <div className="flex-1 space-y-2 py-1">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Activity</h3>
      </div>

      {activities.length === 0 ? (
        <EmptyState 
          icon={<HiOutlineClock />}
          title="No recent activity"
          description="Your latest actions will appear here."
        />
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div 
              key={activity.id}
              onClick={() => handleAction(activity)}
              className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
            >
              <div className="mt-1 p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                {getIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                  {activity.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {formatRelativeTime(activity.timestamp)}
                  </span>
                  <span className="text-slate-300 dark:text-slate-600">•</span>
                  <Badge size="sm" color={activity.type === 'chat' ? 'indigo' : activity.type === 'roadmap' ? 'emerald' : 'amber'}>
                    {activity.actionLabel}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default RecentActivity;
