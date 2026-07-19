import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import StatsCard from '../components/dashboard/StatsCard';
import QuickActions from '../components/dashboard/QuickActions';
import RecentActivity from '../components/dashboard/RecentActivity';
import SkillRadar from '../components/dashboard/SkillRadar';
import { HiOutlineChatBubbleLeftRight, HiOutlineMap, HiOutlineBookmark, HiOutlineCodeBracketSquare } from 'react-icons/hi2';
import * as userApi from '../api/userApi';

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [statsData, activityData] = await Promise.all([
          userApi.getStats(),
          userApi.getActivity()
        ]);
        
        setStats({
          conversations: statsData?.data?.conversations || 0,
          roadmaps: statsData?.data?.roadmaps || 0,
          savedItems: statsData?.data?.savedItems || 0,
          skills: user?.skills?.length || 0,
        });

        setActivities(activityData?.data || []);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const firstName = user?.name?.split(' ')[0] || 'Explorer';

  return (
    <div className="space-y-6 pb-12">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Welcome back, {firstName}!
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Here's an overview of your career progression and recent activities.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatsCard 
          title="Total Conversations" 
          value={loading ? '-' : stats?.conversations} 
          icon={<HiOutlineChatBubbleLeftRight className="w-6 h-6" />}
          color="indigo"
        />
        <StatsCard 
          title="Active Roadmaps" 
          value={loading ? '-' : stats?.roadmaps} 
          icon={<HiOutlineMap className="w-6 h-6" />}
          color="emerald"
        />
        <StatsCard 
          title="Saved Resources" 
          value={loading ? '-' : stats?.savedItems} 
          icon={<HiOutlineBookmark className="w-6 h-6" />}
          color="amber"
        />
        <StatsCard 
          title="Skills Tracked" 
          value={loading ? '-' : stats?.skills} 
          icon={<HiOutlineCodeBracketSquare className="w-6 h-6" />}
          color="purple"
        />
      </div>

      {/* Quick Actions */}
      <div className="pt-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Start a new session</h2>
        <QuickActions />
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
        <div className="lg:col-span-2">
          <RecentActivity activities={activities} loading={loading} />
        </div>
        <div className="lg:col-span-1">
          <SkillRadar skills={user?.skills || ['React', 'JavaScript', 'Tailwind', 'Node.js']} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
