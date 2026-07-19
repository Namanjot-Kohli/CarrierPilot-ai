const BaseAgent = require('../core/BaseAgent');
const { PLANNER_SYSTEM_PROMPT } = require('../prompts/plannerPrompts');

class PlannerAgent extends BaseAgent {
  constructor() {
    super('planner', 'Plans the execution of other agents', PLANNER_SYSTEM_PROMPT);
  }

  async execute(input, context = {}) {
    const result = await super.execute(input, context);
    if (result.response && typeof result.response === 'object' && result.response.agents) {
      return result;
    }
    // Fallback if parsing fails
    result.response = {
      intent: 'General query',
      agents: ['career_mentor'],
      reasoning: 'Fallback plan due to parsing failure.',
      responseType: 'general'
    };
    return result;
  }
}

module.exports = PlannerAgent;
