import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_EMPLOYEE_MANAGEMENT_API_URL
});

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    return Promise.reject(error);
  }
);
export default axiosInstance;
