import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL

export const getAllMountains = async () => {
  const res = await axios.get(`${BASE_URL}/mountains/target`)
  return res.data
}

export const getMountainById = async (id) => {
  const res = await axios.get(`${BASE_URL}/mountains/target/${id}`)
  return res.data
}
