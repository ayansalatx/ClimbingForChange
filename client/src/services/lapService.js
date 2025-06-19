import { api } from './api'

export const getAllLaps = async () => {
  const res = await api.get('/laps')
  return res.data
}
