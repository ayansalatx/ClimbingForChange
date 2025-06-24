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
      mountainName: team.targetMountainId?.name,
      elevation: team.targetMountainId?.totalElevation,
      currentElevation: laps.length ? laps.length * 217 : 0,
      lapsCompleted: laps.length ? laps.length : 0,
      lapsToGo: Math.max((team.lapsRequired || 0) - laps.length, 0),
      bestLap: laps.length ? formatTime(teamBestLap) : null,
      timeElapsed: laps.length ? formatTime(teamTimeElapsed) : '00:00:00',
      participants: team.participants?.map((participant) => {
        const participantLaps = participant.laps || []

        const participantBestLap = getBestLapTime(participantLaps)
        const participantTimeElapsed = getTimeElapsed(participantLaps)

        return {
          ...participant,
          currentElevation: participantLaps.length * 217,
          lapsCompleted: participantLaps.length,
          lapsRequired: team.lapsRequired,
          lapsToGo: Math.max(
            (team.lapsRequired || 0) - participantLaps.length,
            0
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
