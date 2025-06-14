import express from 'express'
import asyncHandler from 'express-async-handler'
import { getParticipants, getParticipantsByTeam, saveOneParticipant } from '../controllers/participant.js'
import teamsRoutes from './team.js'

const participantRoutes = express.Router()

participantRoutes.get('/', asyncHandler(getParticipants))

teamsRoutes.get(`/:teamId/participants`, getParticipantsByTeam)

participantRoutes.post('/', asyncHandler(saveOneParticipant))

export default participantRoutes
