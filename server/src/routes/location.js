import express from 'express'
import asyncHandler from 'express-async-handler'
import { getLocations, saveOneLocation } from '../controllers/location.js'

const locationRoutes = express.Router()

locationRoutes.get('/', asyncHandler(getLocations))

locationRoutes.post('/', asyncHandler(saveOneLocation))

export default locationRoutes