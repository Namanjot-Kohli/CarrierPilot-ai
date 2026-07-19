import React, { useState, useEffect } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { EXPERIENCE_LEVELS } from '../../utils/constants';

const ProfileForm = ({ user, onSave, isSaving }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentRole: '',
    targetRole: '',
    experienceLevel: '',
    bio: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        currentRole: user.currentRole || '',
        targetRole: user.targetRole || '',
        experienceLevel: user.experienceLevel || '',
        bio: user.bio || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          label="Email (Read Only)"
          name="email"
          type="email"
          value={formData.email}
          disabled
        />
        <Input
          label="Current Role"
          name="currentRole"
          placeholder="e.g. Junior Frontend Developer"
          value={formData.currentRole}
          onChange={handleChange}
        />
        <Input
          label="Target Role"
          name="targetRole"
          placeholder="e.g. Senior Full Stack Engineer"
          value={formData.targetRole}
          onChange={handleChange}
        />
        
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Experience Level
          </label>
          <select
            name="experienceLevel"
            value={formData.experienceLevel}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-colors shadow-sm outline-none"
          >
            <option value="">Select Level</option>
            {EXPERIENCE_LEVELS.map(level => (
              <option key={level.value} value={level.value}>{level.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Bio / About Me
        </label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={4}
          placeholder="Tell us about your background, career goals, and what you're passionate about..."
          className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-colors shadow-sm outline-none resize-y"
        />
      </div>

      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
        <Button type="submit" variant="primary" isLoading={isSaving} disabled={isSaving}>
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
