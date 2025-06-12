import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL

export const getAllParticipants = async () => {
  try {
    const res =  axios.get(`${BASE_URL}/participants`)
    return res.data
  } catch (error) {
    throw error
  }
}
