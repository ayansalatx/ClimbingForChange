import { data } from 'react-router-dom'
import { api } from './api'
 
export const getDisplayEvent = async () => {
  const res = await api.get('/events/display')
  return res.data
}
 
export const getAllEvents = async () => {
  const res = await api.get('/events')
  return res.data
}

export const addEvent = async (data)  => {
  console.log('Adding new event with data:', data)
try {
  const response = await api.post(`/events`, data) 
    if (response.status === 200 ) {
      return response.data
    }
 throw new Error(`Unexpected response status: ${response.status}`)
  } catch (error) {
    console.error('Failed to edit event:', error)
    throw error
  }
}
 
export const editEvent = async (id, data) => {
  console.log('Editing event with ID:', id, 'and data:', data)
  try {
    const response = await api.put(`/events/${id}`, data)
    if (response.status === 200 ) {
      console.log('Event edited successfully:', response.data)
      return response.data
    } else {
      console.error('Failed to edit event:', response.statusText)
      console.error('Response data:', response.data)
    }
    throw new Error(`Unexpected response status: ${response.status}`)
  } catch (error) {
    console.error('Failed to edit event:', error)
    throw error
  }
}
 
export const deleteEvent = async (id, data) => {
  try {
    const response = await api.delete(`/events/${id}`)
    if (response.status === 200) {
      console.log('Event deleted successfully:', response.data)
      return true
    } else {
      console.error('Failed to delete event:', response.statusText)
      console.error('Response data:', response.data)
    }

    throw new Error(`Unexpected response status: ${response.status}`)

  } catch (error) {
    console.error('Failed to delete event:', error)
    throw error 
  }
}