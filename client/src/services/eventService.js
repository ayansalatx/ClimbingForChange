import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL

export const getDisplayEvent = async () => {
  const res = await axios.get(`${BASE_URL}/events/display`)
  return res.data
}

export const getAllEvents = async () => {
  const res = await axios.get(`${BASE_URL}/events`)
  return res.data
}
