import { api } from './api'

export const getAllLocations = async () => {
  const res = await api.get('/locations')
  return res.data
}

export const getLocationById = async (id) => {
  const res = await api.get(`/locations/${id}`)
  return res.data
}
