import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.BASE_URL
    ? 'https://your-backend-api.com'
    : 'http://localhost:5000'
});

export default axiosInstance;
