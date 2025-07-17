import express from 'express'
import asyncHandler from 'express-async-handler'
import {
  getHills,
  saveOneHill,
  getHillById,
  updateOneHill,
  deleteOneHill,
} from '../controllers/hill.js'
import { checkValidation, validateHill } from '../middleware/validations.js'

const hillRoutes = express.Router()

hillRoutes.get('/', asyncHandler(getHills))

hillRoutes.post('/', validateHill, checkValidation, asyncHandler(saveOneHill))

hillRoutes.get('/:id', asyncHandler(getHillById))

hillRoutes.put(
  '/:id',
  validateHill,
  checkValidation,
  asyncHandler(updateOneHill)
)

hillRoutes.delete('/:id', asyncHandler(deleteOneHill))

export default hillRoutes
