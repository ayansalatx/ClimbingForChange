import express from 'express'
import { getLeaderboard, getTeamProgress, getLeaderboardEvents, getLeaderboardImages, runSimulation } from '../controllers/leaderboard.js'

const router = express.Router()

router.get('/', getLeaderboard)

router.get('/team/:teamId', getTeamProgress)

router.get('/events', getLeaderboardEvents)

router.get('/images/:eventId', getLeaderboardImages)

router.get('/simulate/:eventId', runSimulation)

export default router
