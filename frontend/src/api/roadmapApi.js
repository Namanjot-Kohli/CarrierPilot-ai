import axiosInstance from './axios.js';

export const getRoadmaps = async (page = 1, limit = 20) => {
  const response = await axiosInstance.get(`/roadmaps?page=${page}&limit=${limit}`);
  return response.data;
};

export const createRoadmap = async (data) => {
  const response = await axiosInstance.post('/roadmaps', data);
  return response.data;
};

export const getRoadmap = async (id) => {
  const response = await axiosInstance.get(`/roadmaps/${id}`);
  return response.data;
};

export const updateProgress = async (id, progress) => {
  const response = await axiosInstance.patch(`/roadmaps/${id}/progress`, { progress });
  return response.data;
};

export const toggleMilestone = async (id, milestoneId) => {
  const response = await axiosInstance.patch(`/roadmaps/${id}/milestones/${milestoneId}`);
  return response.data;
};

export const deleteRoadmap = async (id) => {
  const response = await axiosInstance.delete(`/roadmaps/${id}`);
  return response.data;
};
