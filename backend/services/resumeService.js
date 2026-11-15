const Groq = require('groq-sdk');
const config = require('../config/env');
const ResumeAnalysis = require('../models/ResumeAnalysis');
const { extractTextFromResume } = require('../utils/resumeParser');

class ResumeService {
  constructor() {
    const apiKey = process.env.GROQ_API_KEY || config.GROQ_API_KEY || '';
    if (apiKey) {
      this.groq = new Groq({ apiKey });
    }
  }

  getGroqClient() {
    const apiKey = process.env.GROQ_API_KEY || config.GROQ_API_KEY || '';
    if (!apiKey) {
      const error = new Error('Groq AI API is not configured on the server. Please set GROQ_API_KEY in the environment.');
      error.statusCode = 503;
      throw error;
    }
    return new Groq({ apiKey });
  }

  /**
   * Builds the comprehensive analysis prompt for Groq
   */
  buildPrompt(resumeText, targetRole, experienceLevel, jobDescription) {
    const jdSection = jobDescription && jobDescription.trim().length > 0
      ? `TARGET JOB DESCRIPTION PROVIDED BY USER:\n"""\n${jobDescription.trim()}\n"""`
      : `TARGET JOB DESCRIPTION: None provided. Evaluate the resume generally based on the target role "${targetRole || 'General Technology Professional'}" and experience level "${experienceLevel || 'Not specified'}".`;

    return `
You are an elite, production-grade AI Resume Analyst and Career Strategist.
Your goal is to provide a rigorous, actionable, honest, and helpful assessment of the candidate's resume.

CANDIDATE TARGET ROLE: ${targetRole || 'Not specified (infer from resume)'}
CANDIDATE EXPERIENCE LEVEL: ${experienceLevel || 'Not specified'}

${jdSection}

EXTRACTED RESUME TEXT:
"""
${resumeText.slice(0, 15000)}
"""

CRITICAL INSTRUCTIONS:
1. Grounding & Honesty: NEVER fabricate achievements, companies, metrics, degrees, or skills the candidate does not have. For suggested rewrites, strictly preserve their factual experience while enhancing action verbs, clarity, and impact.
2. Structure: You MUST respond ONLY with a single valid JSON object adhering EXACTLY to the schema below. No Markdown code fences, no surrounding commentary, just the raw JSON.
3. Scoring guidelines:
   - overallScore: 0 to 100 based on standard industry hiring expectations.
   - verdict: Exactly one of ["Excellent", "Good", "Average", "Needs Improvement"]. (90-100: Excellent, 75-89: Good, 60-74: Average, <60: Needs Improvement).
   - atsScore: 0 to 100 assessing formatting, standard headers, readability, and machine-parsing clarity. Do NOT claim knowledge of any proprietary internal ATS.
   - jobMatchScore: If a Job Description is provided, calculate an honest match score from 0 to 100. If NO job description is provided, return null.
4. Section Scores: Score each section (0-100). If a candidate legitimately does not need a section (e.g. Certifications for a fresher), do not unfairly penalize them.
5. Improved bullet points: Provide 2 to 4 improved versions of weak, passive, or metric-less bullet points found in the resume. Explain why the improvement is stronger.
6. Improved summary: Write a crisp, high-impact 2-3 sentence professional summary tailored to their target role, using only facts present in their resume.

REQUIRED JSON SCHEMA:
{
  "overallScore": 78,
  "verdict": "Good",
  "atsScore": 82,
  "jobMatchScore": 75,
  "summary": "Executive summary explaining the score, strengths, and primary areas of improvement.",
  "sectionScores": {
    "contactInfo": {
      "score": 90,
      "good": ["Phone and email clearly stated", "LinkedIn URL included"],
      "missing": ["GitHub portfolio link"],
      "improvements": ["Make email address a clickable hyperlink"]
    },
    "professionalSummary": {
      "score": 70,
      "good": ["Highlights key core technologies"],
      "missing": ["Years of experience clarity", "Key specializations"],
      "improvements": ["Avoid buzzwords like 'hardworking visionary'"]
    },
    "skills": {
      "score": 80,
      "good": ["Categorized by languages and frameworks"],
      "missing": ["Cloud / DevOps tools"],
      "improvements": ["Group skills into Frontend, Backend, Tools"]
    },
    "workExperience": {
      "score": 75,
      "good": ["Clear chronology and company titles"],
      "missing": ["Quantified business metrics (%, $, time saved)"],
      "improvements": ["Begin bullets with strong past-tense action verbs"]
    },
    "projects": {
      "score": 85,
      "good": ["Live links provided", "Modern tech stack used"],
      "missing": ["Problem statement and scale of users"],
      "improvements": ["Detail architecture challenges overcome"]
    },
    "education": {
      "score": 95,
      "good": ["Degree, major, university, and graduation year present"],
      "missing": [],
      "improvements": ["Move below experience if candidate has >2 years experience"]
    },
    "certifications": {
      "score": 70,
      "good": ["Relevant industry credential listed"],
      "missing": ["Issuing organization credential ID / expiration"],
      "improvements": ["Add link to verify certificate"]
    }
  },
  "atsAnalysis": {
    "formattingFriendly": true,
    "headingsStandard": true,
    "readabilityScore": 85,
    "hasComplexTablesOrGraphics": false,
    "contactExtractionStatus": "Successfully extracted all contact details",
    "recommendations": [
      "Use single-column layout for maximum parser compatibility",
      "Stick to standard fonts (Arial, Calibri, Inter)"
    ]
  },
  "skillsAnalysis": {
    "technicalSkills": ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    "softSkills": ["Cross-functional collaboration", "Agile problem solving"],
    "missingRelevantSkills": ["TypeScript", "Docker", "CI/CD"],
    "undemonstratedSkills": ["Redux (listed in skills but no project explains its use)"],
    "missingKeywordsForRole": ["RESTful API design", "Unit testing"]
  },
  "projectFeedback": {
    "technicalComplexityScore": 80,
    "techStackRelevance": "High relevance to modern Full Stack positions",
    "impactAndOutcomesFeedback": "Projects show good functionality but lack measurable adoption or test coverage mentions.",
    "suggestions": [
      "Include user load or data volume handled",
      "Mention CI/CD deployment pipeline or hosting details"
    ]
  },
  "experienceFeedback": {
    "weakBulletPointsIdentified": [
      "Responsible for developing frontend features",
      "Worked on bug fixes and maintenance"
    ],
    "actionVerbsSuggestions": ["Architected", "Spearheaded", "Refactored", "Automated"],
    "measurableAchievementsFeedback": "Convert passive tasks into the XYZ formula: Accomplished [X], as measured by [Y], by doing [Z]."
  },
  "jobMatchAnalysis": {
    "matchingSkills": ["JavaScript", "React", "Node.js"],
    "missingSkills": ["Kubernetes", "GraphQL"],
    "experienceGaps": ["Role requires 3+ years in distributed systems"],
    "keywordsToIncorporate": ["Scalability", "Microservices", "Event-driven"],
    "tailoringAdvice": [
      "Highlight asynchronous event handling in your Node.js project",
      "Bring React state management to the forefront"
    ]
  },
  "strengths": [
    "Clean education and project structure",
    "Strong modern JavaScript stack relevance",
    "Consistent formatting and dates"
  ],
  "weaknesses": [
    "Lack of quantified metrics across experience bullets",
    "Missing key cloud and containerization skills",
    "Summary is too generic"
  ],
  "missingKeywords": [
    "TypeScript",
    "Docker",
    "Automated Testing",
    "Agile/Scrum"
  ],
  "recommendations": {
    "top5Immediate": [
      "Add quantifiable numbers (%, latency, users) to your 2 main projects",
      "Rewrite your professional summary with the suggested draft below",
      "Replace passive phrases with strong action verbs",
      "Group skills into distinct categories (Languages, Frameworks, Cloud, Tools)",
      "Ensure GitHub and LinkedIn links are tested and clickable"
    ],
    "sectionsToRewrite": [
      "Professional Summary",
      "Work Experience Bullet Points"
    ],
    "formattingTips": [
      "Ensure margins are consistent between 0.5 and 0.75 inches",
      "Keep standard bullet formatting without icons or complex symbols"
    ]
  },
  "improvedSummary": "Results-driven Full Stack Developer with hands-on experience designing and deploying scalable web applications using React, Node.js, and MongoDB. Proven track record of architecting responsive user interfaces and building secure RESTful APIs, with a strong focus on clean code and performance optimization.",
  "improvedBulletPoints": [
    {
      "original": "Responsible for developing frontend features using React",
      "improved": "Architected and delivered 6+ responsive UI modules in React and Tailwind CSS, improving page load speeds by 28%",
      "reason": "Replaces passive 'Responsible for' with active verb 'Architected' and introduces measurable performance metrics."
    },
    {
      "original": "Worked on backend APIs and fixed bugs in MongoDB",
      "improved": "Engineered 12+ secure RESTful API endpoints with Express and MongoDB, resolving critical data latency bottlenecks for over 500 active users",
      "reason": "Quantifies the scope of work and highlights tangible impact and security practices."
    }
  ]
}
`;
  }

