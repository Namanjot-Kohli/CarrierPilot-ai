import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  ArrowRight, 
  Quote, 
  Zap, 
  Lightbulb 
} from 'lucide-react';
import { Card } from '../ui/Card.jsx';
import { Button } from '../ui/Button.jsx';

export const ImprovementSuggestions = ({ 
  improvedSummary = '', 
  improvedBulletPoints = [], 
  recommendations = {}, 
  projectFeedback = {}, 
  experienceFeedback = {} 
}) => {
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [copiedBulletIdx, setCopiedBulletIdx] = useState(null);

  const handleCopy = (text, type, idx = null) => {
    navigator.clipboard.writeText(text);
    if (type === 'summary') {
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2000);
    } else if (type === 'bullet') {
      setCopiedBulletIdx(idx);
      setTimeout(() => setCopiedBulletIdx(null), 2000);
    }
  };

  const top5 = recommendations?.top5Immediate || [];

  return (
    <div className="space-y-6">
      {/* Top 5 Immediate Priority Actions */}
      {top5.length > 0 && (
        <Card className="p-5 bg-gradient-to-br from-teal-50/50 to-emerald-50/30 dark:from-teal-950/20 dark:to-emerald-950/10 border border-teal-200/80 dark:border-teal-800/80 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center shadow-sm">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                Top 5 Priority Actions to Improve Your Chances
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Fix these first for the fastest score boost
              </p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            {top5.map((action, i) => (
              <div 
                key={i}
                className="flex items-start gap-3 p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-teal-100 dark:border-teal-900/50"
              >
                <span className="w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300 font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {action}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* AI Rewritten Professional Summary */}
      {improvedSummary && (
        <Card className="p-5 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  AI-Optimized Professional Summary
                </h4>
                <p className="text-[11px] text-slate-400">
                  Concise, impact-driven opening grounded strictly in your experience
                </p>
              </div>
            </div>

            <Button
              size="sm"
              variant="outline"
              onClick={() => handleCopy(improvedSummary, 'summary')}
              className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              {copiedSummary ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy Summary</span>
                </>
              )}
            </Button>
          </div>

          <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80 text-xs leading-relaxed text-slate-700 dark:text-slate-200 italic">
            "{improvedSummary}"
          </div>
        </Card>
      )}

      {/* Weak Bullet Points vs Improved Rewrites */}
      {improvedBulletPoints && improvedBulletPoints.length > 0 && (
        <Card className="p-5 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
            <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                Before & After: Bullet Point Refactoring
              </h4>
              <p className="text-[11px] text-slate-400">
                Transform passive tasks into quantifiable XYZ-impact statements
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {improvedBulletPoints.map((item, idx) => (
              <div 
                key={idx}
                className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/40 text-xs space-y-2.5"
              >
                {/* Original Weak */}
                <div className="p-2.5 rounded-lg bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40">
                  <div className="text-[10px] uppercase font-bold text-rose-600 dark:text-rose-400 mb-1 flex items-center gap-1">
                    <span>Original (Passive / Weak):</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 line-through opacity-80">
                    "{item.original}"
                  </p>
                </div>

                {/* Improved */}
                <div className="p-2.5 rounded-lg bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200/70 dark:border-teal-800/60 relative">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase font-bold text-teal-700 dark:text-teal-300 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> AI Improved (Action + Metric):
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(item.improved, 'bullet', idx)}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-700 dark:text-teal-300 hover:text-teal-900 transition-colors"
                    >
                      {copiedBulletIdx === idx ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> Copy
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-slate-900 dark:text-white font-medium">
                    "{item.improved}"
                  </p>
                </div>

                {/* Reason */}
                {item.reason && (
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 pl-1">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Why this works:</span> {item.reason}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Project & Experience Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projectFeedback?.suggestions && projectFeedback.suggestions.length > 0 && (
          <Card className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs shadow-sm">
            <h5 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-500" />
              Project Enhancement Advice
            </h5>
            <p className="text-slate-500 dark:text-slate-400 text-[11px] mb-2">
              {projectFeedback.impactAndOutcomesFeedback || 'Strengthen project complexity descriptions.'}
            </p>
            <ul className="space-y-1 list-disc pl-4 text-slate-600 dark:text-slate-300 text-[11px]">
              {projectFeedback.suggestions.map((sug, i) => (
                <li key={i}>{sug}</li>
              ))}
            </ul>
          </Card>
        )}

        {experienceFeedback?.actionVerbsSuggestions && experienceFeedback.actionVerbsSuggestions.length > 0 && (
          <Card className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs shadow-sm">
            <h5 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-blue-500" />
              Power Action Verbs to Use
            </h5>
            <p className="text-slate-500 dark:text-slate-400 text-[11px] mb-2">
              Replace repetitive words like "handled" or "worked on":
            </p>
            <div className="flex flex-wrap gap-1.5">
              {experienceFeedback.actionVerbsSuggestions.map((verb, i) => (
                <span 
                  key={i}
                  className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                >
                  {verb}
                </span>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
