class AgentRegistry {
  constructor() {
    this.agents = new Map();
  }

  register(agent) {
    this.agents.set(agent.name, agent);
  }

  get(name) {
    return this.agents.get(name);
  }

  getAll() {
    return Array.from(this.agents.values());
  }

  has(name) {
    return this.agents.has(name);
  }
}

module.exports = new AgentRegistry();
