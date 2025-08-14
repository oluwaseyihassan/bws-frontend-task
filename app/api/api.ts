import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || process.env.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;