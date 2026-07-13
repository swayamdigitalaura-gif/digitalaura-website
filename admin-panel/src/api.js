import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';
const api = axios.create({ baseURL: `${API_BASE}/api` });

api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('da_token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

api.interceptors.response.use(
  r => r,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('da_token');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;
