import express from 'express'
import { getLeaderboard, getTeamProgress } from '../controllers/leaderboard.js'

const router = express.Router()

router.get('/', getLeaderboard)

router.get('/team/:teamId', getTeamProgress)

export default router
