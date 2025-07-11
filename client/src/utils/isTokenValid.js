function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch {
    return null
  }
}

export function isTokenValid(token) {
  if (!token) return false
  const decoded = parseJwt(token)
  if (!decoded || typeof decoded.exp !== 'number') return false
  return decoded.exp * 1000 > Date.now()
}