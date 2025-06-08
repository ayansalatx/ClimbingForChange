import express from 'express'
import asyncHandler from 'express-async-handler'
import { body, validationResult } from 'express-validator'

import { getEvents, saveOneEvent } from '../controllers/event.js'

const validateEvent = [
  body('eventName')
    .trim()
    .notEmpty().withMessage('eventName is required')
    .isLength({ min: 3 }).withMessage('eventName must be at least 3 characters'),

  body('location')
    .trim()
    .notEmpty().withMessage('location is required'),

  body('startDate')
    .notEmpty().withMessage('startDate is required')
    .isISO8601().withMessage('startDate must be a valid ISO 8601 date'),

  body('endDate')
    .notEmpty().withMessage('endDate is required')
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

  body('duration')
    .notEmpty().withMessage('duration is required')
    .isInt({ min: 1 }).withMessage('duration must be an integer ≥ 1'),

  body('lap')
    .optional()
    .isInt({ min: 1 }).withMessage('lap must be an integer ≥ 1'),

  body('active')
    .optional()
    .isBoolean().withMessage('active must be true or false'),
]

const checkEventValidation = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    // Return a 400 with a JSON listing all validation errors
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

const eventRoutes = express.Router()

eventRoutes.get('/', asyncHandler(getEvents))

eventRoutes.post('/', validateEvent, checkEventValidation, asyncHandler(saveOneEvent))

export default eventRoutes
