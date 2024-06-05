import axios from 'axios';

// console.log('import.meta.env.VITE_BASE_URL: ', import.meta.env.VITE_BASE_URL);

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
    ? import.meta.env.VITE_BASE_URL
    : 'http://example.com/api', // 실제 API 엔드포인트를 입력하세요
  headers: {
    'Content-Type': 'application/json'
  }
});

export default axiosInstance;
