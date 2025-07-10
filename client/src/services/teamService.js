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
    // Get laps for each participant
    const laps = team.participants?.flatMap((p) => p.laps || []) || []

    // Get best lap
    const teamBestLap = getBestLapTime(laps)

    // Get time elapsed
    const teamTimeElapsed = getTimeElapsed(laps)

    return {
      ...team,
      mountainName: team.mountain?.name,
      elevation: team.mountain?.totalElevation,
      currentElevation: laps.length
        ? laps.length * team.hill?.lapElevationGain
        : '-',
      lapsCompleted: laps.length ? laps.length : '-',
      lapsToGo: Math.max((team.lapsRequired || 0) - laps.length, 0),
      bestLap: laps.length ? formatTime(teamBestLap) : null,
      timeElapsed: laps.length ? formatTime(teamTimeElapsed) : '00:00:00',
      participants: team.participants?.map((participant) => {
        const participantLaps = participant.laps || []

        const participantBestLap = getBestLapTime(participantLaps)
        const participantTimeElapsed = getTimeElapsed(participantLaps)

        return {
          ...participant,
          currentElevation:
            participantLaps.length * team.hill?.lapElevationGain,
          lapsCompleted: participantLaps.length,
          lapsRequired: team.lapsRequired,
          lapsToGo: Math.max(
            (team.lapsRequired || '-') - participantLaps.length,
            '-'
          ),
          bestLap: participantBestLap ? formatTime(participantBestLap) : null,
          timeElapsed: participantTimeElapsed
            ? formatTime(participantTimeElapsed)
            : '00:00:00',
        }
      }),
    }
  })

  return teamsForDisplay
}

export const getTeamForDisplay = async () => {
  const res = await api.get(`/teams/${id}`)
  const team = res.data
  // Get laps for each participant
  const laps = team.participants?.flatMap((p) => p.laps || []) || []

  // Get best lap
  const teamBestLap = getBestLapTime(laps)

  // Get time elapsed
  const teamTimeElapsed = getTimeElapsed(laps)

  const teamForDisplay = {
    ...team,
    mountainName: team.mountain?.name,
    elevation: team.mountain?.totalElevation,
    currentElevation: laps.length
      ? laps.length * team.hill?.lapElevationGain
      : '-',
    lapsCompleted: laps.length ? laps.length : '-',
    lapsToGo: Math.max((team.lapsRequired || 0) - laps.length, 0),
    bestLap: laps.length ? formatTime(teamBestLap) : null,
    timeElapsed: laps.length ? formatTime(teamTimeElapsed) : '00:00:00',
    participants: team.participants?.map((participant) => {
      const participantLaps = participant.laps || []

      const participantBestLap = getBestLapTime(participantLaps)
      const participantTimeElapsed = getTimeElapsed(participantLaps)

      return {
        ...participant,
        currentElevation: participantLaps.length * team.hill?.lapElevationGain,
        lapsCompleted: participantLaps.length,
        lapsRequired: team.lapsRequired,
        lapsToGo: Math.max(
          (team.lapsRequired || '-') - participantLaps.length,
          '-'
        ),
        bestLap: participantBestLap ? formatTime(participantBestLap) : null,
        timeElapsed: participantTimeElapsed
          ? formatTime(participantTimeElapsed)
          : '00:00:00',
      }
    }),
  }

  return teamForDisplay
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
