import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL

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

      // Handle token expiration
      if (error.response.status === 401) {
        localStorage.removeItem('token')
        return Promise.reject(new Error('Session expired. Please login again.'))
      }

      errorMessage = error.response.data.message || `Error ${error.response.status}: ${error.response.statusText}`
    } else if (error.request) {
      // Network error (server unreachable)
      errorMessage = 'Cannot connect to the server. Please check your network connection.'
    } else {
      // Other errors
      errorMessage = error.message
    }

    return Promise.reject(new Error(errorMessage))
  }
)

export function formatApiError(error, fallbackMsg) {
  const message = error.response?.data?.message || error.message || fallbackMsg
  return new Error(message)
}
