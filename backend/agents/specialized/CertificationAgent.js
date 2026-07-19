const BaseAgent = require('../core/BaseAgent');
const { CERTIFICATION_PROMPT } = require('../prompts/certificationPrompts');

class CertificationAgent extends BaseAgent {
  constructor() {
    super('certification', 'Recommends certifications', CERTIFICATION_PROMPT);
    this.lastRecommendations = null;
  }

  async execute(input, context = {}) {
    const result = await super.execute(input, context);
    if (result.response && typeof result.response === 'object' && result.response.certifications) {
      this.lastRecommendations = result.response.certifications;
    }
    return result;
  }
}

module.exports = CertificationAgent;
