import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL

export const fetchParticipants = () => {
  return axios.get(`${BASE_URL}/participants`)
}
