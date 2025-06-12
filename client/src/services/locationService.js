import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL

export const getAllLocations = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/locations`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const getLocationById = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/locations/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}
