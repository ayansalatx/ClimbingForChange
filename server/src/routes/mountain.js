import express from 'express'
import asyncHandler from 'express-async-handler'
import { getPhysicalMountains, getTargetMountains, getTargetMountainById, saveOnePhysicalMountain, saveOneTargetMountain, getPhysicalMountainById, updateOnePhysicalMountain, updateOneTargetMountain, deleteOnePhysicalMountain, deleteOneTargetMountain } from '../controllers/mountains.js'
import { checkValidation } from './event.js'
import { body } from 'express-validator'

const validatePhysicalMountain = [
  body('name').trim().notEmpty().withMessage('Physical mountain name is required'),

  body('elevationPerLap')
    .notEmpty()
    .withMessage('Elevation per lap is required'),

  body('active')
    .optional()
    .isBoolean()
    .withMessage('active must be true or false'),
]

const validateTargetMountain = [
  body('name').trim().notEmpty().withMessage('Physical mountain name is required'),

  body('totalElevation')
    .notEmpty()
    .withMessage('Elevation per lap is required'),

  body('active')
    .optional()
    .isBoolean()
    .withMessage('active must be true or false'),
]

const mountainRoutes = express.Router()

mountainRoutes.get('/physical', asyncHandler(getPhysicalMountains))

mountainRoutes.post('/physical', validatePhysicalMountain, checkValidation, asyncHandler(saveOnePhysicalMountain))

mountainRoutes.get('/physical/:id', asyncHandler(getPhysicalMountainById))

mountainRoutes.get('/target', asyncHandler(getTargetMountains))

mountainRoutes.post('/target', validateTargetMountain, checkValidation, asyncHandler(saveOneTargetMountain))

mountainRoutes.get('/target/:id', asyncHandler(getTargetMountainById))

mountainRoutes.put('/physical/:id', validatePhysicalMountain, checkValidation, asyncHandler(updateOnePhysicalMountain))

mountainRoutes.put('/target/:id', validateTargetMountain, checkValidation, asyncHandler(updateOneTargetMountain))

mountainRoutes.delete('/physical/:id', asyncHandler(deleteOnePhysicalMountain))

mountainRoutes.delete('/target/:id', asyncHandler(deleteOneTargetMountain))


export default mountainRoutes