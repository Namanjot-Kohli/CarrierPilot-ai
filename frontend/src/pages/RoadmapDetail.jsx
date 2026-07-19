import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HiArrowLeft, HiOutlineTrash } from 'react-icons/hi2';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import RoadmapTimeline from '../components/roadmap/RoadmapTimeline';
import { PageLoader } from '../components/ui/Loader';
import { useToast } from '../context/ToastContext';
import * as roadmapApi from '../api/roadmapApi';

const RoadmapDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoadmap = async () => {
      setLoading(true);
      try {
        const res = await roadmapApi.getRoadmap(id);
        if (res.data) {
          const r = res.data;
          setRoadmap({
            id: r._id,
            title: r.title,
            description: r.description,
            targetRole: r.targetRole,
            estimatedDuration: r.estimatedWeeks ? `${r.estimatedWeeks} weeks` : 'TBD',
            status: r.status,
            milestones: r.milestones?.map((m, idx) => ({
              id: m._id,
              week: m.weekNumber || idx + 1,
              title: m.title,
              description: m.description,
              skills: m.skills || [],
              resources: m.resources || [],
              completed: m.isCompleted
            })) || []
          });
        }
      } catch (error) {
        addToast('Failed to load roadmap', 'error');
        navigate('/roadmaps');
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [id, addToast, navigate]);

  const handleToggleMilestone = async (milestoneId, completed) => {
    // Update local state optimistically
    const updatedMilestones = roadmap.milestones.map(m => 
      m.id === milestoneId ? { ...m, completed } : m
    );
    setRoadmap({ ...roadmap, milestones: updatedMilestones });
    addToast(completed ? 'Milestone completed!' : 'Milestone marked as incomplete', 'success');
    
    // Call API
    try {
      await roadmapApi.toggleMilestone(roadmap.id, milestoneId);
    } catch (error) {
      addToast('Failed to update milestone on server', 'error');
      // Revert optimistic update
      const revertedMilestones = roadmap.milestones.map(m => 
        m.id === milestoneId ? { ...m, completed: !completed } : m
      );
      setRoadmap({ ...roadmap, milestones: revertedMilestones });
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this roadmap?')) {
      try {
        await roadmapApi.deleteRoadmap(roadmap.id);
        addToast('Roadmap deleted', 'success');
        navigate('/roadmaps');
      } catch (error) {
        addToast('Failed to delete roadmap', 'error');
      }
    }
  };

  if (loading) return <PageLoader />;
  if (!roadmap) return null;

  const completedCount = roadmap.milestones.filter(m => m.completed).length;
  const totalCount = roadmap.milestones.length;
  const progress = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header section */}
      <div>
        <button 
          onClick={() => navigate('/roadmaps')}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 mb-6 transition-colors"
        >
          <HiArrowLeft className="w-4 h-4" /> Back to Roadmaps
        </button>

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <Badge color={roadmap.status === 'active' ? 'emerald' : 'gray'} className="uppercase">
                {roadmap.status}
              </Badge>
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                Target: {roadmap.targetRole}
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                Duration: {roadmap.estimatedDuration}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{roadmap.title}</h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-3xl">
              {roadmap.description}
            </p>
          </div>

          <Button 
            variant="danger" 
            size="sm" 
            leftIcon={<HiOutlineTrash />}
            onClick={handleDelete}
            className="flex-shrink-0"
          >
            Delete
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm mt-8">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-slate-900 dark:text-white">Overall Progress</span>
            <span className="font-bold text-indigo-600 dark:text-indigo-400">{progress}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-violet-500 h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            {completedCount} of {totalCount} milestones completed
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Learning Timeline</h2>
        <RoadmapTimeline 
          milestones={roadmap.milestones} 
          onToggleMilestone={handleToggleMilestone}
        />
      </div>
    </div>
  );
};

export default RoadmapDetail;
