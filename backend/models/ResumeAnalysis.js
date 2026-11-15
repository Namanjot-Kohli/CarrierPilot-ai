const mongoose = require('mongoose');

const resumeAnalysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  fileName: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  fileType: {
    type: String,
    required: true
  },
  targetRole: {
    type: String,
    default: ''
  },
  experienceLevel: {
    type: String,
    enum: ['Fresher', '0-2 years', '2-5 years', '5+ years', 'Not specified'],
    default: 'Not specified'
  },
  jobDescription: {
    type: String,
    default: ''
  },
  rawTextLength: {
    type: Number,
    default: 0
  },
  analysis: {
    overallScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    verdict: {
      type: String,
      enum: ['Excellent', 'Good', 'Average', 'Needs Improvement'],
      required: true
    },
    atsScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    jobMatchScore: {
      type: Number,
      default: null,
      min: 0,
      max: 100
    },
    summary: {
      type: String,
      required: true
    },
    sectionScores: {
      contactInfo: {
        score: Number,
        good: [String],
        missing: [String],
        improvements: [String]
      },
      professionalSummary: {
        score: Number,
        good: [String],
        missing: [String],
        improvements: [String]
      },
      skills: {
        score: Number,
        good: [String],
        missing: [String],
        improvements: [String]
      },
      workExperience: {
        score: Number,
        good: [String],
        missing: [String],
        improvements: [String]
      },
      projects: {
        score: Number,
        good: [String],
        missing: [String],
        improvements: [String]
      },
      education: {
        score: Number,
        good: [String],
        missing: [String],
        improvements: [String]
      },
      certifications: {
        score: Number,
        good: [String],
        missing: [String],
        improvements: [String]
      }
    },
    atsAnalysis: {
      formattingFriendly: Boolean,
      headingsStandard: Boolean,
      readabilityScore: Number,
      hasComplexTablesOrGraphics: Boolean,
      contactExtractionStatus: String,
      recommendations: [String]
    },
    skillsAnalysis: {
      technicalSkills: [String],
      softSkills: [String],
      missingRelevantSkills: [String],
      undemonstratedSkills: [String],
      missingKeywordsForRole: [String]
    },
    projectFeedback: {
      technicalComplexityScore: Number,
      techStackRelevance: String,
      impactAndOutcomesFeedback: String,
      suggestions: [String]
    },
    experienceFeedback: {
      weakBulletPointsIdentified: [String],
      actionVerbsSuggestions: [String],
      measurableAchievementsFeedback: String
    },
    jobMatchAnalysis: {
      matchingSkills: [String],
      missingSkills: [String],
      experienceGaps: [String],
      keywordsToIncorporate: [String],
      tailoringAdvice: [String]
    },
    strengths: [String],
    weaknesses: [String],
    missingKeywords: [String],
    recommendations: {
      top5Immediate: [String],
      sectionsToRewrite: [String],
      formattingTips: [String]
    },
    improvedSummary: {
      type: String,
      default: ''
    },
    improvedBulletPoints: [
      {
        original: String,
        improved: String,
        reason: String
      }
    ]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ResumeAnalysis', resumeAnalysisSchema);
