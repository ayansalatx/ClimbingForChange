import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL

export const getAllLaps = async () => {
  const res = await axios.get(`${BASE_URL}/laps`)
  return res.data
}

export const getLapsByEvent = async () => {
  const res = await axios.get(`${BASE_URL}/events/${lapId}/laps`)
  return res.data
}
