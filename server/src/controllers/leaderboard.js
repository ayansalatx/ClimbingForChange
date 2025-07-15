import { bibToTeamMap } from '../utils/serverState.js'

import Passing from '../models/passing.js'
import Lap from '../models/lap.js'
import Team from '../models/team.js'

async function processNewPassings(newPassings) {
  const START_LOOP_ID = 1
  const LAP_POINT_LOOP_ID = 2

  console.log(`[Processing] Processing ${newPassings.length} new passings...`)

  for (const passingData of newPassings) {
    const bib = passingData.Code
    const teamId = bibToTeamMap.get(bib)

    if (!teamId) {
      console.warn(`[Processing] Received passing for unmapped Bib: ${bib}. Skipping.`)
      continue
    }

    try {
      const existingPassing = await Passing.findOne({ Code: bib, LoopID: passingData.LoopID, PassingNo: passingData.PassingNo })
      if (existingPassing) {
        continue
      }

      const savedPassing = await Passing.create({ ...passingData, team: teamId })

      if (parseInt(savedPassing.LoopID) === LAP_POINT_LOOP_ID) {
        const lapJustCompleted = parseInt(savedPassing.PassingNo, 10)
        
        const existingLap = await Lap.findOne({ team: teamId, lapNumber: lapJustCompleted })
        if (existingLap) {
          continue
        }

        let lapStartTime
        if (lapJustCompleted === 1) {
          const startPassing = await Passing.findOne({ team: teamId, LoopID: START_LOOP_ID })
          if (!startPassing) {
            console.warn(`[Processing] Bib ${bib}: Start passing not found for lap 1, skipping.`)
            continue
          }
          lapStartTime = startPassing.RealTime
        } else {
          const previousLapPassing = await Passing.findOne({ team: teamId, LoopID: LAP_POINT_LOOP_ID, PassingNo: lapJustCompleted - 1 })
          if (!previousLapPassing) {
            console.warn(`[Processing] Bib ${bib}: Previous lap passing not found for lap ${lapJustCompleted}, skipping.`)
            continue
          }
          lapStartTime = previousLapPassing.RealTime
        }
        
        const lapEndTime = savedPassing.RealTime
        const lapDurationMs = lapEndTime.getTime() - lapStartTime.getTime()

        if (lapDurationMs < 0) {
          console.error(`[Processing] Bib ${bib}: Negative lap duration detected, skipping.`)
          continue
        }

        const team = await Team.findById(teamId)
        if (!team) {
          console.warn(`[Processing] Bib ${bib}: Team not found, skipping lap creation.`)
          continue
        }

        await Lap.create({
          team: teamId,
          rfidTag: team.rfidTag,
          startDateTime: lapStartTime,
          endDateTime: lapEndTime,
          lapDuration: lapDurationMs,
          lapNumber: lapJustCompleted
        })
        
        console.log(`✅ [Lap Recorded] Team ${team.name} (Bib: ${bib}) completed Lap ${lapJustCompleted} in ${(lapDurationMs / 1000).toFixed(1)}s`)
      }
    } catch (error) {
      if (error.code !== 11000) console.error(`[Processing Error] Bib ${bib}:`, error)
    }
  }
}

