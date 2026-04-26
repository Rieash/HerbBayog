// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://herbbayog-api.onrender.com';

export const API_ENDPOINTS = {
  CLASSIFY: `${API_BASE_URL}/api/classify-api/`,
  PLANTS: `${API_BASE_URL}/api/plants/`,
  HEALTH: `${API_BASE_URL}/api/health/`,
};
