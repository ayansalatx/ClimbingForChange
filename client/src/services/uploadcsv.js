import { api } from './api'

export const uploadCSV = async (formDataWithCSVFile, eventId, overwrite) => {

  const res = await api.post('/upload-csv', formDataWithCSVFile, {
      headers: { "Content-Type": "multipart/form-data" },
      params: {eventid: eventId, overwrite: overwrite}
    })
  return res.data
}