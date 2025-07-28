import { bibToTeamMap } from '../utils/serverState.js'

import Passing from '../models/passing.js'
import Lap from '../models/lap.js'
import Team from '../models/team.js'
import Event from '../models/event.js'
import Image from '../models/image.js'

async function processNewPassings(newPassings) {
  const START_LOOP_ID = 1
  const LAP_POINT_LOOP_ID = 2

  console.log(`[Processing] Processing ${newPassings.length} new passings...`)

  for (const passingData of newPassings) {
    const bib = passingData.Code
    const teamId = bibToTeamMap.get(bib)

    if (!teamId) {
      console.warn(
        `[Processing] Received passing for unmapped Bib: ${bib}. Skipping.`
      )
      continue
    }

    try {
      const existingPassing = await Passing.findOne({
        Code: bib,
        LoopID: passingData.LoopID,
        PassingNo: passingData.PassingNo,
      })
      if (existingPassing) {
        continue
      }

      const savedPassing = await Passing.create({
        ...passingData,
        team: teamId,
      })

      if (parseInt(savedPassing.LoopID) === LAP_POINT_LOOP_ID) {
        const lapJustCompleted = parseInt(savedPassing.PassingNo, 10)

        const existingLap = await Lap.findOne({
          team: teamId,
          lapNumber: lapJustCompleted,
        })
        if (existingLap) {
          continue
        }

        let lapStartTime
        if (lapJustCompleted === 1) {
          const startPassing = await Passing.findOne({
            team: teamId,
            LoopID: START_LOOP_ID,
          })
          if (!startPassing) {
            console.warn(
              `[Processing] Bib ${bib}: Start passing not found for lap 1, skipping.`
            )
            continue
          }
          lapStartTime = startPassing.RealTime
        } else {
          const previousLapPassing = await Passing.findOne({
            team: teamId,
            LoopID: LAP_POINT_LOOP_ID,
            PassingNo: lapJustCompleted - 1,
          })
          if (!previousLapPassing) {
            console.warn(
              `[Processing] Bib ${bib}: Previous lap passing not found for lap ${lapJustCompleted}, skipping.`
            )
            continue
          }
          lapStartTime = previousLapPassing.RealTime
        }

        const lapEndTime = savedPassing.RealTime
        const lapDurationMs = lapEndTime.getTime() - lapStartTime.getTime()

        if (lapDurationMs < 0) {
          console.error(
            `[Processing] Bib ${bib}: Negative lap duration detected, skipping.`
          )
          continue
        }

        const team = await Team.findById(teamId)
        if (!team) {
          console.warn(
            `[Processing] Bib ${bib}: Team not found, skipping lap creation.`
          )
          continue
        }

        await Lap.create({
          team: teamId,
          rfidTag: team.rfidTag,
          startDateTime: lapStartTime,
          endDateTime: lapEndTime,
          lapDuration: lapDurationMs,
          lapNumber: lapJustCompleted,
        })

        console.log(
          `✅ [Lap Recorded] Team ${team.name} (Bib: ${bib}) completed Lap ${lapJustCompleted} in ${(lapDurationMs / 1000).toFixed(1)}s`
        )
      }
    } catch (error) {
      if (error.code !== 11000)
        console.error(`[Processing Error] Bib ${bib}:`, error)
    }
  }
}

