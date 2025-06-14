import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL

export const getAllTeams = async () => {
  const res = await axios.get(`${BASE_URL}/teams`)
  return res.data
}
