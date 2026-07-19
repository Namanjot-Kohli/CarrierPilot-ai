const BaseAgent = require('../core/BaseAgent');
const { CAREER_MENTOR_PROMPT } = require('../prompts/mentorPrompts');

class CareerMentorAgent extends BaseAgent {
  constructor() {
    super('career_mentor', 'Provides career advice', CAREER_MENTOR_PROMPT);
  }
}

module.exports = CareerMentorAgent;