async function generateLeaderboard(eventId) {
  if (!eventId) {
    throw new Error('Event ID is required to generate leaderboard')
  }
  const teams = await Team.find({ event: eventId })
    .populate('participants')
    .populate('mountain')
    .populate('hill')
    .populate('laps')

  const calculatedTeams = teams.map((team) => {
    // Filter laps to only completed (endDateTime)
    const completedLaps = (team.laps || []).filter((lap) => lap.endDateTime)
    const lapsCompleted = completedLaps.length || 0
    const lapsToGo = Math.max((team.lapsRequired || 0) - lapsCompleted, 0)

    const totalElevation = team.mountain?.totalElevation || 0
    const elevationGainPerLap = team.hill?.lapElevationGain || 0

    const currentElevation = lapsCompleted * elevationGainPerLap || 0
    const progressPercentage = team.mountain
      ? (currentElevation / team.mountain.totalElevation) * 100
      : 0

    let lastUpdateTime = team.startDateTime
    let bestLapTime = 0
    let averageLapTime = 0
    let timeElapsed = 0

    if (lapsCompleted > 0) {
      const sortedLaps = [...completedLaps].sort(
        (a, b) => a.lapNumber - b.lapNumber
      )
      const lapDurations = sortedLaps.map((lap) => lap.lapDuration)
      bestLapTime = Math.min(...lapDurations)
      averageLapTime =
        lapDurations.reduce((a, b) => a + b, 0) / lapDurations.length
      timeElapsed =
        sortedLaps[sortedLaps.length - 1].endDateTime -
        sortedLaps[0].startDateTime
      lastUpdateTime = sortedLaps[sortedLaps.length - 1].endDateTime
    }

    let status = 'Not Started'
    if (lapsCompleted > 0) status = 'Running'
    if (progressPercentage >= 100) status = 'Finished'

    // Milestones log
    if (lapsCompleted > 0 && progressPercentage > 0) {
      const prevLaps = lapsCompleted - 1
      const prevProgress =
        ((prevLaps * elevationGainPerLap) /
          (team.mountain ? team.mountain.totalElevation : 1)) *
        100

      if (progressPercentage >= 25 && prevProgress < 25) {
        console.log(
          `🏔️ [Milestone] ${team.name} reached 25% of ${team.mountain?.name || 'mountain'} (${lapsCompleted}/${team.lapsRequired} laps)`
        )
      } else if (progressPercentage >= 50 && prevProgress < 50) {
        console.log(
          `🏔️ [Milestone] ${team.name} reached 50% of ${team.mountain?.name || 'mountain'} (${lapsCompleted}/${team.lapsRequired} laps)`
        )
      } else if (progressPercentage >= 75 && prevProgress < 75) {
        console.log(
          `🏔️ [Milestone] ${team.name} reached 75% of ${team.mountain?.name || 'mountain'} (${lapsCompleted}/${team.lapsRequired} laps)`
        )
      } else if (progressPercentage >= 100 && prevProgress < 100) {
        console.log(
          `🏆 [FINISHED] ${team.name} completed ${team.mountain?.name || 'mountain'}! (${lapsCompleted}/${team.lapsRequired} laps)`
        )
      }
    }

    return {
      id: team.id,
      name: team.name,
      mountainName: team.mountain ? team.mountain.name : 'N/A',
      lapElevation: team.hill?.lapElevationGain ?? 0,
      totalElevation,
      currentElevation,

      lapsRequired: team.lapsRequired || 0,
      lapsCompleted: lapsCompleted,
      lapsToGo,
      lastUpdateTime,
      status,

      bestLap: bestLapTime,
      averageLapTime,
      timeElapsed,
      progressPercentage,

      // Participants with fullName
      participants: team.participants.map((p) => ({
        ...p.toObject(),
        fullName: `${p.firstName} ${p.lastName}`,
      })),
    }
  })

  // Sort alphabetically by team name (case-insensitive)
  calculatedTeams.sort((a, b) => {
    const nameA = a.name.toLowerCase()
    const nameB = b.name.toLowerCase()
    if (nameA < nameB) return -1
    if (nameA > nameB) return 1
    return 0
  })

  return calculatedTeams.map((team) => ({
    ...team,
  }))
}

export { processNewPassings, generateLeaderboard }

export const getLeaderboard = async (req, res) => {
  try {
    const eventId = req.query.eventId
    const leaderboard = await generateLeaderboard(eventId)

    res.json({
      eventId: eventId || 'current',
      lastUpdated: new Date().toISOString(),
      teams: leaderboard,
    })
  } catch (error) {
    console.error('Leaderboard API error:', error)
    res.status(500).json({
      error: 'Failed to generate leaderboard',
      message: error.message,
    })
  }
}

