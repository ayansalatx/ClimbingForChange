import express from 'express'
import { getLeaderboard, getTeamProgress, getLeaderboardEvents } from '../controllers/leaderboard.js'

const router = express.Router()

router.get('/', getLeaderboard)

router.get('/team/:teamId', getTeamProgress)

router.get('/events', getLeaderboardEvents)

export default router
