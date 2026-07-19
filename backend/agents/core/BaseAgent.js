const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('../../config/env');

class BaseAgent {
  constructor(name, description, systemPrompt) {
    this.name = name;
    this.description = description;
    this.systemPrompt = systemPrompt;
    
    const apiKey = config.GEMINI_API_KEY || process.env.GEMINI_API_KEY || 'dummy_key';
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  }

  async execute(input, context = {}) {
    const contextString = this.buildContextString(context);
    const fullPrompt = `${this.systemPrompt}\n\n${contextString}\n\nUser Input: ${input}`;
    
    try {
      const result = await this.model.generateContent(fullPrompt);
      const responseText = result.response.text();
      const parsedResponse = this.parseJSON(responseText);
      
      return {
        agent: this.name,
        response: parsedResponse || responseText,
        raw: responseText
      };
    } catch (error) {
      console.error(`Error in agent ${this.name}:`, error);
      return {
        agent: this.name,
        error: error.message,
        response: null,
        raw: null
      };
    }
  }

  parseJSON(text) {
    try {
      // Try parsing directly
      return JSON.parse(text);
    } catch (e) {
      // Try to extract JSON from ```json ... ``` blocks
      const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (jsonMatch && jsonMatch[1]) {
        try {
          return JSON.parse(jsonMatch[1]);
        } catch (err) {
          return null;
        }
      }
      return null;
    }
  }

  buildContextString(context) {
    let ctxString = 'Context Information:\n';
    if (context.userProfile) {
      ctxString += `User Profile:\n${JSON.stringify(context.userProfile, null, 2)}\n\n`;
    }
    if (context.conversationHistory && context.conversationHistory.length > 0) {
      ctxString += `Conversation History:\n`;
      context.conversationHistory.forEach(msg => {
        ctxString += `[${msg.role}]: ${msg.content}\n`;
      });
      ctxString += '\n';
    }
    return ctxString;
  }
}

module.exports = BaseAgent;
