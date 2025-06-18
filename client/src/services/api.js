import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL
console.log('🚀 ~ BASE_URL:', BASE_URL)

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let errorMessage = 'An unexpected error occurred.';

    if (error.response) {
      console.error('22 - Service api error. Backend Error:', error.response.data);
      errorMessage = error.response.data.message || `Error ${error.response.status}: ${error.response.statusText}`;
    } else if (error.request) {
      console.error('Network Error:', error.request);
      errorMessage = 'Cannot connect to the server. Please check your network connection.';
    } else {
      console.error('Error:', error.message);
      errorMessage = error.message;
    }
      
    return Promise.reject(new Error(errorMessage));
  }
);