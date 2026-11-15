import axiosInstance from './axios';

/**
 * Upload and analyze a resume file
 * @param {FormData} formData - Contains 'resume' file and optional fields: targetRole, experienceLevel, jobDescription
 */
export const analyzeResumeApi = async (formData, onUploadProgress) => {
  const response = await axiosInstance.post('/resume/analyze', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress,
  });
  return response.data;
};

/**
 * Get past resume analyses for current user
 */
export const getResumeHistoryApi = async () => {
  const response = await axiosInstance.get('/resume/history');
  return response.data;
};

/**
 * Get a specific resume analysis by ID
 */
export const getResumeAnalysisByIdApi = async (id) => {
  const response = await axiosInstance.get(`/resume/${id}`);
  return response.data;
};

/**
 * Delete a resume analysis by ID
 */
export const deleteResumeAnalysisApi = async (id) => {
  const response = await axiosInstance.delete(`/resume/${id}`);
  return response.data;
};
