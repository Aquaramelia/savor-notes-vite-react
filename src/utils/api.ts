import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5173/api', // Your Rails backend URL
  withCredentials: true, // Enable if using cookies for authentication
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default api;