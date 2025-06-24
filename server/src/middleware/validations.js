import { body, validationResult } from 'express-validator'

export const validateEvent = [
  body('location').trim().notEmpty().withMessage('location is required'),

  // body('hills')
  //   .notEmpty()
  //   .withMessage('Physical mountain or hill is required'),

  // body('mountains')
  //   .notEmpty()
  //   .withMessage('Physical mountain or hill is required'),

  body('name')
    .trim()
    .notEmpty()
    .withMessage('eventName is required')
    .isLength({ min: 3 })
    .withMessage('eventName must be at least 3 characters'),

  body('startDateTime')
    .notEmpty()
    .withMessage('startDateTime is required')
    .isISO8601()
    .withMessage('startDateTime must be a valid ISO 8601 date'),

  body('endDateTime')
    .notEmpty()
    .withMessage('endDateTime is required')
    .isISO8601()
    .withMessage('endDate must be a valid ISO 8601 date')
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
    .isBoolean()
    .withMessage('active must be true or false'),
]

export const validateHill = [
  body('name').trim().notEmpty().withMessage('Physical mountain name is required'),

  body('lapElevationGain')
    .notEmpty()
    .withMessage('lapElevationGain per lap is required'),

  body('lapDistance')
    .notEmpty()
    .withMessage('lapDistance per lap is required'),

  body('location')
    .notEmpty()
    .withMessage('Location per lap is required'),

  body('active')
    .optional()
    .isBoolean()
    .withMessage('active must be true or false'),
]

export const validateLap = [
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

export const validateParticipant = [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
]

export const validateTeam = [
  body('name')
    .trim()
    .notEmpty().withMessage('Team name is required')
    .isLength({ min: 3 }).withMessage('Team name must be at least 3 characters'),

  // body('lapsRequired')
  //   .isInt({ min: 1})
  //   .withMessage('Lap must be a valid with a minimum of 1'),

  // body('totalDistanceRequired')
  //   .isInt({ min: 1})
  //   .withMessage('Lap must be a valid with a minimum of 1'),

  body('event')
    .trim()
    .notEmpty().withMessage('Event is required'),

  body('isSoloTeam')
    .isBoolean()
    .notEmpty().withMessage('Event is required'),

  body('hill')
    .trim()
    .notEmpty().withMessage('Hill is required'),

  body('mountain')
    .trim()
    .notEmpty().withMessage('Mountain is required'),

  body('startDateTime')
    .notEmpty().withMessage('startDateTime is required')
    .isISO8601().withMessage('startDateTime must be a valid ISO 8601 date'),
]

export const validateMountain = [
  body('name').trim().notEmpty().withMessage('Physical mountain name is required'),

  body('totalElevation')
    .notEmpty()
    .withMessage('Elevation per lap is required'),

  body('active')
    .optional()
    .isBoolean()
    .withMessage('active must be true or false'),
]

export const checkValidation = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    // Return a 400 with a JSON listing all validation errors
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}