import express from 'express'
import asyncHandler from 'express-async-handler'
import { getAllTeams, saveOneTeam } from '../controllers/team.js'
import { body } from 'express-validator'
import { checkValidation } from './event.js'

const teamsRoutes = express.Router()

const validateTeam = [
  body('name')
    .trim()
    .notEmpty().withMessage('name is required'),
]

teamsRoutes.get('/', asyncHandler(getAllTeams))

teamsRoutes.post('/', validateTeam, checkValidation, asyncHandler(saveOneTeam))

export default teamsRoutes