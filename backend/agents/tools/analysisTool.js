function analyzeSkillMatch(userSkills, requiredSkills) {
  const userSkillsLower = (userSkills || []).map(s => s.toLowerCase());
  const requiredSkillsLower = (requiredSkills || []).map(s => s.toLowerCase());
  
  const matchedSkills = requiredSkillsLower.filter(s => userSkillsLower.includes(s));
  const missingSkills = requiredSkillsLower.filter(s => !userSkillsLower.includes(s));
  
  const matchPercentage = requiredSkillsLower.length === 0 ? 100 : Math.round((matchedSkills.length / requiredSkillsLower.length) * 100);
  
  return {
    matchedSkills,
    missingSkills,
    matchPercentage
  };
}

function analyzeExperienceLevel(years, skills) {
  if (years < 2) return 'Beginner';
  if (years < 5) return 'Intermediate';
  if (years < 8) return 'Advanced';
  return 'Expert';
}

function calculateRoadmapDuration(missingSkills, experienceLevel) {
  let weeksPerSkill = 2;
  if (experienceLevel === 'Beginner') weeksPerSkill = 3;
  if (experienceLevel === 'Expert') weeksPerSkill = 1;
  
  const estimatedWeeks = (missingSkills || []).length * weeksPerSkill;
  return estimatedWeeks;
}

module.exports = {
  analyzeSkillMatch,
  analyzeExperienceLevel,
  calculateRoadmapDuration
};
