import { getBestLapTime } from '../utils/calcBestLap'
import { getDuration, getTimeElapsed } from '../utils/calcDuration'
import { formatTimeSeconds } from '../utils/formatDateTime'
import {
  formatDurationTimeHours,
  formatDurationTimeMinutes,
} from '../utils/formatDurationTime'
import { formatNumber } from '../utils/formatNumber'
import { api } from './api'

// Get all teams
export const getAllTeams = async () => {
  const res = await api.get('/teams')
  return res.data
}

// Get all teams for the current event
export const getTeamsForDisplay = async () => {
  const teamList = await getAllTeams()

  // Create array for display
  const teamsForDisplay = teamList.map((team) => {
    // Get laps for each team
    const laps = (team.laps || []).filter((lap) => lap.endDateTime)

    // Get best lap
    const teamBestLap = getBestLapTime(laps)

    // Get time elapsed
    const teamTimeElapsed = getTimeElapsed(laps)

    return {
      ...team,
      mountainName: team.mountain?.name,
      elevation: formatNumber(team.mountain?.totalElevation),
      currentElevation: laps.length
        ? formatNumber(laps.length * team.hill?.lapElevationGain)
        : '-',
      lapsCompleted: laps.length ? laps.length : '-',
      lapsToGo: Math.max((team.lapsRequired || 0) - laps.length, 0),
      bestLap: laps.length ? formatDurationTimeMinutes(teamBestLap) : null,
      timeElapsed: laps.length
        ? formatDurationTimeHours(teamTimeElapsed)
        : '00:00:00',
      participants: team.participants?.map((participant) => {
        return {
          ...participant,
          fullName: `${participant.firstName} ${participant.lastName}`,
        }
      }),
    }
  })

  return teamsForDisplay
}

export const getTeamForDisplay = async (id) => {
  const res = await api.get(`/teams/${id}`)
  const team = res.data

  if (!team) {
    return null
  }
  // Get laps for each team
  const laps = (team.laps || []).filter((lap) => lap.endDateTime)

  // Get best lap
  const teamBestLap = getBestLapTime(laps)

  // Get time elapsed
  const teamTimeElapsed = getTimeElapsed(laps)

  const teamForDisplay = {
    ...team,
    mountainName: team.mountain?.name,
    totalElevation: formatNumber(team.mountain?.totalElevation),
    elevationUnit: team.mountain?.elevationUnit,
    hillLap: formatNumber(team.hill?.lapElevationGain),
    hillLapUnit: team.hill?.elevationUnit,
    currentElevation: laps.length
      ? formatNumber(laps.length * team.hill?.lapElevationGain)
      : '-',
    elevationProgress: team.mountain?.totalElevation
      ? ((laps.length * team.hill?.lapElevationGain) /
          team.mountain.totalElevation) *
          100 >
        100
        ? 100
        : ((laps.length * team.hill?.lapElevationGain) /
            team.mountain.totalElevation) *
          100
      : 0,
    totalLaps: formatNumber(team.lapsRequired),
    lapsCompleted: laps.length ? formatNumber(laps.length) : '-',
    lapsToGo: formatNumber(Math.max((team.lapsRequired || 0) - laps.length, 0)),
    lapProgress: team.lapsRequired
      ? (laps.length / team.lapsRequired) * 100 > 100
        ? 100
        : formatNumber((laps.length / team.lapsRequired) * 100)
      : 0,
    bestLap: laps.length ? formatDurationTimeMinutes(teamBestLap) : '-',
    timeElapsed: laps.length
      ? formatDurationTimeHours(teamTimeElapsed)
      : '00:00:00',
    participants: team.participants?.map((participant) => {
      return {
        ...participant,
        fullName: `${participant.firstName} ${participant.lastName}`,
      }
    }),
    laps: laps.map((lap, index) => {
      const start = new Date(lap.startDateTime)
      const end = new Date(lap.endDateTime)

      return {
        lapNumber: formatNumber(index + 1),
        startDateTime: formatTimeSeconds(start),
        endDateTime: formatTimeSeconds(end),
        duration: formatDurationTimeMinutes(getDuration(start, end)),
        completed: Boolean(lap.endDateTime),
      }
    }),
  }

  return teamForDisplay
}

// Add
export const addTeam = async (data) => {
  console.log('Adding new team with data:', data)
  try {
    const response = await api.post('/teams', data)
    return response
  } catch (error) {
    console.error('Failed to add team:', error)
    throw error
  }
}

// Edit
export const editTeam = async (id, data) => {
  try {
    const response = await api.put(`/teams/${id}`, data)
    if (response.status === 200) {
      console.log('Team edited successfully:', response.data)
      return response
    } else {
      console.error('Failed to edit team:', response.statusText)
    }
    throw new Error(`Unexpected response status: ${response.status}`)
  } catch (error) {
    console.error('Failed to edit team:', error)
    throw error
  }
}

// Delete
export const deleteTeam = async (id) => {
  try {
    await api.delete(`/teams/${id}`)
    return true
  } catch (error) {
    console.error('Failed to delete team:', error)
    throw error
  }
}
