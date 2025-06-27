import { api } from './api'

export const getDisplayEvent = async () => {
  const res = await api.get('/events/display')
  return res.data
}

export const getUpcomingEventsSummary = async () => {
  const allEventsList = await getAllEvents()
  const now = new Date()

  const activeUpcomingEvents = allEventsList
    .filter((event) => {
      const start = new Date(event.startDateTime)
      const end = new Date(event.endDateTime)
      const daysToGo = Math.max(
        0,
        Math.ceil((start - now) / (1000 * 60 * 60 * 24))
      )
      return event.active === true && end >= now && daysToGo <= 366 
    })
    .sort((a, b) => new Date(a.startDateTime) - new Date(b.startDateTime))
    .slice(0, 5)

  // Create array for display
  const eventsForDisplay = activeUpcomingEvents.map((event) => {
    const start = new Date(event.startDateTime)
    const end = new Date(event.endDateTime)

    // Get days until start
    const daysToGo = Math.max(
      0,
      Math.ceil((start - now) / (1000 * 60 * 60 * 24))
    )

    // Get whether event is live or not
    const isLive = now >= start && now <= end

    //Get number of events
    const eventsList = event.teams || []
    const eventsCount = eventsList.length

    // Get number of participants
    const participantCount = eventsList.flatMap(team => team.participants || []).length

    return {
      name: event.name,
      startDate: start.toLocaleDateString(),
      startTime: start.toLocaleTimeString(),
      daysToGo,
      eventsCount,
      participantCount,
      isLive,
    }
  })

  return eventsForDisplay
}

export const getAllEvents = async () => {
  const res = await api.get('/events')
  return res.data
}

export const addEvent = async (data) => {
  console.log('Adding new event with data:', data)
  try {
    const response = await api.post('/events', data)
    return response
  } catch (error) {
    console.error('Failed to edit event:', error)
    throw error
  }
}

export const editEvent = async (id, data) => {
  try {
    const response = await api.put(`/events/${id}`, data)
    if (response.status === 200) {
      console.log('Event edited successfully:', response.data)
      return response
    } else {
      console.error('Failed to edit event:', response.statusText)
    }
    throw new Error(`Unexpected response status: ${response.status}`)
  } catch (error) {
    console.error('Failed to edit event:', error)
    throw error
  }
}

export const deleteEvent = async (id) => {
  try {
    await api.delete(`/events/${id}`)
    return true
  } catch (error) {
    console.error('Failed to delete event:', error)
    throw error
  }
}
