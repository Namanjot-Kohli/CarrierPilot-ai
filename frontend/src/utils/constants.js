export const API_URL = import.meta.env.VITE_API_URL || 'https://carrierpilot-ai-uv0l.onrender.com/api';

export const EXPERIENCE_LEVELS = [
  { value: 'student', label: 'Student' },
  { value: 'junior', label: 'Junior (0-2 years)' },
  { value: 'mid', label: 'Mid-Level (2-5 years)' },
  { value: 'senior', label: 'Senior (5+ years)' }
];

export const CONVERSATION_TYPES = [
  { value: 'career', label: 'Career', icon: 'briefcase', color: 'indigo' },
  { value: 'resume', label: 'Resume', icon: 'document', color: 'violet' },
  { value: 'skills', label: 'Skills', icon: 'lightning', color: 'cyan' },
  { value: 'roadmap', label: 'Roadmap', icon: 'map', color: 'green' },
  { value: 'general', label: 'General', icon: 'chat', color: 'gray' }
];

export const QUICK_PROMPTS = [
  { title: 'Career Paths', description: 'What career paths suit someone with skills in [insert your skills here]?' },
  { title: 'Resume Analysis', description: 'Analyze my resume for a [insert target role here] position' },
  { title: 'Learning Roadmap', description: 'Create a learning roadmap to become a [insert target role here]' },
  { title: 'Portfolio Projects', description: 'Suggest portfolio projects for a [insert your skill/role] developer' },
  { title: 'Certifications', description: 'Recommend certifications for a career in [insert field/role here]' },
  { title: 'Career Transition', description: 'Help me transition from [current role] to [new role]' }
];

export const RECOMMENDATION_TYPES = {
  career: { label: 'Career Path', color: 'indigo' },
  project: { label: 'Project', color: 'violet' },
  certification: { label: 'Certification', color: 'amber' },
  course: { label: 'Course', color: 'cyan' },
  skill: { label: 'Skill', color: 'green' }
};
