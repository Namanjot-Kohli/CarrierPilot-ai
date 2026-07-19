const BaseAgent = require('../core/BaseAgent');
const { SKILL_GAP_PROMPT } = require('../prompts/skillGapPrompts');

class SkillGapAgent extends BaseAgent {
  constructor() {
    super('skill_gap', 'Identifies skill gaps', SKILL_GAP_PROMPT);
  }
}

module.exports = SkillGapAgent;
