import { api } from './api'

export const getAllEvents = async () => {
  const res = await api.get('/events')
  return res.data
}

export const getDisplayEvent = async (id) => {
  const res = await api.get(`/events/${id}`)

  const teamList = res.data.teams || []

  const teamsForDisplay = teamList.map((team) => {
    // Get laps
    const laps = team.laps || []
    // Get best lap
    const teamBestLap = getBestLapTime(laps)
    // Get time elapsed
    const teamTimeElapsed = getTimeElapsed(laps)

    return {
      ...team,
      mountainName: team.mountain?.name,
      elevation: team.mountain?.totalElevation,
      currentElevation: laps.length
        ? laps.length * (team.hill?.lapElevationGain ?? 0)
        : '-',
      lapsCompleted: laps.length || '-',
      lapsToGo: Math.max((team.lapsRequired || 0) - laps.length, 0),
      bestLap: laps.length ? formatTime(teamBestLap) : null,
      timeElapsed: laps.length ? formatTime(teamTimeElapsed) : '00:00:00',
      participants: team.participants?.map((participant) => ({
        id: participant.id,
        firstName: participant.firstName,
        lastName: participant.lastName,
      })),
    }
  })

  return teamsForDisplay
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
    const teamsList = event.teams || []
    const teamsCount = teamsList?.length

    // Get number of participants
    const participantCount = teamsList.flatMap(
      (team) => team.participants || []
    ).length

    const startDate = start.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    // Format time: 3:20 PM
    const startTime = start.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })

    return {
      name: event.name,
      startDate: startDate,
      startTime: startTime,
      daysToGo: daysToGo,
      teamsCount: teamsCount,
      participantsCount: participantCount,
      isLive: isLive,
    }
  })

  return eventsForDisplay
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

// Returns the lap with shortest duration, or null if no laps
export function getBestLapTime(laps) {
  if (!laps.length) return null
  const bestLap = laps.reduce((best, current) => {
    const bestDuration =
      new Date(best.endDateTime) - new Date(best.startDateTime)
    const currentDuration =
      new Date(current.endDateTime) - new Date(current.startDateTime)
    return currentDuration < bestDuration ? current : best
  }, laps[0])

  return new Date(bestLap.endDateTime) - new Date(bestLap.startDateTime)
}

// Calculate total elapsed time between first lap start and last lap end
export function getTimeElapsed(laps) {
  if (!laps.length) return null
  const start = new Date(laps[0].startDateTime)
  const end = new Date(laps[laps.length - 1].endDateTime)
  return end - start
}

// Format time to display
function formatTime(durationMs) {
  const totalSeconds = Math.floor(durationMs / 1000)
  const seconds = totalSeconds % 60
  const totalMinutes = Math.floor(totalSeconds / 60)
  const minutes = totalMinutes % 60
  const hours = Math.floor(totalMinutes / 60)

  return `${String(hours).padStart(2, '00')}:${String(minutes).padStart(2, '00')}:${String(seconds).padStart(2, '00')}`
}
