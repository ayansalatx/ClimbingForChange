import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL

export const getAllLocations = async () => {
  const res = await axios.get(`${BASE_URL}/locations`)
  return res.data
}

export const getLocationById = async (id) => {
  const res = await axios.get(`${BASE_URL}/locations/${id}`)
  return res.data
}
