import { api } from './api'

export const getAllHills = async () => {
  const res = await api.get('/hills')
  return res.data
}

export const getHillById = async (id) => {
  const res = await api.get(`/hills/${id}`)
  return res.data
}

export const addNewHill = async (hillData) => {
  const res = await api.post('/hills', hillData)
  return res.data
}

export const editHill = async (id, hillData) => {
  const res = await api.put(`/hills/${id}`, hillData)
  return res.data
}

export const deleteHill = async (id) => {
  const res = await api.delete(`/hills/${id}`)
  return res.data
}
