import { api } from './api'

export const login = async (data)  => {
  try {
    const response = await api.post('/auth', {
      username: data.username,
      password: data.password,
    })
    return response
  } catch (error) {
    console.error('Failed to login:', error)
    throw error
  }
}
