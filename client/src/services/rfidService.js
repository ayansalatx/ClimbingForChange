import {api} from './api'

const API_URL = '/rfidtags'

export const getRfidTags = async () => {
  const response = await api.get(API_URL)
  return response.data
}

export const getRfidTag = async (id) => {
  const response = await api.get(`${API_URL}/${id}`)
  return response.data
}

export const createRfidTag = async (rfidData) => {
  const response = await api.post(API_URL, rfidData)
  return response.data
}

export const updateRfidTag = async (id, rfidData) => {
  const response = await api.put(`${API_URL}/${id}`, rfidData)
  return response.data
}

export const deleteRfidTag = async (id) => {
  await api.delete(`${API_URL}/${id}`)
  return id
}
