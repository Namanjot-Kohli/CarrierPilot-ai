import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import * as userApi from '../api/userApi';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileForm from '../components/profile/ProfileForm';
import SkillsEditor from '../components/profile/SkillsEditor';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('info');
  const [isSaving, setIsSaving] = useState(false);
  const [stats, setStats] = useState({ conversations: 0, roadmaps: 0, savedItems: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await userApi.getStats();
        if (response?.data) {
          setStats(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };
    fetchStats();
  }, []);
  
  // Security form state
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

  const handleSaveProfile = async (data) => {
    setIsSaving(true);
    try {
      await updateUser(data);
      addToast('Profile updated successfully', 'success');
    } catch (error) {
      addToast('Failed to update profile', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveSkills = async (data) => {
    setIsSaving(true);
    try {
      await updateUser(data);
      addToast('Skills and interests updated', 'success');
    } catch (error) {
      addToast('Failed to update skills', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      addToast('New passwords do not match', 'error');
      return;
    }
    if (passwords.new.length < 6) {
      addToast('Password must be at least 6 characters', 'error');
      return;
    }
    
    setIsSaving(true);
    try {
      await userApi.changePassword(passwords.current, passwords.new);
      addToast('Password changed successfully', 'success');
      setPasswords({ current: '', new: '', confirm: '' });
    } catch (error) {
      addToast(error.response?.data?.message || 'Failed to change password', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: 'info', label: 'Basic Info' },
    { id: 'skills', label: 'Skills & Interests' },
    { id: 'security', label: 'Security' }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <ProfileHeader 
        user={user} 
        stats={stats} 
      />

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-2 mr-6 text-sm font-medium transition-colors relative ${
                activeTab === tab.id
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 md:p-8">
          {activeTab === 'info' && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Personal Information</h2>
              <ProfileForm user={user} onSave={handleSaveProfile} isSaving={isSaving} />
            </div>
          )}

          {activeTab === 'skills' && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Your Expertise</h2>
              <SkillsEditor 
                skills={user?.skills} 
                interests={user?.interests} 
                onSave={handleSaveSkills} 
                isSaving={isSaving} 
              />
            </div>
          )}

          {activeTab === 'security' && (
            <div className="max-w-md">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Change Password</h2>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <Input
                  label="Current Password"
                  type="password"
                  value={passwords.current}
                  onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                  required
                />
                <Input
                  label="New Password"
                  type="password"
                  value={passwords.new}
                  onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                  required
                />
                <Input
                  label="Confirm New Password"
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                  required
                />
                <div className="pt-2">
                  <Button type="submit" variant="primary" isLoading={isSaving} disabled={isSaving}>
                    Update Password
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
