import express from 'express'
import { getLeaderboard, getTeamProgress, getLeaderboardEvents } from '../controllers/leaderboard.js'
import { triggerLapSimulation } from '../utils/serverState.js'
import config from '../utils/config.js'

const router = express.Router()

router.get('/', getLeaderboard)

router.get('/team/:teamId', getTeamProgress)

router.get('/events', getLeaderboardEvents)

// POST /simulate/reload-passings
router.post('/simulate/reload-passings', async (req, res) => {
  if (config.API_MODE !== 'mock') {
    return res.status(403).json({ error: 'Not allowed in production.' })
  }
  const result = await triggerLapSimulation()
  if (result.success) {
    res.json({ message: 'Simulated passings reloaded and processed.', processed: result.processed })
  } else {
    res.status(500).json({ error: result.error })
  }
})

// POST /simulate/reload-passings-for-team
router.post('/simulate/reload-passings-for-team', async (req, res) => {
  if (config.API_MODE !== 'mock') {
    return res.status(403).json({ error: 'Not allowed in production.' })
  }
  const { teamId } = req.body
  if (!teamId) {
    return res.status(400).json({ error: 'Missing teamId in request body.' })
  }
  const result = await triggerLapSimulation(teamId)
  if (result.success) {
    res.json({ message: 'Simulated passings reloaded and processed for team.', processed: result.processed })
  } else {
    res.status(500).json({ error: result.error })
  }
})

export default router
