import express from 'express'
import asyncHandler from 'express-async-handler'
import { getLaps, saveOneLap } from '../controllers/lap.js'
import { checkValidation, validateLap } from '../middleware/validations.js'

const lapRoutes = express.Router()

lapRoutes.get('/', asyncHandler(getLaps))

lapRoutes.post('/', validateLap, checkValidation, asyncHandler(saveOneLap))

export default lapRoutes
