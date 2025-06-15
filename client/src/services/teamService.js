import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL

// Get all teams
export const getAllTeams = async () => {
  const res = await axios.get(`${BASE_URL}/teams`)
  return res.data
}

// Get all teams for the current event
export const getTeamsForDisplay = async () => {
  const teamList = await getAllTeams()
  // Create array for display
  const teamsForDisplay = teamList.map((team) => {
    // get laps for each participant
    const laps = team.participants?.flatMap((p) => p.laps || []) || []

    //get best lap
    const bestLap =
      laps.length > 0
        ? laps.reduce((best, current) => {
            const bestDuration =
              new Date(best.endDateTime) - new Date(best.startDateTime)
            const currentDuration =
              new Date(current.endDateTime) - new Date(current.startDateTime)
            return currentDuration < bestDuration ? current : best
          }, laps[0])
        : null
    return {
      ...team,
      mountainName: team.targetMountainId?.name,
      elevation: team.targetMountainId?.totalElevation,
      currentElevation: laps.length ? laps.length * 217 : '-',
      lapsCompleted: laps.length ? laps.length : '-',
      lapsToGo: Math.max((team.lapsRequired || 0) - laps.length, 0),
      bestLap: bestLap ? formatLapDuration(bestLap) : '-',
      timeElapsed: '-',
    }
  })

  return teamsForDisplay
}

function formatLapDuration(lap) {
  const durationMs = new Date(lap.endDateTime) - new Date(lap.startDateTime)
  const minutes = Math.floor(durationMs / 60000)
  const seconds = Math.floor((durationMs / 1000) % 60)
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}