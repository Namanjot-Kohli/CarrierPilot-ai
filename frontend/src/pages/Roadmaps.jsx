import React, { useState, useEffect } from 'react';
import RoadmapCard from '../components/roadmap/RoadmapCard';
import { SkeletonCard } from '../components/ui/Loader';
import EmptyState from '../components/ui/EmptyState';
import { HiOutlineMap } from 'react-icons/hi2';
import * as roadmapApi from '../api/roadmapApi';
import { useToast } from '../context/ToastContext';

const Roadmaps = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const { addToast } = useToast();

  useEffect(() => {
    const fetchRoadmaps = async () => {
      setLoading(true);
      try {
        const res = await roadmapApi.getRoadmaps();
        if (res.data) {
          const mappedRoadmaps = res.data.map(r => ({
            id: r._id,
            title: r.title,
            description: r.description,
            targetRole: r.targetRole,
            estimatedDuration: r.estimatedWeeks ? `${r.estimatedWeeks} weeks` : 'TBD',
            status: r.status,
            updatedAt: r.updatedAt,
            milestones: r.milestones?.map(m => ({
              id: m._id,
              completed: m.isCompleted
            })) || []
          }));
          setRoadmaps(mappedRoadmaps);
        }
      } catch (error) {
        console.error("Failed to load roadmaps", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmaps();
  }, []);

  const handleDelete = async (id) => {
    try {
      await roadmapApi.deleteRoadmap(id);
      setRoadmaps(roadmaps.filter(r => r.id !== id));
      addToast('Roadmap deleted successfully', 'success');
    } catch (error) {
      addToast('Failed to delete roadmap', 'error');
    }
  };

  const filteredRoadmaps = roadmaps.filter(r => filter === 'all' || r.status === filter);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Learning Roadmaps</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Track your progress and follow AI-generated paths to reach your career goals.
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          {['all', 'active', 'completed'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === f 
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-400' 
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
        </div>
      ) : filteredRoadmaps.length === 0 ? (
        <div className="py-12">
          <EmptyState
            icon={<HiOutlineMap />}
            title="No roadmaps found"
            description={filter === 'all' ? "You don't have any roadmaps yet. Chat with the AI to generate one." : `You don't have any ${filter} roadmaps.`}
            actionLabel="Generate Roadmap"
            onAction={() => window.location.href = '/chat'}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredRoadmaps.map((roadmap) => (
            <RoadmapCard key={roadmap.id} roadmap={roadmap} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Roadmaps;
