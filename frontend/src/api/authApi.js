import axiosInstance from './axios.js';

export const signup = async (name, email, password) => {
  const response = await axiosInstance.post('/auth/signup', { name, email, password });
  return response.data;
};

export const login = async (email, password) => {
  const response = await axiosInstance.post('/auth/login', { email, password });
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post('/auth/logout');
  return response.data;
};

export const getMe = async () => {
  const response = await axiosInstance.get('/auth/me');
  return response.data;
};

export const refreshToken = async () => {
  const response = await axiosInstance.post('/auth/refresh');
  return response.data;
};
