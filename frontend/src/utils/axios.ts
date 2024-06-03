import axios from 'axios';

// console.log('import.meta.env.VITE_BASE_URL: ', import.meta.env.VITE_BASE_URL);
const axiosInstance = axios.create({
  baseURL: import.meta.env.BASE_URL ? '' : 'http://localhost:5000'
});

export default axiosInstance;
