import { api } from './api'

export const login = async (username, password) => {
  const res = await api.post('/login', { username, password })
  return res.data 
}
