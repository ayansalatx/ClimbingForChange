import { api } from './api'

export const getAllRFIDTags = async () => {
  const res = await api.get(`/rfidtags`)
  return res.data
}
