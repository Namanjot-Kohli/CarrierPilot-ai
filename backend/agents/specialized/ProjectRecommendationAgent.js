const BaseAgent = require('../core/BaseAgent');
const { PROJECT_RECOMMENDATION_PROMPT } = require('../prompts/projectPrompts');

class ProjectRecommendationAgent extends BaseAgent {
  constructor() {
    super('project_recommendation', 'Suggests portfolio projects', PROJECT_RECOMMENDATION_PROMPT);
    this.lastRecommendations = null;
  }

  async execute(input, context = {}) {
    const result = await super.execute(input, context);
    if (result.response && typeof result.response === 'object' && result.response.projects) {
      this.lastRecommendations = result.response.projects;
    }
    return result;
  }
}

module.exports = ProjectRecommendationAgent;
