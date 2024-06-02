import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.BASE_URL
    ? import.meta.env.BASE_URL
    : 'http://localhost:5000'
});

export default axiosInstance;
