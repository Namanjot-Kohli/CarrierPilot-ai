import axiosInstance from './axios.js';

export const getProfile = async () => {
  const response = await axiosInstance.get('/users/profile');
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await axiosInstance.put('/users/profile', data);
  return response.data;
};

export const changePassword = async (currentPassword, newPassword) => {
  const response = await axiosInstance.put('/users/password', { currentPassword, newPassword });
  return response.data;
};

export const getStats = async () => {
  const response = await axiosInstance.get('/users/stats');
  return response.data;
};

export const getActivity = async () => {
  const response = await axiosInstance.get('/users/activity');
  return response.data;
};
