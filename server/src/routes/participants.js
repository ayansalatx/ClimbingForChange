import express from 'express'
import asyncHandler from 'express-async-handler'

import { deleteOneParticipant, getParticipantById, getParticipants, saveOneParticipant, updateOneParticipant } from '../controllers/participant.js'

const participantRoutes = express.Router()

participantRoutes.get('/', asyncHandler(getParticipants))

participantRoutes.get('/:id', asyncHandler(getParticipantById))

participantRoutes.post('/', asyncHandler(saveOneParticipant))

participantRoutes.put('/', asyncHandler(updateOneParticipant))

participantRoutes.delete('/', asyncHandler(deleteOneParticipant))

export default participantRoutes
