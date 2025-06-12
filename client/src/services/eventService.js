import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL

export const getDisplayEvent = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/events/display`)
    console.log(res.data)
    return res.data
  } catch (error) {
    throw error
  }
}
