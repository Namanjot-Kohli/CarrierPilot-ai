import React, { useState, useEffect } from 'react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const SkillsEditor = ({ skills = [], interests = [], onSave, isSaving }) => {
  const [currentSkills, setCurrentSkills] = useState(skills);
  const [currentInterests, setCurrentInterests] = useState(interests);
  const [skillInput, setSkillInput] = useState('');
  const [interestInput, setInterestInput] = useState('');

  useEffect(() => {
    setCurrentSkills(skills || []);
    setCurrentInterests(interests || []);
  }, [skills, interests]);

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      if (!currentSkills.includes(skillInput.trim())) {
        setCurrentSkills([...currentSkills, skillInput.trim()]);
      }
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setCurrentSkills(currentSkills.filter(s => s !== skillToRemove));
  };

  const handleAddInterest = (e) => {
    if (e.key === 'Enter' && interestInput.trim()) {
      e.preventDefault();
      if (!currentInterests.includes(interestInput.trim())) {
        setCurrentInterests([...currentInterests, interestInput.trim()]);
      }
      setInterestInput('');
    }
  };

  const handleRemoveInterest = (interestToRemove) => {
    setCurrentInterests(currentInterests.filter(i => i !== interestToRemove));
  };

  const handleSave = () => {
    onSave({ skills: currentSkills, interests: currentInterests });
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Technical & Soft Skills</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          Add skills you currently have. Press Enter to add.
        </p>
        
        <div className="mb-4">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleAddSkill}
            placeholder="Type a skill and press Enter (e.g. React, Python, Leadership)"
            className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-colors shadow-sm outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2 min-h-[60px] p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
          {currentSkills.length === 0 ? (
            <p className="text-sm text-slate-400 italic">No skills added yet.</p>
          ) : (
            currentSkills.map((skill, idx) => (
              <Badge key={idx} color="indigo" size="md" onRemove={() => handleRemoveSkill(skill)}>
                {skill}
              </Badge>
            ))
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Career Interests</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          What are you interested in learning or moving towards? Press Enter to add.
        </p>
        
        <div className="mb-4">
          <input
            type="text"
            value={interestInput}
            onChange={(e) => setInterestInput(e.target.value)}
            onKeyDown={handleAddInterest}
            placeholder="Type an interest and press Enter (e.g. Machine Learning, Management)"
            className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-colors shadow-sm outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2 min-h-[60px] p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
          {currentInterests.length === 0 ? (
            <p className="text-sm text-slate-400 italic">No interests added yet.</p>
          ) : (
            currentInterests.map((interest, idx) => (
              <Badge key={idx} color="purple" size="md" onRemove={() => handleRemoveInterest(interest)}>
                {interest}
              </Badge>
            ))
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
        <Button onClick={handleSave} variant="primary" isLoading={isSaving} disabled={isSaving}>
          Save Skills & Interests
        </Button>
      </div>
    </div>
  );
};

export default SkillsEditor;
