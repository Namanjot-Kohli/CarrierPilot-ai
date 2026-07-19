const BaseAgent = require('../core/BaseAgent');
const { RESUME_ANALYSIS_PROMPT } = require('../prompts/resumePrompts');

class ResumeAnalysisAgent extends BaseAgent {
  constructor() {
    super('resume_analysis', 'Analyzes resumes', RESUME_ANALYSIS_PROMPT);
  }
}

module.exports = ResumeAnalysisAgent;
