import axios from 'axios';

const api = axios.create({
  baseURL: 'https://churrasquinho-api-production.up.railway.app/api',
  headers: {
    Accept: 'application/json',
  },
});

export default api;