import { api } from './api'

export const uploadCSV = async (participantsFromCSV) => {
  const res = await api.post('/uploadcsv', participantsFromCSV)
  return res.data
}