import express from 'express'
import path from 'path'
import csv from 'csvtojson'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import Team from '../models/team.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const router = express.Router()

// --- Configuration ---
const LAP_TIME_VARIATION = 0.2

// --- Data Storage ---
let allSimulatedPassings = []
let nextPassingIndex = 0

const loadCsv = async (filePath) => {
  try {
    const jsonArray = await csv().fromFile(filePath)
    console.log(
      `[Mock] Loaded ${jsonArray.length} rows from ${path.basename(filePath)}`,
    )
    return jsonArray
  }
  catch (error) {
    console.error(`[Mock] Error loading CSV from ${filePath}:`, error)
    throw error
  }
}

const generateFullPassingHistory = async (
  participantsData,
  overallResultsData,
) => {
  const passings = []
  const simulatedEventStartTime = new Date()

  // Get all teams from database to map bib numbers to lapsRequired
  const teams = await Team.find({}).populate('rfidTag', 'serialNumber')
  const bibToTeamMap = new Map()

  teams.forEach((team) => {
    if (team.rfidTag && team.rfidTag.serialNumber) {
      bibToTeamMap.set(team.rfidTag.serialNumber, team)
    }
  })

  console.log(`[Mock] Mapped ${bibToTeamMap.size} teams for passing generation`)

  // Track lap requirements by mountain
  const mountainLapCounts = new Map()

  for (const result of overallResultsData) {
    const bib = result.Bib
    const chipTimeStr = result.ChipTime
    const status = result.Place

    if (status === 'DNS' || !chipTimeStr) {
      continue
    }

    const team = bibToTeamMap.get(bib)
    const lapsRequired = team ? team.lapsRequired : 10 // Default to 10 if team not found

    // Track mountain lap counts
    if (team && team.mountain) {
      const mountainName = team.mountain.name || 'Unknown'
      mountainLapCounts.set(
        mountainName,
        (mountainLapCounts.get(mountainName) || 0) + 1,
      )
    }

    const simulatedStartTime = new Date(simulatedEventStartTime.getTime())
    passings.push({
      Code: bib,
      LoopID: 1,
      RealTime: simulatedStartTime.toISOString(),
      PassingNo: 1,
      RunTime: 0,
      FileNo: 1,
    })

    if (status === 'DNF') {
      continue
    }

    const chipTimeParts = chipTimeStr.split(':').map(Number)
    let totalChipTimeMs
    if (chipTimeParts.length === 3) {
      totalChipTimeMs
        = (chipTimeParts[0] * 3600 + chipTimeParts[1] * 60 + chipTimeParts[2])
          * 1000
    }
    else {
      // Handles MM:SS format
      totalChipTimeMs = (chipTimeParts[0] * 60 + chipTimeParts[1]) * 1000
    }

    const averageLapTimeMs = totalChipTimeMs / lapsRequired
    let cumulativeTimeMs = 0

    for (let lapNum = 1; lapNum <= lapsRequired; lapNum++) {
      const variation = (Math.random() - 0.5) * LAP_TIME_VARIATION
      let currentLapTimeMs = Math.round(averageLapTimeMs * (1 + variation))
      currentLapTimeMs = Math.max(currentLapTimeMs, 10000) // Minimum 10 seconds per lap

      if (lapNum === lapsRequired) {
        currentLapTimeMs = totalChipTimeMs - cumulativeTimeMs
        // Ensure the last lap isn't negative if variations were extreme
        currentLapTimeMs = Math.max(currentLapTimeMs, 10000)
      }

      cumulativeTimeMs += currentLapTimeMs
      const lapPassingTime = new Date(
        simulatedStartTime.getTime() + cumulativeTimeMs,
      )

      passings.push({
        Code: bib,
        LoopID: 2,
        RealTime: lapPassingTime.toISOString(),
        PassingNo: lapNum,
        RunTime: cumulativeTimeMs,
        FileNo: 1,
      })
    }
  }

  // Log mountain lap requirement summary
  console.log('[Mock] Mountain lap requirements:')
  for (const [mountain, count] of mountainLapCounts) {
    const team = teams.find(t => t.mountain?.name === mountain)
    const lapsRequired = team ? team.lapsRequired : 'Unknown'
    console.log(`  - ${mountain}: ${count} teams, ${lapsRequired} laps each`)
  }

  passings.sort((a, b) => new Date(a.RealTime) - new Date(b.RealTime))
  console.log(
    `[Mock] Generated ${passings.length} simulated passings for ${bibToTeamMap.size} teams`,
  )
  return passings
}

