import axios from 'axios';

// Base API configuration
const API = axios.create({
  baseURL: 'https://growthxsubmissionportal-backend.onrender.com/api',
});

// Add Authorization header if token exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
