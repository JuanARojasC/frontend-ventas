import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-ventas-ntxh.onrender.com',
  timeout: 5000
});

export default api;
