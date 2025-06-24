import express from 'express'
import asyncHandler from 'express-async-handler'
import { deleteOneTeam, getAllTeams, getTeamById, saveOneTeam, updateOneTeam } from '../controllers/team.js'
import { checkValidation, validateTeam } from '../middleware/validations.js'

const teamsRoutes = express.Router()


teamsRoutes.get('/', asyncHandler(getAllTeams))

teamsRoutes.get('/:id', asyncHandler(getTeamById))

teamsRoutes.post('/', validateTeam, checkValidation, asyncHandler(saveOneTeam))

teamsRoutes.put('/:id', validateTeam, checkValidation, asyncHandler(updateOneTeam))

teamsRoutes.delete('/:id', asyncHandler(deleteOneTeam))


export default teamsRoutes