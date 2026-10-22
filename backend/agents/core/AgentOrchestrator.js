const registry = require('./AgentRegistry');
const PlannerAgent = require('../specialized/PlannerAgent');
const ResumeAnalysisAgent = require('../specialized/ResumeAnalysisAgent');
const SkillGapAgent = require('../specialized/SkillGapAgent');
const CareerRecommendationAgent = require('../specialized/CareerRecommendationAgent');
const LearningRoadmapAgent = require('../specialized/LearningRoadmapAgent');
const ProjectRecommendationAgent = require('../specialized/ProjectRecommendationAgent');
const CertificationAgent = require('../specialized/CertificationAgent');
const CareerMentorAgent = require('../specialized/CareerMentorAgent');
const Groq = require('groq-sdk');
const config = require('../../config/env');

class AgentOrchestrator {
  constructor() {
    this.planner = new PlannerAgent();
    registry.register(this.planner);

    const agents = [
      new ResumeAnalysisAgent(),
      new SkillGapAgent(),
      new CareerRecommendationAgent(),
      new LearningRoadmapAgent(),
      new ProjectRecommendationAgent(),
      new CertificationAgent(),
      new CareerMentorAgent()
    ];

    agents.forEach(agent => registry.register(agent));
    
    const apiKey = config.GROQ_API_KEY || process.env.GROQ_API_KEY || 'dummy_key';
    this.groq = new Groq({ apiKey });
  }

  async processMessage(userMessage, conversationHistory = [], userProfile = null, existingRoadmap = null) {
    const context = { userProfile, conversationHistory, existingRoadmap };
    let ctxString = 'Context Information:\n';
    if (context.userProfile) {
      ctxString += `User Profile:\n${JSON.stringify(context.userProfile, null, 2)}\n\n`;
    }
    if (context.existingRoadmap) {
      ctxString += `EXISTING ROADMAP FOR THIS CHAT:\n${JSON.stringify(context.existingRoadmap, null, 2)}\n\n`;
    }
    if (context.conversationHistory && context.conversationHistory.length > 0) {
      ctxString += `Conversation History:\n`;
      context.conversationHistory.forEach(msg => {
        ctxString += `[${msg.role}]: ${msg.content}\n`;
      });
      ctxString += '\n';
    }

    const systemPrompt = `
You are Guidance Pilot, an expert career mentor, resume analyzer, and learning roadmap planner.
Analyze the user's message and provide a comprehensive response.

${ctxString}

Respond EXACTLY in the following format:
---RESPONSE---
Write your natural, well-formatted markdown response to the user here. Be conversational but professional. Provide actionable advice.
IMPORTANT: Do NOT indent your normal paragraphs with spaces or tabs. In Markdown, indentation turns normal text into a code block. Only use code blocks when explicitly writing code.

---STRUCTURED_DATA---
If the user's request warrants creating a learning roadmap or specific career/project recommendations, output a valid JSON object here. Otherwise, output empty JSON: {}.
IMPORTANT FOR ROADMAPS: If the user already has an "EXISTING ROADMAP FOR THIS CHAT" (see context above), and they ask to modify, add to, or update it (e.g. "add Docker"), you MUST output the ENTIRE merged roadmap. Include all previous milestones from their existing roadmap, plus your new modifications. Do NOT output a roadmap with only the new items, as this will overwrite their old one entirely.

IMPORTANT FOR RECOMMENDATIONS: Only generate recommendations if they are strictly relevant to the user's explicit request. Do NOT generate recommendations on every message. If you do generate them, limit to a maximum of 2.

Valid structure for JSON:
{
  "roadmap": { "title": "...", "description": "...", "targetRole": "...", "difficulty": "intermediate", "estimatedWeeks": 4, "milestones": [ { "title": "...", "description": "..." } ] },
  "recommendations": [
    { "type": "career|project|certification", "title": "...", "description": "..." }
  ]
}
`;

    try {
      const completion = await this.groq.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ],
        model: 'openai/gpt-oss-120b',
        temperature: 0.7,
        max_tokens: 2048
      });

      const text = completion.choices[0]?.message?.content || "";
      
      let responseText = text;
      let structuredData = null;
      
      if (text.includes('---STRUCTURED_DATA---')) {
        const parts = text.split('---STRUCTURED_DATA---');
        responseText = parts[0].replace('---RESPONSE---', '').trim();
        const jsonPart = parts[1].trim();
        
        const jsonMatch = jsonPart.match(/\`\`\`(?:json)?\s*([\s\S]*?)\s*\`\`\`/);
        const jsonStr = jsonMatch ? jsonMatch[1] : jsonPart;
        
        try {
          structuredData = JSON.parse(jsonStr);
        } catch (e) {
          console.error('Failed to parse structured data:', e);
        }
      } else {
        responseText = text.replace('---RESPONSE---', '').trim();
      }

      const resultObj = {
        response: responseText,
        agentsUsed: ['career_mentor'], 
        plan: 'Groq openai/gpt-oss-120b Single-pass execution',
        reasoning: 'Utilized Groq API for lightning fast responses'
      };
      
      if (structuredData?.roadmap) {
        // Enforce valid lowercase difficulty
        let diff = String(structuredData.roadmap.difficulty || 'intermediate').toLowerCase();
        if (!['beginner', 'intermediate', 'advanced'].includes(diff)) {
          diff = 'intermediate';
        }
        structuredData.roadmap.difficulty = diff;
        resultObj.roadmap = structuredData.roadmap;
      }
      if (structuredData?.recommendations && Array.isArray(structuredData.recommendations)) {
        resultObj.recommendations = structuredData.recommendations;
      }
      
      return resultObj;

    } catch (error) {
      console.error('Error in Groq Orchestrator:', error);
      
      // Fallback Mock Mode just in case Groq goes down or key is invalid
      return {
        response: "### 🚀 Mock AI Response (Groq API Error)\\n\\nI encountered an issue connecting to the Groq API, but to let you continue testing the app's UI, I've generated this mock response!\\n\\nBased on your profile, I recommend exploring **Full Stack Development** or **Cloud Architecture**. These paths align perfectly with modern tech demands. I've also generated a sample learning roadmap and some project recommendations for you below!",
        agentsUsed: ['mock_agent'],
        plan: 'Mock execution due to Groq API Error',
        reasoning: error.message || 'Unknown API Error',
        roadmap: {
          title: "Full Stack Developer Roadmap",
          description: "A comprehensive guide to becoming a modern Full Stack Developer.",
          targetRole: "Full Stack Developer",
          difficulty: "intermediate",
          estimatedWeeks: 12,
          milestones: [
            { title: "Frontend Mastery", description: "Master React, TailwindCSS, and state management." },
            { title: "Backend Fundamentals", description: "Learn Node.js, Express, and RESTful API design." },
            { title: "Database Architecture", description: "Understand MongoDB, Mongoose, and data modeling." }
          ]
        },
        recommendations: [
          { type: "project", title: "E-Commerce Platform", description: "Build a full-stack e-commerce app with Stripe integration." },
          { type: "certification", title: "AWS Certified Developer", description: "Validate your cloud skills with AWS." }
        ]
      };
    }
  }
}

module.exports = AgentOrchestrator;
