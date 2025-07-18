import { api } from './api'

export const getLeaderboard = async (eventId) => {
  const params = eventId ? { eventId } : {}
  const res = await api.get('/leaderboard', { params })
  return res.data
}

export const getLeaderboardTeam = async (teamId) => {
  const res = await api.get(`/leaderboard/team/${teamId}`)
  return res.data
}

export const getActiveUpcomingEvents = async () => {
  const res = await api.get('/leaderboard/events')
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
  const res = await api.get('/leaderboard/events')
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
