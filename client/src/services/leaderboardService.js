import { formatTimeSeconds } from '../utils/formatDateTime.js'
import {
  formatDurationTimeHours,
  formatDurationTimeMinutes,
} from '../utils/formatDurationTime'
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
    currentElevation: team.currentElevation
      ? formatNumber(team.currentElevation)
      : '-',

    lapsRequired: formatNumber(team.lapsRequired) || 0,
    lapsCompleted: team.lapsCompleted ? formatNumber(team.lapsCompleted) : '-',

    bestLap:
      !team.lapsCompleted || team.bestLap === 0
        ? '-'
        : formatDurationTimeMinutes(team.bestLap),
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
    currentElevation: team.currentElevation
      ? formatNumber(team.currentElevation)
      : '-',

    lapsRequired: formatNumber(team.lapsRequired) || 0,
    lapsCompleted: team.lapsCompleted ? formatNumber(team.lapsCompleted) : '-',
    lapsToGo: team.lapsToGo ? formatNumber(team.lapsToGo) : '-',

    bestLap:
      !team.lapsCompleted || team.bestLap === 0
        ? '-'
        : formatDurationTimeMinutes(team.bestLap),
    averageLapTime: formatDurationTimeMinutes(team.averageLapTime) ?? '-',
    timeElapsed: formatDurationTimeHours(team.timeElapsed),

    participants: team.participants,

    // Laps
    laps: team.laps.map((lap) => {
      return {
        ...lap,
        startDateTime: formatTimeSeconds(lap.startDateTime),
        endDateTime: formatTimeSeconds(lap.endDateTime),
        duration: formatDurationTimeMinutes(lap.duration),
      }
    }),
  }
}

// Update team info when laps are updated on the leaderboard
export function updateLeaderboardTeamLaps(team, newLaps) {
  const teamBestLap = getBestLapTime(newLaps)
  const teamTimeElapsed = getTimeElapsed(newLaps)

  return {
    ...team,
    lapsCompleted: newLaps.length,
    currentElevation: newLaps.length * (team.hill?.lapElevationGain ?? 0),
    lapsToGo: Math.max((team.lapsRequired ?? 0) - newLaps.length, 0),
    bestLap: newLaps.length ? formatDurationTimeMinutes(teamBestLap) : '-',
    averageLapTime: newLaps.length
      ? formatDurationTimeMinutes(team.averageLapTime)
      : '-',
    timeElapsed: newLaps.length
      ? formatDurationTimeHours(teamTimeElapsed)
      : '00:00:00',
  }
}

// Update team info when laps are updated
export function updateTeamWithLaps(team, newLaps) {
  const teamBestLap = getBestLapTime(newLaps)
  const teamTimeElapsed = getTimeElapsed(newLaps)

  return {
    ...team,
    lapsCompleted: newLaps.length,
    currentElevation: newLaps.length * (team.hill?.lapElevationGain ?? 0),
    lapsToGo: Math.max((team.lapsRequired ?? 0) - newLaps.length, 0),
    bestLap: newLaps.length ? formatDurationTimeMinutes(teamBestLap) : '-',
    averageLapTime: newLaps.length
      ? formatDurationTimeMinutes(team.averageLapTime)
      : '-',
    timeElapsed: newLaps.length
      ? formatDurationTimeHours(teamTimeElapsed)
      : '00:00:00',
    laps: newLaps.map((lap, idx) => {
      const startDateTime = formatTimeSeconds(lap.startDateTime)
      const endDateTime = formatTimeSeconds(lap.endDateTime)
      return {
        lapNumber: idx + 1,
        startDateTime,
        endDateTime,
        duration: formatDurationTimeMinutes(
          new Date(lap.endDateTime).getTime()
            - new Date(lap.startDateTime).getTime()
        ),
        completed: Boolean(lap.endDateTime),
      }
    }),
  }
}

// Returns the lap with shortest duration, or null if no laps
export function getBestLapTime(laps) {
  if (laps.length === 0) return null
  const completedLaps = laps.filter((lap) => lap.endDateTime)
  if (!completedLaps.length) return null

  const bestLap = completedLaps.reduce((best, current) => {
    const bestDuration
      = new Date(best.endDateTime) - new Date(best.startDateTime)
    const currentDuration
      = new Date(current.endDateTime) - new Date(current.startDateTime)
    return currentDuration < bestDuration ? current : best
  }, completedLaps[0])

  return new Date(bestLap.endDateTime) - new Date(bestLap.startDateTime)
}

// Calculate total elapsed time between first lap start and last lap end
export function getTimeElapsed(laps) {
  const completedLaps = laps.filter((lap) => lap.endDateTime)
  if (!completedLaps.length) return null

  const start = new Date(completedLaps[0].startDateTime)
  const end = new Date(completedLaps[completedLaps.length - 1].endDateTime)
  return end - start
}

export const getCharities = async (eventId) => {
  const res = await api.get(`/leaderboard/images/${eventId}`)

  return res.data.charities || []
}

export const getSponsors = async (eventId) => {
  const res = await api.get(`/leaderboard/images/${eventId}`)

  return res.data.sponsors || []
}

export const runSimulatedPassings = async (eventId) => {
  const res = await api.get(`/leaderboard/simulate/${eventId}`)
  const passings = res.data
  return passings

}
