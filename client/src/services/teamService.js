import { api, formatApiError } from './api'

// Get all teams
export const getAllTeams = async () => {
  const res = await api.get('/teams')
  return res.data
}

export const getTeamsByEvent = async (eventId) => {
  const res = await api.get('/teams', {
    params: { event: eventId },
  })
  return res.data
}

// Add
export const addTeam = async (data) => {
  const payload = {
    ...data,
    rfidTag: data.rfidTag,
  }

  try {
    const response = await api.post('/teams', payload)
    return response
  }
  catch (error) {
    throw formatApiError(error, 'Failed to create team.')
  }
}

// Edit
export const editTeam = async (id, data) => {
  const payload = {
    ...data,
    rfidTag: data.rfidTag,
  }

  try {
    const response = await api.put(`/teams/${id}`, payload)
    if (response.status === 200) {
      return response
    }
    else {
      throw new Error(`Unexpected response status: ${response.status}.`)
    }
  }
  catch (error) {
    throw formatApiError(error, 'Failed to edit team.')
  }
}

// Delete
export const deleteTeam = async (id) => {
  try {
    await api.delete(`/teams/${id}`)
    return true
  }
  catch (error) {
    throw formatApiError(error, 'Failed to delete team.')
  }
}
