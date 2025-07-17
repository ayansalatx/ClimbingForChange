import express from 'express'
import asyncHandler from 'express-async-handler'
import {
  getMountains,
  getMountainById,
  saveOneMountain,
  deleteOneMountain,
  updateOneMountain,
} from '../controllers/mountains.js'
import { checkValidation, validateMountain } from '../middleware/validations.js'

const mountainRoutes = express.Router()

mountainRoutes.get('/', asyncHandler(getMountains))

mountainRoutes.post(
  '/',
  validateMountain,
  checkValidation,
  asyncHandler(saveOneMountain),
)

mountainRoutes.get('/:id', asyncHandler(getMountainById))

mountainRoutes.put(
  '/:id',
  validateMountain,
  checkValidation,
  asyncHandler(updateOneMountain),
)

mountainRoutes.delete('/:id', asyncHandler(deleteOneMountain))

export default mountainRoutes
