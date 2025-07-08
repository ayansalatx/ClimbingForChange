import { api } from './api'


export const getMountains = async () => {
  const res = await api.get('/mountains')
  return res.data
}

export const getMountainById = async (id) => {
  if (!id) {
    throw new Error('Mountain ID is required')
  }
  const res = await api.get(`/mountains/${id}`)
  return res.data
}

export const createMountain = async (mountainData) => {
  if (!mountainData) {
    throw new Error('Mountain data is required')
  }
  
  const dataToSend = {
    ...mountainData,
    totalElevation: parseFloat(mountainData.totalElevation) || 0,
    active: mountainData.active !== undefined ? mountainData.active : true,
  }
  
  const res = await api.post('/mountains', dataToSend)
  return res.data
}

export const updateMountain = async (id, mountainData) => {
  if (!id) {
    throw new Error('Mountain ID is required')
  }
  if (!mountainData) {
    throw new Error('Mountain data is required')
  }
  
  try {
    const dataToSend = {
      ...mountainData,
      totalElevation: parseFloat(mountainData.totalElevation) || 0,
      active: mountainData.active !== undefined ? mountainData.active : true,
    }
    
    const res = await api.put(`/mountains/${id}`, dataToSend)
    return res.data
  } catch (error) {
    console.error('Error updating mountain:', error)
    throw error
  }
}

export const deleteMountain = async (id) => {
  if (!id) {
    throw new Error('Mountain ID is required')
  }
  try {
    const res = await api.delete(`/mountains/${id}`)
    return res.data
  } catch (error) {
    console.error('Error deleting mountain:', error)
    throw error
  }
}
