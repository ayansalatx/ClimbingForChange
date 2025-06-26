import { api } from './api'

export const getAllLocations = async () => {
  const res = await api.get('/locations')
  const data = res.data
  return [...data].sort((a,b) => a.name.localeCompare(b.name))
}

export const getLocationById = async (id) => {
  const res = await api.get(`/locations/${id}`)
  return res.data
}

export const addNewLocation = async (data) => {
  try {
    const response = await api.post('/locations', data)
    if (response.status === 201 || response.status === 200) {
      return response.data
    }
    throw new Error(`Unexpected response status: ${response.status}`)
  } catch (error) {
    console.error('Failed to add new location:', error)
    throw error
  }
}

export const editLocation = async (id, data) => {
  try {
    const response = await api.put(`/locations/${id}`, data)
    if (response.status === 200) {
      return response.data
    }
    throw new Error(`Unexpected response status: ${response.status}`)
  } catch (error) {
    console.error('Failed to edit location:', error)
    throw error
  }
}

export const deleteLocation = async (id) => {
  try {
    const response = await api.delete(`/locations/${id}`)
    if (response.status === 200) {
      return true
    }

    throw new Error(`Unexpected response status: ${response.status}`)
  } catch (error) {
    console.error('Failed to delete locations:', error)
    throw error
  }
}

// export const createLocation = async (data) => {
//   const res = await api.post('/locations', data)
//   return res.data
// }

// export const editLocation = async (id, data) => {
//   const res = await api.put(`/locations/${id}`, data)
//   return res.data
// }

// export const deleteLocation = async (id) => {
//   const res = await api.delete(`/locations/${id}`)
//   return res.data
// }