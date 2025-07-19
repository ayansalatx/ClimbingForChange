import { formatTimeSeconds } from '../utils/formatDateTime.js'
import { formatDurationTimeHours, formatDurationTimeMinutes } from '../utils/formatDurationTime'
import { formatNumber } from '../utils/formatNumber'
import { api } from './api'

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

export const getLeaderboard = async (eventId) => {
  const params = eventId ? { eventId } : {}

  const res = await api.get('/leaderboard', { params })
  const data = res.data
  const teams = data.teams
  
  return teams.map((team) => ({
    ...team,
    lapElevation: formatNumber(team.lapElevation) ?? '-',

    totalElevation: formatNumber(team.totalElevation) || 0,
    currentElevation: team.currentElevation ? formatNumber(team.currentElevation) : '-',

    lapsRequired: formatNumber(team.lapsRequired) || 0,
    lapsCompleted: team.lapsCompleted ? formatNumber(team.lapsCompleted) : '-',

    bestLap: formatDurationTimeMinutes(team.bestLap) ?? '-',
    averageLapTime: formatDurationTimeMinutes(team.averageLapTime) ?? '-',
    timeElapsed: formatDurationTimeHours(team.timeElapsed),

  }))
}

export const getLeaderboardTeam = async (teamId) => {
  const res = await api.get(`/leaderboard/team/${teamId}`)
  const team = res.data

  return {
    ...team,

    lapElevation: formatNumber(team.lapElevation) ?? '-',
    totalElevation: formatNumber(team.totalElevation) || 0,
    currentElevation: team.currentElevation ? formatNumber(team.currentElevation) : '-',

    lapsRequired: formatNumber(team.lapsRequired) || 0,
    lapsCompleted: team.lapsCompleted ? formatNumber(team.lapsCompleted) : '-',
    lapsToGo: team.lapsToGo ? formatNumber(team.lapsToGo) : '-',

    bestLap: formatDurationTimeMinutes(team.bestLap) ?? '-',
    averageLapTime: formatDurationTimeMinutes(team.averageLapTime) ?? '-',
    timeElapsed: formatDurationTimeHours(team.timeElapsed),

    participants: team.participants,

    // Laps already formatted from backend (lapNumber, duration, etc.)
    laps: team.laps.map((lap, idx) => {
      return {
        lapNumber: idx + 1,
        startDateTime: formatTimeSeconds(lap.startDateTime),
        endDateTime: formatTimeSeconds(lap.endDateTime),
        duration: formatDurationTimeMinutes(lap.lapDuration),
        completed: Boolean(lap.endDateTime),
      }
    }),
  }
}
