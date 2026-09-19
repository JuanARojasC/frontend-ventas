import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-ventas-ntxh.onrender.com',
  timeout: 30000 // 30 segundos por si Render se vuelve a dormir
});

export default api;
