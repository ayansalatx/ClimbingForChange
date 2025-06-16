import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL

// Get all events
export const getAllEvents = async () => {
  const res = await axios.get(`${BASE_URL}/events`)
  return res.data
}

// Get current event for display
// export const getDisplayEvent = async () => {
//   const res = await axios.get(`${BASE_URL}/events`)
//   const allEvents = res.data


// }

export const addEvent = async (data) => {
  const res = await axios.post(`${BASE_URL}/events`, data)
  return res.data
}