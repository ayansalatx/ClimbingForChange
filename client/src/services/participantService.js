import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL

export const getAllParticipants = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/participants`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const getParticipantsByTeam = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/teams/${id}/participants`)
    return res.data
  } catch (error) {
    throw error
  }
}
