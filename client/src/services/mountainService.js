import { api, formatApiError } from './api'

export const getAllMountains = async () => {
  const res = await api.get('/mountains')
  return res.data
}

export const getMountainById = async (id) => {
  if (!id) throw new Error('Mountain ID is required')
  
  const res = await api.get(`/mountains/${id}`)
  return res.data
}

export const createMountain = async (mountainData) => {
  if (!mountainData) throw new Error('Mountain data is required')

  const dataToSend = {
    ...mountainData,
    totalElevation: parseFloat(mountainData.totalElevation) || 0,
    active: mountainData.active !== undefined ? mountainData.active : true,
  }

  try {
    const res = await api.post('/mountains', dataToSend)
    return res.data
  } catch (error) {
    throw formatApiError(error, 'Failed to create mountain.')
  }
}

export const updateMountain = async (id, mountainData) => {
  if (!id) throw new Error('Mountain ID is required')
  if (!mountainData) throw new Error('Mountain data is required')

  const dataToSend = {
    ...mountainData,
    totalElevation: parseFloat(mountainData.totalElevation) || 0,
    active: mountainData.active !== undefined ? mountainData.active : true,
  }

  try {
    const res = await api.put(`/mountains/${id}`, dataToSend)
    return res.data
  } catch (error) {
    throw formatApiError(error, 'Failed to update mountain.')
  }
}

export const deleteMountain = async (id) => {
  if (!id) throw new Error('Mountain ID is required')

  try {
    const res = await api.delete(`/mountains/${id}`)
    return res.data
  } catch (error) {
    throw formatApiError(error, 'Failed to delete mountain.')
  }
}
