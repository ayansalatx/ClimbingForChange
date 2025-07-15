import { api } from './api'

export const getAllParticipants = async () => {
  const res = await api.get('/participants')
  const participants = res.data.map((p) => ({
    ...p,
    teamName: p.team ? p.team.name : '—',
    eventId: p.team ? p.team.event : null,
  }))
  return participants
}

export const getParticipantsByEvent = async (eventId) => {
  const res = await api.get('/participants')
  const participants = res.data.filter((p) => p.team?.event === eventId).map((p) => ({
    ...p,
    teamName: p.team ? p.team.name : '—',
    eventId: p.team ? p.team.event : null,
  }))
  return participants
}

export const uploadParticipants = async (participantsFromCSV) => {
  const res = await api.post('/participants/upload', participantsFromCSV)
  return res.data
}

export const addNewParticipant = async (participantData) => {
  const dataToSend = {
    ...participantData,
    team: participantData.teamId,
    event: participantData.eventId,
  }
  delete dataToSend.teamId
  delete dataToSend.eventId

  const res = await api.post('/participants', dataToSend)
  return res.data
}

export const editParticipant = async (id, participantData) => {
  const dataToSend = { ...participantData }
  delete dataToSend.id
  const res = await api.put(`/participants/${id}`, dataToSend)
  return res.data
}

export const deleteParticipant = async (id) => {
  const res = await api.delete(`/participants/${id}`)
  return res.data
}