import React, { useEffect, useState } from 'react';
import { 
  FileText, 
  History, 
  Sparkles, 
  Trash2, 
  Clock, 
  ArrowRight, 
  AlertCircle 
} from 'lucide-react';
import { ResumeUploadSection } from '../components/resume/ResumeUploadSection.jsx';
import { ResumeAnalysisDashboard } from '../components/resume/ResumeAnalysisDashboard.jsx';
import { 
  analyzeResumeApi, 
  getResumeHistoryApi, 
  deleteResumeAnalysisApi 
} from '../api/resumeApi.js';
import { useToast } from '../hooks/useToast.js';

export default function ResumeAnalyzer() {
  const [activeAnalysis, setActiveAnalysis] = useState(null);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [apiError, setApiError] = useState('');

  const { addToast } = useToast();

  const loadHistory = async () => {
    try {
      setLoadingHistory(true);
      const res = await getResumeHistoryApi();
      if (res && res.data) {
        setHistory(res.data);
      }
    } catch (err) {
      console.error('Failed to load resume analysis history:', err);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleAnalyze = async (formData) => {
    setIsLoading(true);
    setApiError('');
    try {
      const res = await analyzeResumeApi(formData);
      if (res && res.data) {
        setActiveAnalysis(res.data);
        addToast('Resume analysis generated successfully!', 'success');
        loadHistory();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err) {
      console.error('Analysis failed:', err);
      const msg = err.response?.data?.message || err.message || 'Failed to analyze resume. Please try again.';
      setApiError(msg);
      addToast(msg, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteHistory = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm('Delete this resume analysis record?')) return;
    try {
      await deleteResumeAnalysisApi(id);
      setHistory(prev => prev.filter(item => item._id !== id));
      if (activeAnalysis?._id === id) {
        setActiveAnalysis(null);
      }
      addToast('Record deleted.', 'info');
    } catch (err) {
      addToast('Failed to delete record.', 'error');
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            AI Career Strategist
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            AI Resume Analyzer
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Pinpoint weaknesses, optimize for ATS screening algorithms, and get tailored rewrites for your target role.
          </p>
        </div>
      </div>

          {apiError && (
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">Analysis Notice</p>
                <p className="text-xs mt-0.5">{apiError}</p>
              </div>
            </div>
          )}

          {/* Active Analysis Dashboard or Upload Section */}
          {activeAnalysis ? (
            <ResumeAnalysisDashboard 
              analysisData={activeAnalysis} 
              onReset={() => setActiveAnalysis(null)} 
            />
          ) : (
            <div className="space-y-8">
              <ResumeUploadSection 
                onAnalyze={handleAnalyze} 
                isLoading={isLoading} 
              />

              {/* Past Analyses History */}
              {history && history.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <History className="w-4 h-4 text-slate-400" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Recent Resume Analyses ({history.length})
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {history.map((item) => {
                      const score = item.analysis?.overallScore ?? 75;
                      const verdict = item.analysis?.verdict ?? 'Good';
                      return (
                        <div
                          key={item._id}
                          onClick={() => {
                            setActiveAnalysis(item);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-teal-500/50 transition-all cursor-pointer group flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400">
                                <Clock className="w-3 h-3" />
                                {new Date(item.createdAt).toLocaleDateString()}
                              </span>
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                                {score}/100 • {verdict}
                              </span>
                            </div>

                            <p className="font-bold text-slate-900 dark:text-white text-sm truncate">
                              {item.fileName}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
                              Target: {item.targetRole || 'General'}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                            <span className="font-semibold text-teal-600 dark:text-teal-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                              View Audit <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                            <button
                              type="button"
                              onClick={(e) => handleDeleteHistory(e, item._id)}
                              className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                              title="Delete record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
    </div>
  );
}
