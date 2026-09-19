import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-ventas-atxh.onrender.com', // <--- Asegúrate que sea 'atxh'
  timeout: 30000
});

export default api;
