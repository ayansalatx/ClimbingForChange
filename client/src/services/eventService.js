import axios from 'axios'
import { api } from './api'
 
export const getDisplayEvent = async () => {
  const res = await api.get(`${BASE_URL}/events/display`)
  return res.data
}
 
export const getAllEvents = async () => {
  const res = await api.get(`${BASE_URL}/events`)
  return res.data
}
 
export const editEvent = async (id, data) => {
  try {
    const response = await api.put(`${BASE_URL}/events/${id}`, data)
    if (response.status === 200) {
      return response.data
    }
    throw new Error(`Unexpected response status: ${response.status}`)
  } catch (error) {
    console.error('Failed to edit event:', error)
    throw error
  }
}
 
export const deleteEvent = async (id) => {
  try {
    const response = await api.delete(`${BASE_URL}/events/${id}`)
    if (response.status === 204) {
      return true
    }
    throw new Error(`Unexpected response status: ${response.status}`)
  } catch (error) {
    console.error('Failed to delete event:', error)
    throw error
  }
}