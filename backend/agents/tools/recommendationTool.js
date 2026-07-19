function formatRecommendation(type, data) {
  return {
    type,
    title: data.title || 'Recommendation',
    description: data.description || '',
    details: data,
    timestamp: new Date().toISOString()
  };
}

function prioritizeRecommendations(recommendations) {
  return [...(recommendations || [])].sort((a, b) => {
    const scoreA = a.priorityScore || 0;
    const scoreB = b.priorityScore || 0;
    return scoreB - scoreA;
  });
}

function generateResourceLinks(skill) {
  const encodedSkill = encodeURIComponent(skill);
  return [
    { title: `Coursera: ${skill} Courses`, url: `https://www.coursera.org/search?query=${encodedSkill}`, type: 'course' },
    { title: `Udemy: ${skill} Tutorials`, url: `https://www.udemy.com/courses/search/?src=ukw&q=${encodedSkill}`, type: 'course' },
    { title: `YouTube: ${skill} Basics`, url: `https://www.youtube.com/results?search_query=${encodedSkill}+tutorial`, type: 'video' }
  ];
}

module.exports = {
  formatRecommendation,
  prioritizeRecommendations,
  generateResourceLinks
};
