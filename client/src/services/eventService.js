import { getBestLapTime } from '../utils/calcBestLap'
import { getTimeElapsed } from '../utils/calcDuration'
import { formatDateLong, formatTime } from '../utils/formatDateTime'
import {
  formatDurationTimeHours,
  formatDurationTimeMinutes,
} from '../utils/formatDurationTime'
import { formatNumber } from '../utils/formatNumber'
import { api, formatApiError } from './api'

export const getAllEvents = async () => {
  const res = await api.get('/events')
  return res.data
}

export const getActiveUpcomingEvents = async () => {
  const res = await api.get('/events')
  const eventList = res.data
  const now = new Date()

  const activeUpcomingEvents = eventList
    .filter((event) => {
      const end = new Date(event.endDateTime)
      return event.active === true && end >= now
    })
    .sort((a, b) => new Date(a.startDateTime) - new Date(b.startDateTime))

  return activeUpcomingEvents
}

export const getPastEvents = async () => {
  const res = await api.get('/events')
  const eventList = res.data
  const now = new Date()

  const pastEvents = eventList
    .filter((event) => {
      const end = new Date(event.endDateTime)
      return end < now
    })
    .sort((a, b) => new Date(b.startDateTime) - new Date(a.startDateTime))

  return pastEvents
}

export const getDisplayEventTeams = async (id) => {
  const res = await api.get(`/events/${id}`)

  const teamList = res.data.teams || []

  const teamsForDisplay = teamList.map((team) => {
    // Get laps
    const laps = (team.laps || []).filter((lap) => lap.endDateTime)

    // Get best lap
    const teamBestLap = getBestLapTime(laps)
    // Get time elapsed
    const teamTimeElapsed = getTimeElapsed(laps)

    return {
      ...team,
      mountainName: team.mountain?.name,
      totalElevation: formatNumber(team.mountain?.totalElevation),
      currentElevation: formatNumber(
        laps.length * (team.hill?.lapElevationGain ?? 0)
      ),
      lapsRequired: Math.round(
        (team.mountain?.totalElevation ?? 0) /
          (team.hill?.lapElevationGain ?? 0)
      ),
      lapsCompleted: laps.length,
      lapsToGo: Math.max(
        Math.round(
          (team.mountain?.totalElevation ?? 0) /
            (team.hill?.lapElevationGain ?? 0)
        ) - laps.length,
        0
      ),
      bestLap: laps.length ? formatDurationTimeMinutes(teamBestLap) : null,
      timeElapsed: laps.length
        ? formatDurationTimeHours(teamTimeElapsed)
        : '00:00:00',
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

    const startDate = formatDateLong(start)

    // Format time: 3:20 PM
    const startTime = formatTime(start)

    const endDate = formatDateLong(end)

    // Format time: 3:20 PM
    const endTime = formatTime(end)

    return {
      name: event.name,
      startDate: startDate,
      startTime: startTime,
      endDate: endDate,
      endTime: endTime,
      daysToGo: daysToGo,
      teamsCount: teamsCount,
      participantsCount: participantCount,
      isLive: isLive,
    }
  })

  return eventsForDisplay
}

export const getOneEvent = async (id) => {
  const res = await api.get(`/events/${id}`)
  return res.data
}

export const addEvent = async (data) => {
  try {
    const response = await api.post('/events', data)
    return response
  } catch (error) {
    throw formatApiError(error, 'Failed to create event.')
  }
}

export const editEvent = async (id, data) => {
  try {
    const response = await api.put(`/events/${id}`, data)
    if (response.status === 200) {
      return response
    } else {
      throw new Error(`Unexpected response status: ${response.status}`)
    }
  } catch (error) {
    throw formatApiError(error, 'Failed to edit event.')
  }
}

export const deleteEvent = async (id) => {
  try {
    await api.delete(`/events/${id}`)
    return true
  } catch (error) {
    throw formatApiError(error, 'Failed to delete event.')
  }
}
