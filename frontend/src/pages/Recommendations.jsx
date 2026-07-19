import React, { useState, useEffect } from 'react';
import * as recommendationApi from '../api/recommendationApi';
import { SkeletonCard } from '../components/ui/Loader';
import EmptyState from '../components/ui/EmptyState';
import ProjectCard from '../components/recommendations/ProjectCard';
import RecommendationCard from '../components/recommendations/RecommendationCard';
import { HiOutlineBookmark, HiOutlineSparkles } from 'react-icons/hi2';
import { useToast } from '../context/ToastContext';

const Recommendations = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const { addToast } = useToast();

  useEffect(() => {
    const fetchRecs = async () => {
      setLoading(true);
      try {
        const res = await recommendationApi.getRecommendations();
        const mappedData = res.data.map(rec => ({
          ...rec,
          ...rec.details, // Spread details (techStack, cost, etc.) to the root level for the cards
          id: rec._id,
          saved: rec.isSaved
        }));
        setRecommendations(mappedData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecs();
  }, []);

  const handleToggleSave = async (id) => {
    try {
      await recommendationApi.toggleSave(id);
      setRecommendations(recs => recs.map(r => {
        if (r.id === id) {
          return { ...r, saved: !r.saved };
        }
        return r;
      }));
    } catch (error) {
      console.error('Failed to toggle save status', error);
      addToast('Failed to update save status', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await recommendationApi.deleteRecommendation(id);
      setRecommendations(recs => recs.filter(r => r.id !== id));
    } catch (error) {
      console.error('Failed to delete recommendation', error);
      addToast('Failed to delete recommendation', 'error');
    }
  };

  const tabs = [
    { id: 'all', label: 'All Recommendations' },
    { id: 'project', label: 'Projects' },
    { id: 'certification', label: 'Certifications' },
    { id: 'career', label: 'Career Advice' },
    { id: 'saved', label: 'Saved Items', icon: <HiOutlineBookmark className="w-4 h-4 mr-1 inline" /> }
  ];

  const filteredRecs = recommendations.filter(r => {
    if (activeTab === 'all') return true;
    if (activeTab === 'saved') return r.saved;
    return r.type === activeTab;
  });

  const renderCard = (rec) => {
    if (rec.type === 'project') return <ProjectCard key={rec.id} project={rec} onToggleSave={handleToggleSave} onDelete={handleDelete} />;
    return <RecommendationCard key={rec.id} recommendation={rec} onToggleSave={handleToggleSave} onDelete={handleDelete} />;
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Recommendations</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Personalized projects, certifications, and advice tailored to your career goals.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 hide-scrollbar">
        <div className="flex space-x-2 border-b border-slate-200 dark:border-slate-800 w-full min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-4 text-sm font-medium transition-colors relative whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
              }`}
            >
              {tab.icon}{tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-t-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="pt-4">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : filteredRecs.length === 0 ? (
          <div className="py-12">
            <EmptyState
              icon={activeTab === 'saved' ? <HiOutlineBookmark /> : <HiOutlineSparkles />}
              title={activeTab === 'saved' ? "No saved items" : "No recommendations yet"}
              description={activeTab === 'saved' ? "Items you save will appear here." : "Chat with the AI to generate personalized recommendations."}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredRecs.map(renderCard)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommendations;
