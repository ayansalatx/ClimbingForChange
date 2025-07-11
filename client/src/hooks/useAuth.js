import { useState, useEffect } from 'react'
import { isTokenValid } from '../utils/isTokenValid'

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    isTokenValid(localStorage.getItem('token'))
  )

  useEffect(() => {
    // check if the token is valid every minute
    const id = setInterval(() => {
      setIsAuthenticated(isTokenValid(localStorage.getItem('token')))
    }, 60_000)                 
    return () => clearInterval(id)
  }, [])

  return { isAuthenticated }
}
