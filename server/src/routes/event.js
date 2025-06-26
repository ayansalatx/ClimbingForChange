import express from 'express'
import asyncHandler from 'express-async-handler'

import {
  deleteOneEvent,
  getEventByID,
  getEvents,
  saveOneEvent,
  updateOneEvent,
} from '../controllers/event.js'
import { checkValidation, validateEvent } from '../middleware/validations.js'

const eventRoutes = express.Router()

eventRoutes.get('/', asyncHandler(getEvents))

eventRoutes.get('/:id', asyncHandler(getEventByID))

eventRoutes.post(
  '/',
  validateEvent,
  checkValidation,
  asyncHandler(saveOneEvent)
)

eventRoutes.put(
  '/:id',
  validateEvent,
  checkValidation,
  asyncHandler(updateOneEvent)
)

eventRoutes.delete('/:id', asyncHandler(deleteOneEvent))

export default eventRoutes
