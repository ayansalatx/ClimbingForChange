import { api } from './api'

export const getAllParticipants = async () => {
  const res = await api.get('/participants')
  const participants = res.data.map(p => ({
    ...p,
    teamName: p.teamId ? p.teamId.name : '—',
  }))
  return participants
}

export const uploadParticipants = async (participantsFromCSV) => {
  const res = await api.post('/participants/upload', participantsFromCSV)
  return res.data
}

export const addNewParticipant = async (hillData) => {
  const res = await api.post('/participants', hillData)
  return res.data
}

export const editParticipant = async (id, hillData) => {
  const res = await api.put(`/participants/${id}`, hillData)
  return res.data
}

export const deleteParticipant = async (id) => {
  const res = await api.delete(`/participants/${id}`)
  return res.data
}