import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL
console.log('🚀 ~ BASE_URL in api services:', BASE_URL)

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add token dynamically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    let errorMessage = 'An unexpected error occurred.'

    if (error.response) {
      console.error('22 - Service api error. Backend Error:', error.response.data)
      
      // Handle token expiration
      if (error.response.status === 401) {
        // Token is expired or invalid
        localStorage.removeItem('token')
        // Redirect to login page
        window.location.href = '/login'
        return Promise.reject(new Error('Session expired. Please login again.'))
      }
      
      errorMessage = error.response.data.message || `Error ${error.response.status}: ${error.response.statusText}`
    } else if (error.request) {
      console.error('Network Error:', error.request)
      errorMessage = 'Cannot connect to the server. Please check your network connection.'
    } else {
      console.error('Error:', error.message)
      errorMessage = error.message
    }
      
    return Promise.reject(new Error(errorMessage))
  }
)