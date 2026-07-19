const BaseAgent = require('../core/BaseAgent');
const { LEARNING_ROADMAP_PROMPT } = require('../prompts/roadmapPrompts');

class LearningRoadmapAgent extends BaseAgent {
  constructor() {
    super('learning_roadmap', 'Creates learning roadmaps', LEARNING_ROADMAP_PROMPT);
    this.lastRoadmap = null;
  }

  async execute(input, context = {}) {
    const result = await super.execute(input, context);
    if (result.response && typeof result.response === 'object' && result.response.milestones) {
      this.lastRoadmap = result.response;
    }
    return result;
  }
}

module.exports = LearningRoadmapAgent;
