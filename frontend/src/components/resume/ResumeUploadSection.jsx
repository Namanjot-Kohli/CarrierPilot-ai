import React, { useRef, useState } from 'react';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Briefcase, 
  GraduationCap, 
  FileSpreadsheet, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Card } from '../ui/Card.jsx';
import { Button } from '../ui/Button.jsx';

export const ResumeUploadSection = ({ onAnalyze, isLoading }) => {
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('0-2 years');
  const [jobDescription, setJobDescription] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [showJd, setShowJd] = useState(false);

  const fileInputRef = useRef(null);

  const validateAndSetFile = (selectedFile) => {
    setFileError('');
    if (!selectedFile) return;

    const allowedExtensions = ['.pdf', '.docx', '.doc'];
    const fileName = selectedFile.name.toLowerCase();
    const isValidExt = allowedExtensions.some(ext => fileName.endsWith(ext));

    if (!isValidExt) {
      setFileError('Invalid file type. Please upload a PDF or DOCX resume.');
      setFile(null);
      return;
    }

    // 5MB limit
    if (selectedFile.size > 5 * 1024 * 1024) {
      setFileError('File size exceeds 5MB limit. Please upload a smaller document.');
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      setFileError('Please select or drop a resume file to analyze.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', file);
    if (targetRole.trim()) formData.append('targetRole', targetRole.trim());
    if (experienceLevel) formData.append('experienceLevel', experienceLevel);
    if (jobDescription.trim()) formData.append('jobDescription', jobDescription.trim());

    onAnalyze(formData);
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  return (
    <Card className="p-6 md:p-8 bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xl rounded-2xl backdrop-blur-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Career Intelligence
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Upload Your Resume
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Get an in-depth ATS evaluation, score breakdown, and personalized rewrites in seconds.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Drag and Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center ${
            isDragging 
              ? 'border-teal-500 bg-teal-50/50 dark:bg-teal-950/20 scale-[0.99]' 
              : file
                ? 'border-emerald-400/80 bg-emerald-50/30 dark:bg-emerald-950/10'
                : 'border-slate-300 dark:border-slate-700 hover:border-teal-400 bg-slate-50/50 dark:bg-slate-800/40'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.doc,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                validateAndSetFile(e.target.files[0]);
              }
            }}
          />

          {file ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-inner">
                <FileText className="w-7 h-7" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-slate-900 dark:text-white text-base">
                  {file.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {formatFileSize(file.size)} • Ready for analysis
                </p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="mt-1 inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 rounded-full transition-colors"
              >
                <X className="w-3.5 h-3.5" /> Remove file
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 flex items-center justify-center shadow-inner">
                <UploadCloud className="w-7 h-7" />
              </div>
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-200 text-base">
                  Drag and drop your resume here, or <span className="text-teal-600 dark:text-teal-400 hover:underline">browse</span>
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Supports PDF and Word (.docx, .doc) files up to 5MB
                </p>
              </div>
            </div>
          )}
        </div>

        {fileError && (
          <div className="flex items-center gap-2 p-3 text-sm text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 rounded-xl">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{fileError}</span>
          </div>
        )}

        {/* Optional Metadata Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
              Target Job Role (Optional)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Briefcase className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="e.g. Senior Backend Engineer, Data Scientist"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
              Experience Level
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <GraduationCap className="w-4 h-4" />
              </div>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all cursor-pointer"
              >
                <option value="Fresher">Fresher / Graduate</option>
                <option value="0-2 years">0 - 2 years (Junior)</option>
                <option value="2-5 years">2 - 5 years (Mid-Level)</option>
                <option value="5+ years">5+ years (Senior / Lead)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Job Description Matching Toggle */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setShowJd(!showJd)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            {showJd ? 'Hide Job Description Matching' : '+ Compare with a Specific Job Description'}
          </button>

          {showJd && (
            <div className="mt-3">
              <textarea
                rows={4}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the target job description requirements here to unlock tailored skill match scores and keyword gap analysis..."
                className="w-full p-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all"
              />
              <p className="text-xs text-slate-400 mt-1">
                When provided, the AI calculates an exact Job Match % and identifies missing keywords directly from this posting.
              </p>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Button
            type="submit"
            disabled={!file || isLoading}
            className="w-full py-3.5 px-6 rounded-xl font-semibold text-white bg-teal-600 hover:bg-teal-700 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-teal-500/20 flex items-center justify-center gap-2 text-base"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing Document with AI...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Analyze Resume Now
                <ArrowRight className="w-4 h-4 ml-1" />
              </>
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
};
