import express from 'express'
import asyncHandler from 'express-async-handler'
import { body, validationResult } from 'express-validator'

import { deleteOneEvent, getEventByID, getDisplayEvent, getEvents, saveOneEvent, updateOneEvent } from '../controllers/event.js'

const validateEvent = [
  body('locationId')
    .trim()
    .notEmpty().withMessage('location is required'),

  body('physicalMountainIds')
    .notEmpty().withMessage('Physical mountain or hill is required'),

  body('name')
    .trim()
    .notEmpty().withMessage('eventName is required')
    .isLength({ min: 3 }).withMessage('eventName must be at least 3 characters'),

  body('startDateTime')
    .notEmpty().withMessage('startDateTime is required')
    .isISO8601().withMessage('startDateTime must be a valid ISO 8601 date'),

  body('endDateTime')
    .notEmpty().withMessage('endDateTime is required')
    .isISO8601().withMessage('endDate must be a valid ISO 8601 date')
    .custom((value, { req }) => {
      // Ensure endDate ≥ startDate
      const start = new Date(req.body.startDate)
      const end = new Date(value)
      if (end < start) {
        throw new Error('endDate must be the same or after startDate')
      }
      return true
    }),

  body('active')
    .optional()
    .isBoolean().withMessage('active must be true or false'),
]

export const checkValidation = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    // Return a 400 with a JSON listing all validation errors
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

const eventRoutes = express.Router()

eventRoutes.get('/', asyncHandler(getEvents))

eventRoutes.get('/:id', asyncHandler(getEventByID))
eventRoutes.get('/display', asyncHandler(getDisplayEvent))

eventRoutes.post('/', validateEvent, checkValidation, asyncHandler(saveOneEvent))

eventRoutes.put('/', validateEvent, checkValidation, asyncHandler(updateOneEvent))

eventRoutes.delete('/', asyncHandler(deleteOneEvent))

export default eventRoutes
