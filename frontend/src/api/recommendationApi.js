import axiosInstance from './axios.js';

export const getRecommendations = async (type = '', page = 1, limit = 20) => {
  const url = type 
    ? `/recommendations?type=${type}&page=${page}&limit=${limit}`
    : `/recommendations?page=${page}&limit=${limit}`;
  const response = await axiosInstance.get(url);
  return response.data;
};

export const getRecommendation = async (id) => {
  const response = await axiosInstance.get(`/recommendations/${id}`);
  return response.data;
};

export const toggleSave = async (id) => {
  const response = await axiosInstance.patch(`/recommendations/${id}/save`);
  return response.data;
};

export const deleteRecommendation = async (id) => {
  const response = await axiosInstance.delete(`/recommendations/${id}`);
  return response.data;
};
