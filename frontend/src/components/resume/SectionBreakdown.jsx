import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  AlertTriangle, 
  Lightbulb, 
  UserCheck, 
  FileText, 
  Code2, 
  Briefcase, 
  FolderGit2, 
  GraduationCap, 
  Award 
} from 'lucide-react';

const sectionMeta = {
  contactInfo: { title: 'Contact Information', icon: UserCheck },
  professionalSummary: { title: 'Professional Summary', icon: FileText },
  skills: { title: 'Technical & Soft Skills', icon: Code2 },
  workExperience: { title: 'Work Experience', icon: Briefcase },
  projects: { title: 'Projects & Portfolio', icon: FolderGit2 },
  education: { title: 'Education & Academics', icon: GraduationCap },
  certifications: { title: 'Certifications & Licenses', icon: Award }
};

export const SectionBreakdown = ({ sectionScores = {} }) => {
  const [openSection, setOpenSection] = useState('skills');

  const getScoreColor = (score = 0) => {
    if (score >= 80) return 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-800';
    if (score >= 65) return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800';
    if (score >= 50) return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800';
    return 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800';
  };

  const sections = Object.entries(sectionScores);
  if (sections.length === 0) return null;

  return (
    <div className="space-y-3">
      {sections.map(([key, data]) => {
        const meta = sectionMeta[key] || { title: key, icon: FileText };
        const IconComponent = meta.icon;
        const isOpen = openSection === key;
        const score = data?.score ?? 70;

        return (
          <div
            key={key}
            className="border border-slate-200/90 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 overflow-hidden transition-all duration-200 shadow-sm"
          >
            {/* Accordion Header */}
            <button
              type="button"
              onClick={() => setOpenSection(isOpen ? null : key)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
                  <IconComponent className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
                    {meta.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-slate-400">
                      {data?.good?.length || 0} strengths • {data?.improvements?.length || 0} actions
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getScoreColor(score)}`}>
                  {score}%
                </span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
              </div>
            </button>

            {/* Accordion Body */}
            {isOpen && (
              <div className="p-4 pt-1 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/30 dark:bg-slate-900/40 text-xs space-y-3">
                {/* Good / Strengths */}
                {data?.good && data.good.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-400 mb-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      What's Working Well
                    </div>
                    <ul className="space-y-1 pl-5 list-disc text-slate-600 dark:text-slate-300">
                      {data.good.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Missing Elements */}
                {data?.missing && data.missing.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-400 mb-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Missing Elements
                    </div>
                    <ul className="space-y-1 pl-5 list-disc text-slate-600 dark:text-slate-300">
                      {data.missing.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Needs Improvement */}
                {data?.improvements && data.improvements.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 font-semibold text-teal-700 dark:text-teal-400 mb-1.5">
                      <Lightbulb className="w-3.5 h-3.5" />
                      Recommended Adjustments
                    </div>
                    <ul className="space-y-1 pl-5 list-disc text-slate-600 dark:text-slate-300">
                      {data.improvements.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
