import express from 'express'
import asyncHandler from 'express-async-handler'
import { getAllTeams, saveOneTeam } from '../controllers/team.js'
import { body } from 'express-validator'
import { checkValidation } from './event.js'

const teamsRoutes = express.Router()

const validateTeam = [
  body('name')
    .trim()
    .notEmpty().withMessage('Team name is required')
    .isLength({ min: 3 }).withMessage('Team name must be at least 3 characters'),

  body('lapsRequired')
    .isInt({ min: 1})
    .withMessage('Lap must be a valid number between 1 and 120'),

  body('eventId')
    .trim()
    .notEmpty().withMessage('Event is required'),

  body('physicalMountainId')
    .trim()
    .notEmpty().withMessage('Physical mountain or Hill is required'),

  body('targetMountainId')
    .trim()
    .notEmpty().withMessage('Target mountain is required'),

  body('startDateTime')
    .notEmpty().withMessage('startDateTime is required')
    .isISO8601().withMessage('startDateTime must be a valid ISO 8601 date'),
]

teamsRoutes.get('/', asyncHandler(getAllTeams))

teamsRoutes.post('/', validateTeam, checkValidation, asyncHandler(saveOneTeam))

export default teamsRoutes