  /**
   * Main analysis execution pipeline
   */
  async analyzeResume({ buffer, originalName, mimetype, targetRole, experienceLevel, jobDescription, userId }) {
    // 1. Extract text from uploaded document
    const extractedText = await extractTextFromResume(buffer, originalName, mimetype);
    if (!extractedText || extractedText.length < 50) {
      const error = new Error('The resume does not contain enough extractable text. Please ensure it is not a scanned image.');
      error.statusCode = 400;
      throw error;
    }

    // 2. Call Groq AI API
    const groq = this.getGroqClient();
    const prompt = this.buildPrompt(extractedText, targetRole, experienceLevel, jobDescription);

    let rawCompletion = '';
    try {
      const completion = await groq.chat.completions.create({
        model: 'openai/gpt-oss-120b',
        messages: [
          {
            role: 'system',
            content: 'You are an expert AI Resume Analyzer. You only output valid JSON with no markdown wrapping, no explanation, and no preface.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 4096
      });

      rawCompletion = completion.choices[0]?.message?.content || '';
    } catch (err) {
      console.error('Groq AI API error in resume analysis:', err);
      const apiError = new Error(`AI Analysis service error: ${err.message}`);
      apiError.statusCode = err.status || 502;
      throw apiError;
    }

    // 3. Parse and validate JSON structure
    let parsedData = null;
    try {
      let cleanJson = rawCompletion.trim();
      // Remove any accidental markdown backticks if present
      if (cleanJson.startsWith('```')) {
        cleanJson = cleanJson.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim();
      }
      parsedData = JSON.parse(cleanJson);
    } catch (jsonErr) {
      console.error('Failed to parse Groq response as JSON. Raw completion was:', rawCompletion);
      const error = new Error('AI analysis output could not be validated. Please try again.');
      error.statusCode = 502;
      throw error;
    }

    // Sanitize and ensure required fallback fields exist
    parsedData.overallScore = Math.min(100, Math.max(0, Number(parsedData.overallScore) || 70));
    parsedData.atsScore = Math.min(100, Math.max(0, Number(parsedData.atsScore) || 75));
    if (jobDescription && jobDescription.trim().length > 0) {
      parsedData.jobMatchScore = Math.min(100, Math.max(0, Number(parsedData.jobMatchScore) || 65));
    } else {
      parsedData.jobMatchScore = null;
    }

    const validVerdicts = ['Excellent', 'Good', 'Average', 'Needs Improvement'];
    if (!validVerdicts.includes(parsedData.verdict)) {
      if (parsedData.overallScore >= 90) parsedData.verdict = 'Excellent';
      else if (parsedData.overallScore >= 75) parsedData.verdict = 'Good';
      else if (parsedData.overallScore >= 60) parsedData.verdict = 'Average';
      else parsedData.verdict = 'Needs Improvement';
    }

    // 4. Save analysis to MongoDB for historical tracking
    const record = await ResumeAnalysis.create({
      userId,
      fileName: originalName || 'resume.pdf',
      fileSize: buffer.length,
      fileType: mimetype || 'application/pdf',
      targetRole: targetRole || '',
      experienceLevel: experienceLevel || 'Not specified',
      jobDescription: jobDescription || '',
      rawTextLength: extractedText.length,
      analysis: parsedData
    });

    return record;
  }

  /**
   * Retrieves all past analyses for a user
   */
  async getUserAnalyses(userId) {
    return await ResumeAnalysis.find({ userId })
      .sort({ createdAt: -1 })
      .select('-jobDescription')
      .limit(20);
  }

  /**
   * Retrieves single analysis by ID
   */
  async getAnalysisById(userId, analysisId) {
    const record = await ResumeAnalysis.findOne({ _id: analysisId, userId });
    if (!record) {
      const error = new Error('Resume analysis record not found');
      error.statusCode = 404;
      throw error;
    }
    return record;
  }

  /**
   * Delete an analysis record
   */
  async deleteAnalysis(userId, analysisId) {
    const record = await ResumeAnalysis.findOneAndDelete({ _id: analysisId, userId });
    if (!record) {
      const error = new Error('Resume analysis record not found');
      error.statusCode = 404;
      throw error;
    }
    return record;
  }
}

module.exports = new ResumeService();
