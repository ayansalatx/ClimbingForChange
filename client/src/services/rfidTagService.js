import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL

export const getAllRFIDTags = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/rfidtags`)
    return res.data
  } catch (error) {
    throw error
  }
}