const initializeMockData = async () => {
  try {
    console.log('[Mock] Starting mock data initialization...')
    const participants = await loadCsv(
      path.join(__dirname, 'data', 'Sample_Participant_list.csv'),
    )
    const overallResults = await loadCsv(
      path.join(__dirname, 'data', 'Sample_results.csv'),
    )

    console.log(
      '[Mock] CSV files loaded successfully. Generating passing history...',
    )
    allSimulatedPassings = await generateFullPassingHistory(
      participants,
      overallResults,
    )

    console.log(
      `[Mock] Setting up simulation timer. Total passings: ${allSimulatedPassings.length}`,
    )
    setInterval(() => {
      if (nextPassingIndex < allSimulatedPassings.length) {
        const passingsToRelease = Math.floor(Math.random() * 5) + 3
        nextPassingIndex = Math.min(
          nextPassingIndex + passingsToRelease,
          allSimulatedPassings.length,
        )

        // Only log every 10 releases or when reaching milestones
        if (
          nextPassingIndex % 50 === 0
          || nextPassingIndex === allSimulatedPassings.length
        ) {
          const progress = (
            (nextPassingIndex / allSimulatedPassings.length)
            * 100
          ).toFixed(1)
          console.log(
            `[Mock] Progress: ${progress}% (${nextPassingIndex}/${allSimulatedPassings.length} passings released)`,
          )
        }
      }
    }, 2000)

    console.log('[Mock] Data loaded and simulation timer started.')
  }
  catch (error) {
    console.error('[Mock] Fatal error loading mock data:', error)
  }
}

router.get('/getpassings', (req, res) => {
  const eventId = req.query.eventId
  let filteredPassings = allSimulatedPassings

  // If eventId is provided, filter passings for teams in that event
  if (eventId) {
    // const Team = require('../models/team.js').default
    // const mongoose = require('mongoose')
    Team.find({ event: eventId }).populate('rfidTag').then((teams) => {
      const bibs = teams.map(t => t.rfidTag && t.rfidTag.serialNumber).filter(Boolean)
      filteredPassings = allSimulatedPassings.filter(p => bibs.includes(p.Code))
      return sendFilteredPassings(req, res, filteredPassings)
    })
    return
  }
  return sendFilteredPassings(req, res, filteredPassings)
})

function sendFilteredPassings(req, res, filteredPassings) {
  const all = req.query.all === 'true'
  if (all) {
    return res.json({
      passings: filteredPassings,
      lastIndex: filteredPassings.length,
    })
  }
  const fromFile = req.query.fromFile ? parseInt(req.query.fromFile, 10) : 1
  const fromDetection = req.query.fromDetection ? parseInt(req.query.fromDetection, 10) : 1
  const amount = req.query.amount ? parseInt(req.query.amount, 10) : 1000
  let filtered = filteredPassings.filter((p) => {
    if (p.FileNo > fromFile) return true
    if (p.FileNo === fromFile && p.PassingNo >= fromDetection) return true
    return false
  })
  filtered = filtered.slice(0, amount)
  const lastIndex = filtered.length > 0 ? allSimulatedPassings.indexOf(filtered[filtered.length - 1]) + 1 : 0
  res.json({
    passings: filtered,
    lastIndex: lastIndex,
  })
}

export { router as mockRouter, initializeMockData }
