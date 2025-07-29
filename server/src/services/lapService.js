import Lap from '../models/lap.js'
import Team from '../models/team.js'
import Participant from '../models/participant.js'
import RFIDTag from '../models/rfidTag.js'

// Helper: Calculate stats for a team in an event
async function calculateLapStats(teamId) {
  try {
    const team = await Team.findById(teamId)
      .populate('mountain')
      .populate('hill')
    if (!team) {
      return null
    }
    const eventId = team.event?.toString?.()
    const mountain = team.mountain
    const hill = team.hill
    const laps = await Lap.find({ team: teamId, endDateTime: { $ne: null } })
    const lapsCompleted = laps.length
    const bestLap = laps.reduce((best, lap) => {
      if (!best || lap.lapDuration < best.lapDuration) return lap
      return best
    }, null)
    const lapsRequired
      = team.lapsRequired
        || (mountain && hill
          ? Math.floor(mountain.totalElevation / hill.lapElevationGain)
          : null)
    const lapsToGo
      = lapsRequired !== null ? Math.max(0, lapsRequired - lapsCompleted) : null
    let timeElapsed = null
    if (laps.length > 0) {
      const sortedLaps = laps
        .slice()
        .sort((a, b) => a.startDateTime - b.startDateTime)
      const start = new Date(sortedLaps[0].startDateTime)
      const end = new Date(sortedLaps[sortedLaps.length - 1].endDateTime)
      timeElapsed = end - start
    }
    const currentElevationRaw
      = hill && lapsCompleted ? lapsCompleted * (hill.lapElevationGain || 0) : 0
    const currentElevation
      = mountain && mountain.totalElevation
        ? Math.min(currentElevationRaw, mountain.totalElevation)
        : currentElevationRaw
    const progressPercentage
      = hill && lapsCompleted ? Math.round((lapsCompleted / lapsRequired) * 100) : 0
    const stats = {
      teamId: teamId.toString(),
      eventId,
      bestLap: bestLap ? bestLap.lapDuration : null,
      lapsRequired,
      lapsCompleted,
      lapsToGo,
      timeElapsed,
      currentElevation,
      progressPercentage,
    }
    return stats
  }
  catch (err) {
    console.error(
      '[lapStatsUpdate] Error calculating stats for team',
      teamId,
      err,
    )
    return null
  }
}

export async function createLapAndEmitStats(lapData, io) {
  if (!io) {
    throw new Error(
      '[lapStatsUpdate] Socket.IO instance (io) must be provided to createLapAndEmitStats for live updates.',
    )
  }
  const {
    teamId,
    participantId,
    rfidTagId,
    startDateTime,
    endDateTime,
    lapDuration,
    lapNumber,
  } = lapData
  try {
    // Validate team, participant, rfidTag if provided
    const team = await Team.findById(teamId)
    if (!team) throw new Error('Team not found')
    let participant = null
    if (participantId) {
      participant = await Participant.findById(participantId)
      if (!participant) throw new Error('Participant not found')
      if (participant.team?.toString() !== team.id)
        throw new Error('Participant does not belong to team')
    }
    let rfidTag = null
    if (rfidTagId) {
      rfidTag = await RFIDTag.findById(rfidTagId)
      if (!rfidTag) throw new Error('RFIDTag not found')
      // Optionally check rfidTag matches participant
    }
    const newLap = new Lap({
      team: teamId,
      participant: participantId,
      rfidTag: rfidTagId,
      startDateTime,
      endDateTime,
      lapDuration,
      lapNumber,
    })
    const savedLap = await newLap.save()
    // Emit lapStatsUpdate after saving the lap
    const stats = await calculateLapStats(teamId)
    if (stats) {
      io.emit('lapStatsUpdate', stats)
    }
    else {
      console.log('[lapStatsUpdate] No stats to emit for team:', teamId)
    }
    return savedLap
  }
  catch (err) {
    console.error('[lapStatsUpdate] Error in createLapAndEmitStats:', err)
    throw err
  }
}
