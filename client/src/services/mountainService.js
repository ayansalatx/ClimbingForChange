import { api } from './api'

export const getAllMountains = async () => {
  const res = await api.get('/mountains/target')
  return res.data
}

export const getMountainById = async (id) => {
  const res = await api.get(`/mountains/target/${id}`)
  return res.data
}
