import express from 'express'
import asyncHandler from 'express-async-handler'

import { deleteOneParticipant, getParticipantById, getParticipants, saveOneParticipant, updateOneParticipant, uploadParticipants } from '../controllers/participant.js'
import { checkValidation, validateParticipant } from '../middleware/validations.js'

const participantRoutes = express.Router()

participantRoutes.get('/', asyncHandler(getParticipants))

participantRoutes.get('/:id', asyncHandler(getParticipantById))

participantRoutes.post('/', validateParticipant, checkValidation, asyncHandler(saveOneParticipant))

participantRoutes.post('/upload', asyncHandler(uploadParticipants))

participantRoutes.put('/:id', asyncHandler(updateOneParticipant))

participantRoutes.delete('/:id', asyncHandler(deleteOneParticipant))

export default participantRoutes
