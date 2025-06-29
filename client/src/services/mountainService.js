import { api } from './api'

// Physical Mountains (Hills)
export const getPhysicalMountains = async () => {
  const res = await api.get('/mountains/physical')
  return res.data
}

export const createPhysicalMountain = async (mountainData) => {
  const res = await api.post('/mountains/physical', mountainData)
  return res.data
}

export const updatePhysicalMountain = async (id, mountainData) => {
  if (!id) {
    throw new Error('Mountain ID is required')
  }
  if (!mountainData) {
    throw new Error('Mountain data is required')
  }
  
  try {
    // Ensure numeric fields are properly formatted
    const dataToSend = {
      ...mountainData,
      totalElevation: parseFloat(mountainData.totalElevation) || 0,
      active: mountainData.active !== undefined ? mountainData.active : true
    }
    
    const res = await api.put(`/mountains/physical/${id}`, dataToSend)
    return res.data
  } catch (error) {
    console.error('Error updating physical mountain:', error)
    throw error
  }
}

export const deletePhysicalMountain = async (id) => {
  if (!id) {
    throw new Error('Mountain ID is required')
  }
  try {
    const res = await api.delete(`/mountains/physical/${id}`)
    return res.data
  } catch (error) {
    console.error('Error deleting physical mountain:', error)
    throw error
  }
}

// Target Mountains
export const getTargetMountains = async () => {
  const res = await api.get('/mountains/target')
  return res.data
}

export const getTargetMountainById = async (id) => {
  const res = await api.get(`/mountains/target/${id}`)
  return res.data
}

export const createTargetMountain = async (mountainData) => {
  const res = await api.post('/mountains/target', mountainData)
  return res.data
}

export const updateTargetMountain = async (id, mountainData) => {
  if (!id) {
    throw new Error('Mountain ID is required')
  }
  if (!mountainData) {
    throw new Error('Mountain data is required')
  }
  
  try {
    // Ensure numeric fields are properly formatted
    const dataToSend = {
      ...mountainData,
      totalElevation: parseFloat(mountainData.totalElevation) || 0,
      active: mountainData.active !== undefined ? mountainData.active : true
    }
    
    const res = await api.put(`/mountains/target/${id}`, dataToSend)
    return res.data
  } catch (error) {
    console.error('Error updating target mountain:', error)
    throw error
  }
}

export const deleteTargetMountain = async (id) => {
  if (!id) {
    throw new Error('Mountain ID is required')
  }
  try {
    const res = await api.delete(`/mountains/target/${id}`)
    return res.data
  } catch (error) {
    console.error('Error deleting target mountain:', error)
    throw error
  }
}
