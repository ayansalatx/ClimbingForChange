import express from 'express'
import asyncHandler from 'express-async-handler'
import {
  deleteOneLocation,
  getLocationById,
  getLocations,
  saveOneLocation,
  updateOneLocation,
} from '../controllers/location.js'

const locationRoutes = express.Router()

locationRoutes.get('/', asyncHandler(getLocations))

locationRoutes.get('/:id', asyncHandler(getLocationById))

locationRoutes.post('/', asyncHandler(saveOneLocation))

locationRoutes.put('/:id', asyncHandler(updateOneLocation))

locationRoutes.delete('/:id', asyncHandler(deleteOneLocation))

export default locationRoutes
