import { api } from './api'

export const getAllParticipants = async () => {
  const res = await api.get('/participants')
  return res.data
}

export const uploadParticipants = async (participantsFromCSV) => {
  const res = await api.post('/participants/upload', participantsFromCSV)
  return res.data
}