import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL

export const getAllMountains = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/mountains`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const getMountainById = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/mountains/target/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}
