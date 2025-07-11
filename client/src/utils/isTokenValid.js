import jwtDecode from 'jwt-decode'

export function isTokenValid(token) {
  if (!token) return false
  try {
    const { exp } = jwtDecode(token)
    return typeof exp === 'number' && exp * 1000 > Date.now()
  } catch {
    return false
  }
}