import express from 'express'
import asyncHandler from 'express-async-handler'
import { body } from 'express-validator'
import { checkValidation } from './event.js'
import { getLaps, saveOneLap } from '../controllers/lap.js'

const lapRoutes = express.Router()

const validateLap = [
  body('teamId')
    .trim()
    .notEmpty().withMessage('Team is required'),

  body('participantId')
    .notEmpty().withMessage('Participant mountain or hill is required'),

  body('rfidTagId')
    .trim()
    .notEmpty().withMessage('RFIDTag is required')
    .isLength({ min: 3 }).withMessage('eventName must be at least 3 characters'),

  body('startDateTime')
    .notEmpty().withMessage('startDateTime is required')
    .isISO8601().withMessage('startDateTime must be a valid ISO 8601 date'),

  body('endDateTime')
    .notEmpty().withMessage('endDateTime is required')
    .isISO8601().withMessage('endDate must be a valid ISO 8601 date')
    .custom((value, { req }) => {
      // Ensure endDate ≥ startDate
      const startTime = new Date(req.body.startDateTime)
      const endTime = new Date(req.body.endDateTime)
      if (endTime < startTime) {
        throw new Error('End time must be after start time')
      }
      return true
    }),
]

lapRoutes.get('/', asyncHandler(getLaps))

lapRoutes.post('/', validateLap, checkValidation, asyncHandler(saveOneLap))

export default lapRoutes
