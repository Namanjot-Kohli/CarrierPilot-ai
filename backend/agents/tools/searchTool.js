function searchSkillRequirements(role) {
  const roleData = {
    'frontend developer': ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Web Performance'],
    'backend developer': ['Node.js', 'Python', 'Databases (SQL/NoSQL)', 'API Design', 'System Architecture'],
    'data scientist': ['Python', 'R', 'Machine Learning', 'SQL', 'Data Visualization', 'Statistics'],
    'product manager': ['Agile', 'User Research', 'Data Analysis', 'Roadmapping', 'Communication']
  };
  const normalizedRole = role.toLowerCase();
  for (const key in roleData) {
    if (normalizedRole.includes(key)) {
      return roleData[key];
    }
  }
  return ['Communication', 'Problem Solving', 'Project Management'];
}

function searchSalaryData(role) {
  const salaryData = {
    'frontend developer': '$70,000 - $130,000',
    'backend developer': '$80,000 - $150,000',
    'data scientist': '$90,000 - $160,000',
    'product manager': '$100,000 - $170,000'
  };
  const normalizedRole = role.toLowerCase();
  for (const key in salaryData) {
    if (normalizedRole.includes(key)) {
      return salaryData[key];
    }
  }
  return '$60,000 - $100,000';
}

function searchJobMarket(role) {
  return `The job market for ${role} is generally strong, with continued growth expected over the next 5-10 years driven by technological advancements.`;
}

module.exports = {
  searchSkillRequirements,
  searchSalaryData,
  searchJobMarket
};
