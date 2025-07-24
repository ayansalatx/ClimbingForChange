import Team from '../models/team.js'
import Passing from '../models/passing.js'
import Lap from '../models/lap.js'
import config from './config.js'
import { initializeMockData } from '../mock/mock.router.js'
import { processNewPassings } from '../controllers/leaderboard.js'

export const bibToTeamMap = new Map()
let lastReceivedIndex = 0
let isPolling = false
let lastFileNo = 1
let lastPassingNo = 1
export const initializeServerState = async () => {
  console.log('Initializing server state...')

  // Delete all passings and laps on server start
  try {
    const passingsResult = await Passing.deleteMany({})
    const lapsResult = await Lap.deleteMany({})
    console.log(
      `[Startup] Deleted all passings. Deleted count: ${passingsResult.deletedCount}`,
    )
    console.log(
      `[Startup] Deleted all laps. Deleted count: ${lapsResult.deletedCount}`,
    )
  }
  catch (err) {
    console.error('[Startup] Failed to delete passings or laps:', err)
  }

  try {
    const teams = await Team.find({}).populate('rfidTag')
    teams.forEach((team) => {
      if (team.rfidTag) {
        bibToTeamMap.set(team.rfidTag.serialNumber, team._id)
        console.log(
          `[Initialization] Mapped bib ${team.rfidTag.serialNumber} (type: ${typeof team.rfidTag.serialNumber}) to team ${team._id}`,
        )
      }
    })
    console.log(
      `[Initialization] Bib-to-Team map created with ${bibToTeamMap.size} entries.`,
    )

    if (config.API_MODE === 'mock') {
      await initializeMockData()
    }

    console.log('Initialization complete. Starting continuous data polling...')
    setInterval(pollForNewData, 2000) // Poll every 5 seconds
  }
  catch (error) {
    console.error(
      'FATAL: Could not initialize server state. Polling will not start.',
      error,
    )
    process.exit(1)
  }
}

export async function pollForNewData() {
  // Skip polling in test environment
  if (process.env.NODE_ENV === 'test') {
    return
  }

  if (isPolling) {
    console.log('[Polling] Skipping poll - already processing data')
    return
  }
  isPolling = true

  try {
    if (process.env.API_MODE === 'mock') {
      console.log(
        `[Polling] Fetching passings from fileNo ${lastFileNo}, passingNo ${lastPassingNo}...`,
      )

      if (!config.PORT) {
        console.warn('[Polling] PORT is undefined, skipping HTTP polling.')
        return
      }

      const mockApiUrl = `http://localhost:${config.PORT}/mock-api/getpassings?fromFile=${lastFileNo}&fromDetection=${lastPassingNo}`
      const response = await fetch(mockApiUrl)
      const data = await response.json()

      if (data.passings && data.passings.length > 0) {
        console.log(
          `[Polling] Received ${data.passings.length} new passings. Processing...`,
        )
        await processNewPassings(data.passings)
        // Update cursor to the last passing returned
        const last = data.passings[data.passings.length - 1]
        lastFileNo = last.FileNo
        lastPassingNo = last.PassingNo + 1
      }
      else {
        console.log(
          `[Polling] No new passings available (lastIndex: ${data.lastIndex})`,
        )
      }
    }
  } finally {
    isPolling = false
  }
}

// Add a function to reset laps/passings and reprocess all simulated passings (for dev trigger)
export const triggerLapSimulation = async (teamId) => {
  console.log('[Dev Trigger] Resetting all laps and passings, and reprocessing simulated passings...')
  try {
    await Passing.deleteMany({})
    await Lap.deleteMany({})
    lastFileNo = 1
    lastPassingNo = 1
    if (process.env.API_MODE === 'mock') {
      let mockApiUrl = `http://localhost:${config.PORT}/mock-api/getpassings?fromFile=1&fromDetection=1&amount=1000000`
      if (teamId) {
        mockApiUrl += `&teamId=${teamId}`
      }
      const response = await fetch(mockApiUrl)
      const data = await response.json()
      if (data.passings && data.passings.length > 0) {
        await processNewPassings(data.passings)
        const last = data.passings[data.passings.length - 1]
        lastFileNo = last.FileNo
        lastPassingNo = last.PassingNo + 1
      }
      console.log(`[Dev Trigger] Processed ${data.passings?.length || 0} simulated passings.`)
    } else {
      console.warn('[Dev Trigger] Not in mock mode, skipping simulated passings processing.')
    }
    return { success: true, processed: lastFileNo }
  } catch (err) {
    console.error('[Dev Trigger] Failed to reset and process simulated passings:', err)
    return { success: false, error: err.message }
  }
}
