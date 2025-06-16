import express from 'express'
import asyncHandler from 'express-async-handler'
import { deleteOneParticipant, getParticipantById, getParticipantsByTeam, getParticipants, saveOneParticipant, updateOneParticipant } from '../controllers/participant.js'
import teamsRoutes from './team.js'

const participantRoutes = express.Router()

participantRoutes.get('/', asyncHandler(getParticipants))

participantRoutes.get('/:id', asyncHandler(getParticipantById))
teamsRoutes.get(`/:teamId/participants`, getParticipantsByTeam)

participantRoutes.post('/', asyncHandler(saveOneParticipant))

participantRoutes.put('/', asyncHandler(updateOneParticipant))

participantRoutes.delete('/', asyncHandler(deleteOneParticipant))

export default participantRoutes
