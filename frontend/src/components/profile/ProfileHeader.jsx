import React from 'react';
import { getInitials, getAvatarColor } from '../../utils/formatters';
import Badge from '../ui/Badge';
import { HiOutlineBriefcase, HiOutlineSparkles } from 'react-icons/hi2';

const ProfileHeader = ({ user, stats }) => {
  if (!user) return null;

  const avatarColor = getAvatarColor(user.name);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden mb-8 relative">
      {/* Cover Image/Gradient - Sleek Premium Look */}
      <div className="h-32 md:h-48 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 dark:from-indigo-900 dark:via-purple-900/60 dark:to-slate-900 relative overflow-hidden">
        {/* Subtle overlay effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>
      
      <div className="px-6 md:px-10 pb-10 relative">
        <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 mb-6">
          {/* Avatar Spacer to push layout down properly */}
          <div className="relative w-28 h-12 sm:w-40 sm:h-16 flex-shrink-0">
            {/* Absolutely positioned Avatar so it breaks out without messing up siblings */}
            <div 
              className={`absolute bottom-0 left-0 w-28 h-28 sm:w-40 sm:h-40 rounded-3xl shadow-2xl flex items-center justify-center text-5xl sm:text-7xl font-bold text-white border-4 sm:border-[6px] border-white dark:border-[#0f172a] z-10 ${avatarColor}`}
            >
              {getInitials(user.name)}
            </div>
          </div>
          
          <div className="flex-1 pt-2 sm:pt-4">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
              {user.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-slate-600 dark:text-slate-400 font-medium">
              <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/50 px-3 py-1 rounded-full text-sm border border-slate-200 dark:border-slate-700">
                <HiOutlineBriefcase className="w-4 h-4" />
                {user.currentRole || 'Add your current role'}
              </span>
              <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/50 px-3 py-1 rounded-full text-sm border border-slate-200 dark:border-slate-700">
                <HiOutlineSparkles className="w-4 h-4 text-amber-500" />
                {user.experienceLevel || 'Experience level'}
              </span>
            </div>
          </div>
        </div>

        {user.bio ? (
          <p className="text-slate-600 dark:text-slate-300 max-w-3xl mb-8 leading-relaxed text-lg">
            {user.bio}
          </p>
        ) : (
          <div className="mb-8" />
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:flex flex-wrap gap-4 md:gap-12 border-t border-slate-100 dark:border-slate-800 pt-8">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl md:bg-transparent dark:md:bg-transparent md:p-0 md:rounded-none">
            <p className="text-sm font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase mb-1">Conversations</p>
            <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{stats?.conversations || 0}</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl md:bg-transparent dark:md:bg-transparent md:p-0 md:rounded-none">
            <p className="text-sm font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase mb-1">Roadmaps</p>
            <p className="text-3xl font-black text-purple-600 dark:text-purple-400">{stats?.roadmaps || 0}</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl md:bg-transparent dark:md:bg-transparent md:p-0 md:rounded-none col-span-2 md:col-span-1">
            <p className="text-sm font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase mb-1">Saved Items</p>
            <p className="text-3xl font-black text-pink-600 dark:text-pink-400">{stats?.savedItems || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
