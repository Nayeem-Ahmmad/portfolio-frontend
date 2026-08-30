import axios from 'axios';

// Single Axios instance for the whole app. Every backend request goes
// through this file — no scattered axios.get() calls in components.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProfile = () => api.get('/profile/');
export const getSkills = () => api.get('/skills/');
export const getExperience = () => api.get('/experience/');
export const getProjects = () => api.get('/projects/');
export const getAchievements = () => api.get('/achievements/');
export const getSocialLinks = () => api.get('/social-links/');
export const sendContactMessage = (payload) => api.post('/contact/', payload);

export default api;
