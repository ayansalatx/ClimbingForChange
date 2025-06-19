import { api } from './api'

export const getAllParticipants = async () => {
  const res = await api.get('/participants')
  return res.data
}
