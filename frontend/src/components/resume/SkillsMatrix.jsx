import React from 'react';
import { 
  Check, 
  X, 
  HelpCircle, 
  Tag, 
  Layers, 
  Code, 
  MessageSquare, 
  AlertTriangle 
} from 'lucide-react';
import { Card } from '../ui/Card.jsx';

export const SkillsMatrix = ({ skillsAnalysis = {}, missingKeywords = [] }) => {
  const {
    technicalSkills = [],
    softSkills = [],
    missingRelevantSkills = [],
    undemonstratedSkills = []
  } = skillsAnalysis;

  return (
    <Card className="p-5 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-sm">
      <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
        <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 flex items-center justify-center">
          <Layers className="w-4 h-4" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            Skills Matrix & Gap Analysis
          </h3>
          <p className="text-[11px] text-slate-400">
            Detected technical competencies versus market requirements
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Detected Technical Skills */}
        <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200 mb-2">
            <Code className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            Detected Hard Skills ({technicalSkills.length})
          </div>
          {technicalSkills.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {technicalSkills.map((skill, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800/60"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 text-[11px]">No specific hard skills clearly detected.</p>
          )}
        </div>

        {/* Soft Skills */}
        <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200 mb-2">
            <MessageSquare className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            Soft & Professional Skills ({softSkills.length})
          </div>
          {softSkills.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {softSkills.map((skill, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 text-[11px]">No soft skills identified.</p>
          )}
        </div>

        {/* Missing Skills */}
        <div className="p-3.5 rounded-xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30">
          <div className="flex items-center gap-1.5 font-semibold text-rose-700 dark:text-rose-400 mb-2">
            <X className="w-3.5 h-3.5" />
            Missing In-Demand Skills ({missingRelevantSkills.length})
          </div>
          {missingRelevantSkills.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {missingRelevantSkills.map((skill, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-white dark:bg-slate-900 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-emerald-600 dark:text-emerald-400 text-[11px]">Comprehensive skill coverage!</p>
          )}
        </div>

        {/* Undemonstrated Skills */}
        <div className="p-3.5 rounded-xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30">
          <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-400 mb-2">
            <AlertTriangle className="w-3.5 h-3.5" />
            Listed but Undemonstrated
          </div>
          {undemonstratedSkills.length > 0 ? (
            <ul className="space-y-1 text-slate-600 dark:text-slate-300 text-[11px] list-disc pl-4">
              {undemonstratedSkills.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-400 text-[11px]">All listed skills have supporting project evidence.</p>
          )}
        </div>
      </div>
    </Card>
  );
};
