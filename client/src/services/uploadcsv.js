import { api } from './api'

export const uploadCSV = async (formDataWithCSVFile, eventId, hillId, overwrite) => {
  const res = await api.post('/upload-csv', formDataWithCSVFile, {
    headers: { 'Content-Type': 'multipart/form-data' },
    params: { eventid: eventId, hillid: hillId, overwrite: overwrite },
  })
  return res.data
}
