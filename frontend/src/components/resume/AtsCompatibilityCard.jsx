import React from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Cpu, 
  Layers, 
  FileCheck, 
  Percent, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Card } from '../ui/Card.jsx';

export const AtsCompatibilityCard = ({ atsAnalysis = {}, atsScore = 80, jobMatchScore = null, jobMatchAnalysis = {} }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* ATS Compatibility */}
      <Card className="p-5 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                ATS Compatibility Audit
              </h3>
              <p className="text-[11px] text-slate-400">
                Machine-readability and layout compliance
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xl font-extrabold text-teal-600 dark:text-teal-400">
              {atsScore}%
            </span>
          </div>
        </div>

        <div className="mt-4 space-y-2.5 text-xs">
          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
            <span className="text-slate-600 dark:text-slate-300">Layout & Font Simplicity</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> High Compatibility
            </span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
            <span className="text-slate-600 dark:text-slate-300">Standard Section Headers</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Standardized
            </span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
            <span className="text-slate-600 dark:text-slate-300">Complex Tables / Graphics</span>
            <span className="font-semibold text-slate-600 dark:text-slate-300">
              {atsAnalysis?.hasComplexTablesOrGraphics ? 'Detected (Risk)' : 'None Detected (Clean)'}
            </span>
          </div>

          {atsAnalysis?.recommendations && atsAnalysis.recommendations.length > 0 && (
            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-teal-500" />
                ATS Optimization Tips:
              </p>
              <ul className="space-y-1 pl-4 list-disc text-slate-500 dark:text-slate-400 text-[11px]">
                {atsAnalysis.recommendations.map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Card>

      {/* Job Description Match (If available) */}
      <Card className="p-5 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Percent className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                Target Role Alignment
              </h3>
              <p className="text-[11px] text-slate-400">
                {jobMatchScore !== null ? 'Benchmarked against Job Description' : 'General Role Match Assessment'}
              </p>
            </div>
          </div>
          {jobMatchScore !== null && (
            <div className="text-right">
              <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
                {jobMatchScore}%
              </span>
            </div>
          )}
        </div>

        <div className="mt-4 space-y-3 text-xs">
          {jobMatchAnalysis?.matchingSkills && jobMatchAnalysis.matchingSkills.length > 0 ? (
            <div>
              <p className="font-semibold text-emerald-700 dark:text-emerald-400 mb-1.5 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Key Skills Matching Target:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {jobMatchAnalysis.matchingSkills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 text-slate-500 text-[11px]">
              No custom Job Description was provided. For transparent JD skill matching, upload your target job posting text during analysis.
            </div>
          )}

          {jobMatchAnalysis?.missingSkills && jobMatchAnalysis.missingSkills.length > 0 && (
            <div>
              <p className="font-semibold text-rose-700 dark:text-rose-400 mb-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                Missing Qualifications / Tech:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {jobMatchAnalysis.missingSkills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {jobMatchAnalysis?.keywordsToIncorporate && jobMatchAnalysis.keywordsToIncorporate.length > 0 && (
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Recommended Keywords to Incorporate:
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                {jobMatchAnalysis.keywordsToIncorporate.join(', ')}
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
