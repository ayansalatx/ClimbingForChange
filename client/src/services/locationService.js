import { api, formatApiError } from './api'

export const getAllLocations = async () => {
  const res = await api.get('/locations')
  return [...res.data].sort((a, b) => a.name.localeCompare(b.name))
}

export const getLocationById = async (id) => {
  const res = await api.get(`/locations/${id}`)
  return res.data
}

export const addNewLocation = async (data) => {
  try {
    const res = await api.post('/locations', data)
    return res.data
  }
  catch (error) {
    throw formatApiError(error, 'Failed to add location.')
  }
}

export const editLocation = async (id, data) => {
  try {
    const res = await api.put(`/locations/${id}`, data)
    return res.data
  }
  catch (error) {
    throw formatApiError(error, 'Failed to edit location.')
  }
}

// Deactivate location (Soft Delete)
export const removeLocation = async (id) => {
  try {
    await api.put(`/locations/${id}`, { active: false })
    return true
  }
  catch (error) {
    throw formatApiError(error, 'Failed to remove location.')
  }
}
