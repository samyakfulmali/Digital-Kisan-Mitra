import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      // Redirect to login or handle logout
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.post(`/auth/reset-password/${token}`, { password }),
};

// Farmer Profile APIs
export const farmerAPI = {
  getProfile: () => api.get('/farmer/profile'),
  updateProfile: (profileData) => api.put('/farmer/profile', profileData),
  changePassword: (passwordData) => api.put('/farmer/change-password', passwordData),
};

// Crop Management APIs
export const cropAPI = {
  getCrops: () => api.get('/crops'),
  getCropById: (id) => api.get(`/crops/${id}`),
  createCrop: (cropData) => api.post('/crops', cropData),
  updateCrop: (id, cropData) => api.put(`/crops/${id}`, cropData),
  deleteCrop: (id) => api.delete(`/crops/${id}`),
  harvestCrop: (id) => api.post(`/crops/${id}/harvest`),
};

// Weather APIs
export const weatherAPI = {
  getCurrentWeather: (location) => api.get(`/weather/current`, { params: { location } }),
  getForecast: (location, days) => api.get(`/weather/forecast`, { params: { location, days } }),
  getWeatherAlerts: (location) => api.get(`/weather/alerts`, { params: { location } }),
};

// Mandi Price APIs
export const mandiAPI = {
  getPrices: (filters) => api.get('/mandi/prices', { params: filters }),
  getPriceHistory: (cropId, marketId) => api.get(`/mandi/price-history`, { params: { cropId, marketId } }),
  getMarkets: () => api.get('/mandi/markets'),
  getCropsList: () => api.get('/mandi/crops'),
};

// Analytics APIs
export const analyticsAPI = {
  getDashboardStats: () => api.get('/analytics/dashboard'),
  getCropYield: (params) => api.get('/analytics/crop-yield', { params }),
  getExpenseReport: (params) => api.get('/analytics/expenses', { params }),
  getIrrigationUsage: (params) => api.get('/analytics/irrigation', { params }),
};

// Notification APIs
export const notificationAPI = {
  getNotifications: () => api.get('/notifications'),
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
  markAllAsRead: () => api.put('/notifications/read-all'),
  getUnreadCount: () => api.get('/notifications/unread-count'),
};

export default api;