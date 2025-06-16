import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL

export const getAllLaps = async () => {
  const res = await axios.get(`${BASE_URL}/laps`)
  return res.data
}