async function generateLeaderboard() {
  const teams = await Team.find({})
    .populate('mountain')
    .populate('hill')
    .populate('laps')

  // Get elevation gain from the first team's hill (all teams use the same hill)
  const elevationGainPerLap = teams.length > 0 && teams[0].hill ? teams[0].hill.lapElevationGain : 88.48

  const calculatedTeams = teams.map(team => {
    const lapsCompleted = team.laps ? team.laps.length : 0
    const totalElevation = lapsCompleted * elevationGainPerLap
    const progressPercentage = team.mountain ? (totalElevation / team.mountain.totalElevation) * 100 : 0
    
    let lastUpdateTime = team.startDateTime
    let bestLapTime = null
    let averageLapTime = null
    let totalTime = null
    if (lapsCompleted > 0) {
      const sortedLaps = [...team.laps].sort((a, b) => a.lapNumber - b.lapNumber)
      const lapDurations = sortedLaps.map(lap => lap.lapDuration)
      bestLapTime = Math.min(...lapDurations)
      averageLapTime = lapDurations.reduce((a, b) => a + b, 0) / lapDurations.length
      totalTime = sortedLaps[sortedLaps.length - 1].endDateTime - sortedLaps[0].startDateTime
      const lastLap = sortedLaps[sortedLaps.length - 1]
      lastUpdateTime = lastLap.endDateTime
    }

    let status = 'Not Started'
    if (lapsCompleted > 0) status = 'Running'
    if (progressPercentage >= 100) status = 'Finished'

    // Log progress milestones
    if (lapsCompleted > 0 && progressPercentage > 0) {
      const prevLaps = lapsCompleted - 1
      const prevProgress = prevLaps * elevationGainPerLap / (team.mountain ? team.mountain.totalElevation : 1) * 100
      
      // Log milestone achievements (25%, 50%, 75%, 100%)
      if (progressPercentage >= 25 && prevProgress < 25) {
        console.log(`🏔️ [Milestone] ${team.name} reached 25% of ${team.mountain?.name || 'mountain'} (${lapsCompleted}/${team.lapsRequired} laps)`)
      } else if (progressPercentage >= 50 && prevProgress < 50) {
        console.log(`🏔️ [Milestone] ${team.name} reached 50% of ${team.mountain?.name || 'mountain'} (${lapsCompleted}/${team.lapsRequired} laps)`)
      } else if (progressPercentage >= 75 && prevProgress < 75) {
        console.log(`🏔️ [Milestone] ${team.name} reached 75% of ${team.mountain?.name || 'mountain'} (${lapsCompleted}/${team.lapsRequired} laps)`)
      } else if (progressPercentage >= 100 && prevProgress < 100) {
        console.log(`🏆 [FINISHED] ${team.name} completed ${team.mountain?.name || 'mountain'}! (${lapsCompleted}/${team.lapsRequired} laps)`)
      }
    }

    return {
      id: team.id,
      name: team.name,
      mountainName: team.mountain ? team.mountain.name : 'N/A',
      hillName: team.hill ? team.hill.name : 'N/A',
      lapsCompleted,
      lapsRequired: team.lapsRequired || 0,
      totalElevation,
      progressPercentage: Math.min(progressPercentage, 100),
      lastUpdateTime,
      status,
      bestLapTime, // ms
      averageLapTime, // ms
      totalTime, // ms
    }
  })

  calculatedTeams.sort((a, b) => {
    if (a.status === 'Finished' && b.status !== 'Finished') return -1
    if (b.status === 'Finished' && a.status !== 'Finished') return 1
    if (a.status === 'Finished' && b.status === 'Finished') return new Date(a.lastUpdateTime) - new Date(b.lastUpdateTime)

    if (a.status === 'Running' && b.status !== 'Running') return -1
    if (b.status === 'Running' && a.status !== 'Running') return 1
    if (a.status === 'Running' && b.status === 'Running') {
      if (b.totalElevation !== a.totalElevation) return b.totalElevation - a.totalElevation
      return new Date(a.lastUpdateTime) - new Date(b.lastUpdateTime)
    }
    
    return 1
  })

  return calculatedTeams.map((team, index) => ({ ...team, rank: index + 1 }))
}

export { processNewPassings, generateLeaderboard }

export const getLeaderboard = async (req, res) => {
  try {
    const eventId = req.query.eventId
    const leaderboard = await generateLeaderboard(eventId)
    
    res.json({
      eventId: eventId || 'current',
      lastUpdated: new Date().toISOString(),
      teams: leaderboard
    })
  } catch (error) {
    console.error('Leaderboard API error:', error)
    res.status(500).json({ 
      error: 'Failed to generate leaderboard',
      message: error.message 
    })
  }
}