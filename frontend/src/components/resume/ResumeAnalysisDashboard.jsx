import React, { useRef, useState } from 'react';
import { 
  Download, 
  RotateCcw, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Percent, 
  Printer,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { ScoreCircle } from './ScoreCircle.jsx';
import { SectionBreakdown } from './SectionBreakdown.jsx';
import { AtsCompatibilityCard } from './AtsCompatibilityCard.jsx';
import { SkillsMatrix } from './SkillsMatrix.jsx';
import { ImprovementSuggestions } from './ImprovementSuggestions.jsx';
import { PrintableResumeReport } from './PrintableResumeReport.jsx';
import { Card } from '../ui/Card.jsx';
import { Button } from '../ui/Button.jsx';

export const ResumeAnalysisDashboard = ({ analysisData, onReset }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isExporting, setIsExporting] = useState(false);
  const printRef = useRef(null);

  if (!analysisData || !analysisData.analysis) return null;

  const { fileName, targetRole, experienceLevel, createdAt, analysis } = analysisData;
  const {
    overallScore,
    verdict,
    atsScore,
    jobMatchScore,
    summary,
    sectionScores,
    atsAnalysis,
    skillsAnalysis,
    projectFeedback,
    experienceFeedback,
    jobMatchAnalysis,
    strengths = [],
    weaknesses = [],
    missingKeywords = [],
    recommendations = {},
    improvedSummary,
    improvedBulletPoints
  } = analysis;

  const handleDownloadPdf = async () => {
    setIsExporting(true);
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const element = document.getElementById('printable-resume-report') || printRef.current;
      const opt = {
        margin: [10, 10, 10, 10],
        filename: `${fileName?.replace(/\.[^/.]+$/, '')}_Resume_Analysis.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error('PDF export failed, falling back to window.print():', err);
      window.print();
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 dark:text-white text-base">
              {fileName || 'Resume Document'}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
              <span>Target: {targetRole || 'General'}</span>
              <span>•</span>
              <span>Level: {experienceLevel || 'N/A'}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleDownloadPdf}
            disabled={isExporting}
            className="text-xs flex items-center gap-1.5 px-3 py-2 border-slate-200 dark:border-slate-700"
          >
            <Download className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>{isExporting ? 'Generating PDF...' : 'Download Report'}</span>
          </Button>

          <Button
            size="sm"
            variant="primary"
            onClick={onReset}
            className="text-xs flex items-center gap-1.5 px-3 py-2 bg-teal-600 hover:bg-teal-700 text-white"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Upload New Resume</span>
          </Button>
        </div>
      </div>

      {/* Main Printable Content Container */}
      <div ref={printRef} className="space-y-6">
        {/* Top Scores Hero Card */}
        <Card className="p-6 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Circular Overall Score */}
            <div className="flex justify-center border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800 pb-6 md:pb-0">
              <ScoreCircle
                score={overallScore}
                verdict={verdict}
                label="Overall Resume Score"
                size={140}
                strokeWidth={12}
              />
            </div>

            {/* ATS & Job Match side scores */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-teal-500" />
                    ATS Compatibility
                  </span>
                  <span className="text-teal-600 dark:text-teal-400 font-bold">{atsScore}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div 
                    className="h-full bg-teal-500 rounded-full transition-all duration-700"
                    style={{ width: `${atsScore}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Percent className="w-3.5 h-3.5 text-blue-500" />
                    Role Match Alignment
                  </span>
                  <span className="text-blue-600 dark:text-blue-400 font-bold">
                    {jobMatchScore !== null ? `${jobMatchScore}%` : 'Standard'}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-700"
                    style={{ width: `${jobMatchScore !== null ? jobMatchScore : 75}%` }}
                  />
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-[11px] text-slate-500 dark:text-slate-400">
                Evaluation completed using Guidance Pilot AI. Scores reflect standard technical recruiter screening patterns.
              </div>
            </div>

            {/* AI Summary Statement */}
            <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/80 flex flex-col justify-center">
              <span className="text-[10px] uppercase font-bold text-teal-700 dark:text-teal-300 tracking-wider mb-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Executive AI Verdict
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {summary}
              </p>
            </div>
          </div>
        </Card>

        {/* Tab Navigation for Clean Scanning */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto custom-scrollbar">
          {[
            { id: 'overview', label: 'Overview & Sections' },
            { id: 'ats', label: 'ATS & Role Match' },
            { id: 'skills', label: 'Skills Gap Analysis' },
            { id: 'improvements', label: 'AI Rewrites & Actions' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-teal-600 text-white shadow-sm shadow-teal-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: Overview & Section Breakdown */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Strengths */}
              <Card className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
                <h4 className="font-bold text-emerald-700 dark:text-emerald-400 text-sm mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Key Resume Strengths
                </h4>
                <ul className="space-y-2 pl-5 list-disc text-xs text-slate-600 dark:text-slate-300">
                  {strengths.map((str, i) => (
                    <li key={i}>{str}</li>
                  ))}
                </ul>
              </Card>

              {/* Weaknesses */}
              <Card className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
                <h4 className="font-bold text-rose-700 dark:text-rose-400 text-sm mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Critical Shortcomings to Address
                </h4>
                <ul className="space-y-2 pl-5 list-disc text-xs text-slate-600 dark:text-slate-300">
                  {weaknesses.map((weak, i) => (
                    <li key={i}>{weak}</li>
                  ))}
                </ul>
              </Card>
            </div>

            <div>
              <div className="mb-3">
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Section-by-Section Score & Feedback
                </h3>
                <p className="text-xs text-slate-400">
                  Click on any section to see specific strengths, missing items, and required adjustments.
                </p>
              </div>
              <SectionBreakdown sectionScores={sectionScores} />
            </div>
          </div>
        )}

        {/* TAB 2: ATS & Role Matching */}
        {activeTab === 'ats' && (
          <AtsCompatibilityCard
            atsAnalysis={atsAnalysis}
            atsScore={atsScore}
            jobMatchScore={jobMatchScore}
            jobMatchAnalysis={jobMatchAnalysis}
          />
        )}

        {/* TAB 3: Skills Matrix */}
        {activeTab === 'skills' && (
          <SkillsMatrix
            skillsAnalysis={skillsAnalysis}
            missingKeywords={missingKeywords}
          />
        )}

        {/* TAB 4: AI Rewrites & Suggestions */}
        {activeTab === 'improvements' && (
          <ImprovementSuggestions
            improvedSummary={improvedSummary}
            improvedBulletPoints={improvedBulletPoints}
            recommendations={recommendations}
            projectFeedback={projectFeedback}
            experienceFeedback={experienceFeedback}
          />
        )}
      </div>

      {/* Hidden Off-Screen Container for Clean, Multi-Page PDF Generation */}
      <div className="overflow-hidden h-0 w-0 opacity-0 pointer-events-none">
        <PrintableResumeReport analysisData={analysisData} />
      </div>
    </div>
  );
};