export const getTeamProgress = async (request, response) => {
  try {
    const teamId = request.params.teamId
    const team = await Team.findById(teamId)
      .populate('participants')
      .populate('mountain')
      .populate('hill')
      .populate('laps')

    if (!team) {
      return response.status(404).json({ error: 'Team not found' })
    }

    const completedLaps = (team.laps || []).filter((lap) => lap.endDateTime)

    const lapsCompleted = completedLaps.length
    const totalElevation = team.mountain?.totalElevation || 0
    const elevationGainPerLap = team.hill?.lapElevationGain || 0
    const currentElevation = lapsCompleted * elevationGainPerLap
    const progressPercentage = team.mountain
      ? (currentElevation / team.mountain.totalElevation) * 100
      : 0

    let lastUpdateTime = team.startDateTime
    let bestLapTime = 0
    let averageLapTime = 0
    let timeElapsed = 0

    if (lapsCompleted > 0) {
      const sortedLaps = [...completedLaps].sort(
        (a, b) => a.lapNumber - b.lapNumber
      )
      const lapDurations = sortedLaps.map((lap) => lap.lapDuration)
      bestLapTime = Math.min(...lapDurations)
      averageLapTime =
        lapDurations.reduce((a, b) => a + b, 0) / lapDurations.length
      timeElapsed =
        sortedLaps[sortedLaps.length - 1].endDateTime -
        sortedLaps[0].startDateTime
      lastUpdateTime = sortedLaps[sortedLaps.length - 1].endDateTime
    }

    let status = 'Not Started'
    if (lapsCompleted > 0) status = 'Running'
    if (progressPercentage >= 100) status = 'Finished'

    // Milestones log
    if (lapsCompleted > 0 && progressPercentage > 0) {
      const prevLaps = lapsCompleted - 1
      const prevProgress =
        ((prevLaps * elevationGainPerLap) /
          (team.mountain ? team.mountain.totalElevation : 1)) *
        100

      if (progressPercentage >= 25 && prevProgress < 25) {
        console.log(
          `🏔️ [Milestone] ${team.name} reached 25% of ${team.mountain?.name || 'mountain'} (${lapsCompleted}/${team.lapsRequired} laps)`
        )
      } else if (progressPercentage >= 50 && prevProgress < 50) {
        console.log(
          `🏔️ [Milestone] ${team.name} reached 50% of ${team.mountain?.name || 'mountain'} (${lapsCompleted}/${team.lapsRequired} laps)`
        )
      } else if (progressPercentage >= 75 && prevProgress < 75) {
        console.log(
          `🏔️ [Milestone] ${team.name} reached 75% of ${team.mountain?.name || 'mountain'} (${lapsCompleted}/${team.lapsRequired} laps)`
        )
      } else if (progressPercentage >= 100 && prevProgress < 100) {
        console.log(
          `🏆 [FINISHED] ${team.name} completed ${team.mountain?.name || 'mountain'}! (${lapsCompleted}/${team.lapsRequired} laps)`
        )
      }
    }

    return response.json({
      id: team.id,
      name: team.name,
      mountainName: team.mountain ? team.mountain.name : 'N/A',
      hillName: team.hill ? team.hill.name : 'N/A',
      elevationUnit: team.mountain?.elevationUnit,
      lapElevation: team.hill?.lapElevationGain ?? null,
      lapElevationUnit: team.hill?.elevationUnit,
      totalElevation: totalElevation,
      currentElevation: lapsCompleted ? currentElevation : null,

      lapsRequired: team.lapsRequired ?? 0,
      lapsCompleted: lapsCompleted || 0,
      lapsToGo: Math.max((team.lapsRequired || 0) - lapsCompleted, 0),

      progressPercentage: Math.min(progressPercentage, 100),
      lastUpdateTime,
      status,

      bestLap: bestLapTime,
      averageLapTime,
      timeElapsed,

      // Participants with fullName
      participants: team.participants.map((p) => ({
        ...p.toObject(),
        fullName: `${p.firstName} ${p.lastName}`,
      })),

      laps: completedLaps.map((lap, idx) => {
        return {
          lapNumber: idx + 1,
          startDateTime: lap.startDateTime,
          endDateTime: lap.endDateTime,
          duration: lap.lapDuration,
          completed: Boolean(lap.endDateTime),
        }
      }),
    })
  } catch (error) {
    console.error('Error fetching team progress:', error)
    response.status(500).json({ error: 'Failed to fetch team progress' })
  }
}

export const getLeaderboardEvents = async (request, response) => {
  const events = await Event.find({})
    .populate('location')
    .populate('mountains')
    .populate({
      path: 'teams',
      populate: { path: 'participants' },
    })

  response.json(events)
}

export const getLeaderboardImages = async (req, res) => {
  try {
    const eventId = req.params.eventId
    console.log(eventId)
    if (!eventId) {
      return res.status(400).json({ error: 'Event ID is required' })
    }

    const event = await Event.findById(eventId)
    if (!event) {
      return res.status(404).json({ error: 'Event not found' })
    }

    const images = await Image.find({ event: eventId })
    console.log(images)

    const sponsors = images.filter(img => img.type === 'sponsor')
    const charities = images.filter(img => img.type === 'charity')

    console.log(sponsors)
    return res.json({
      eventId,
      sponsors,
      charities,
    })
  } catch (error) {
    console.error('Error fetching sponsors:', error)
    return res.status(500).json({ error: 'Failed to fetch images' })
  }
}
