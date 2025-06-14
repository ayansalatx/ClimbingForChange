import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL

export const getAllParticipants = async () => {
  const res = await axios.get(`${BASE_URL}/participants`)
  return res.data
}

export const getParticipantsByTeam = async (id) => {
  const res = await axios.get(`${BASE_URL}/teams/${id}/participants`)
  return res.data
}
