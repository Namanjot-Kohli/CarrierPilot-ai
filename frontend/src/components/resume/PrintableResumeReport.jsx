import React from 'react';

export const PrintableResumeReport = ({ analysisData }) => {
  if (!analysisData || !analysisData.analysis) return null;

  const { fileName, targetRole, experienceLevel, createdAt, analysis } = analysisData;
  const {
    overallScore = 0,
    verdict = 'N/A',
    atsScore = 0,
    jobMatchScore = null,
    summary = '',
    sectionScores = {},
    atsAnalysis = {},
    skillsAnalysis = {},
    projectFeedback = {},
    experienceFeedback = {},
    jobMatchAnalysis = {},
    strengths = [],
    weaknesses = [],
    missingKeywords = [],
    recommendations = {},
    improvedSummary = '',
    improvedBulletPoints = []
  } = analysis;

  const getVerdictColor = (v) => {
    switch (v) {
      case 'Excellent': return '#0d9488';
      case 'Good': return '#2563eb';
      case 'Average': return '#d97706';
      default: return '#dc2626';
    }
  };

  const sections = Object.entries(sectionScores);
  const top5 = recommendations?.top5Immediate || [];

  return (
    <div id="printable-resume-report" className="p-8 bg-white text-slate-800 font-sans space-y-6 text-sm leading-relaxed max-w-4xl mx-auto">
      {/* Document Header */}
      <div className="border-b-2 border-teal-600 pb-4 flex justify-between items-end">
        <div>
          <div className="text-xs uppercase font-extrabold tracking-widest text-teal-700">
            Guidance Pilot • Career Intelligence Platform
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            Executive Resume Analysis Report
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Candidate Document: <strong className="text-slate-800">{fileName}</strong> • Target: <strong className="text-slate-800">{targetRole || 'General'}</strong> ({experienceLevel || 'N/A'})
          </p>
        </div>
        <div className="text-right text-xs text-slate-400">
          <div>Report Date</div>
          <div className="font-semibold text-slate-700">
            {new Date(createdAt || Date.now()).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
          </div>
        </div>
      </div>

      {/* Primary Scorecard */}
      <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
        <div className="text-center border-r border-slate-200 pr-2">
          <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">Overall Score</div>
          <div className="text-4xl font-black text-slate-900 mt-1">{overallScore}<span className="text-base font-normal text-slate-400">/100</span></div>
          <div className="inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-bold text-white" style={{ backgroundColor: getVerdictColor(verdict) }}>
            {verdict}
          </div>
        </div>

        <div className="text-center border-r border-slate-200 pr-2">
          <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">ATS Compatibility</div>
          <div className="text-4xl font-black text-teal-600 mt-1">{atsScore}%</div>
          <div className="text-[11px] text-slate-500 mt-1 font-medium">Layout & Header Audit</div>
        </div>

        <div className="text-center">
          <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">Job Role Match</div>
          <div className="text-4xl font-black text-blue-600 mt-1">
            {jobMatchScore !== null ? `${jobMatchScore}%` : 'N/A'}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 font-medium">
            {jobMatchScore !== null ? 'Benchmarked to JD' : 'General Evaluation'}
          </div>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-200/80">
        <h3 className="text-xs uppercase font-bold text-teal-800 tracking-wider mb-1">
          Executive Verdict & Assessment Summary
        </h3>
        <p className="text-slate-700 text-xs leading-relaxed">
          {summary}
        </p>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30">
          <h3 className="font-bold text-emerald-800 text-xs uppercase tracking-wider mb-2">
            ✓ Key Resume Strengths
          </h3>
          <ul className="list-disc pl-4 space-y-1 text-xs text-slate-700">
            {strengths.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/30">
          <h3 className="font-bold text-rose-800 text-xs uppercase tracking-wider mb-2">
            ⚠ Critical Weaknesses to Resolve
          </h3>
          <ul className="list-disc pl-4 space-y-1 text-xs text-slate-700">
            {weaknesses.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Section-by-Section Scores Table */}
      <div>
        <h3 className="font-bold text-slate-900 text-sm mb-2 pb-1 border-b border-slate-200">
          Detailed Section-by-Section Breakdown
        </h3>
        <table className="w-full text-xs text-left border-collapse border border-slate-200">
          <thead>
            <tr className="bg-slate-100 text-slate-700">
              <th className="p-2 border border-slate-200 w-36">Section</th>
              <th className="p-2 border border-slate-200 w-16 text-center">Score</th>
              <th className="p-2 border border-slate-200">Strengths & Recommended Improvements</th>
            </tr>
          </thead>
          <tbody>
            {sections.map(([key, sec]) => (
              <tr key={key} className="border-b border-slate-200">
                <td className="p-2 border border-slate-200 font-semibold capitalize text-slate-800">
                  {key.replace(/([A-Z])/g, ' $1')}
                </td>
                <td className="p-2 border border-slate-200 text-center font-bold text-teal-700">
                  {sec?.score || 70}%
                </td>
                <td className="p-2 border border-slate-200 text-slate-600">
                  {sec?.good && sec.good.length > 0 && (
                    <div className="mb-1">
                      <strong className="text-emerald-700">Good:</strong> {sec.good.join(' • ')}
                    </div>
                  )}
                  {sec?.improvements && sec.improvements.length > 0 && (
                    <div>
                      <strong className="text-amber-700">Action:</strong> {sec.improvements.join(' • ')}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Skills Matrix */}
      <div>
        <h3 className="font-bold text-slate-900 text-sm mb-2 pb-1 border-b border-slate-200">
          Competency & Skills Matrix
        </h3>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="font-bold text-teal-800 block mb-1">Detected Technical Skills:</span>
            <span className="text-slate-700">{skillsAnalysis?.technicalSkills?.join(', ') || 'None identified'}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="font-bold text-rose-800 block mb-1">Missing In-Demand Skills:</span>
            <span className="text-slate-700">{skillsAnalysis?.missingRelevantSkills?.join(', ') || 'No major gaps'}</span>
          </div>
        </div>
      </div>

      {/* Top 5 Immediate Priority Actions */}
      {top5.length > 0 && (
        <div className="p-4 rounded-xl border border-teal-200 bg-teal-50/40">
          <h3 className="font-bold text-teal-900 text-xs uppercase tracking-wider mb-2">
            Top 5 Priority Actions to Increase Shortlisting Chances
          </h3>
          <ol className="list-decimal pl-5 space-y-1 text-xs text-slate-700 font-medium">
            {top5.map((action, i) => (
              <li key={i}>{action}</li>
            ))}
          </ol>
        </div>
      )}

      {/* AI Rewritten Professional Summary */}
      {improvedSummary && (
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1">
            Suggested Professional Summary (Ready to Use)
          </h3>
          <p className="text-xs text-slate-700 italic leading-relaxed">
            "{improvedSummary}"
          </p>
        </div>
      )}

      {/* Improved Bullet Points */}
      {improvedBulletPoints && improvedBulletPoints.length > 0 && (
        <div>
          <h3 className="font-bold text-slate-900 text-sm mb-2 pb-1 border-b border-slate-200">
            Experience Bullet Point Improvements (XYZ Format)
          </h3>
          <div className="space-y-3">
            {improvedBulletPoints.map((b, i) => (
              <div key={i} className="p-3 rounded-lg border border-slate-200 bg-slate-50 text-xs space-y-1">
                <div className="text-rose-700 line-through opacity-80">
                  <strong>Original:</strong> "{b.original}"
                </div>
                <div className="text-teal-900 font-semibold">
                  <strong>Improved:</strong> "{b.improved}"
                </div>
                {b.reason && (
                  <div className="text-[11px] text-slate-500">
                    <em>Rationale: {b.reason}</em>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Report Footer */}
      <div className="pt-4 border-t border-slate-200 text-center text-[10px] text-slate-400">
        Generated automatically by Guidance Pilot AI Resume Analyzer • Confidential Career Assessment
      </div>
    </div>
  );
};
