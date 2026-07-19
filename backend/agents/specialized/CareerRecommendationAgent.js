const BaseAgent = require('../core/BaseAgent');
const { CAREER_RECOMMENDATION_PROMPT } = require('../prompts/careerPrompts');

class CareerRecommendationAgent extends BaseAgent {
  constructor() {
    super('career_recommendation', 'Recommends careers', CAREER_RECOMMENDATION_PROMPT);
  }
}

module.exports = CareerRecommendationAgent;
