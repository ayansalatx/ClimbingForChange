import express from 'express'
import asyncHandler from 'express-async-handler'
import {
    getHills,
    saveOneHill,
    getHillById,
    updateOneHill,
    deleteOneHill,
} from '../controllers/hill.js'
import { checkValidation } from './event.js'
import { body } from 'express-validator'

const validateHill = [
    body('name').trim().notEmpty().withMessage('Physical mountain name is required'),

    body('lapElevationGain')
        .notEmpty()
        .withMessage('Elevation per lap is required'),

    body('lapDistance')
        .notEmpty()
        .withMessage('Elevation per lap is required'),

    body('lapDistance')
        .notEmpty()
        .withMessage('Elevation per lap is required'),

    body('active')
        .optional()
        .isBoolean()
        .withMessage('active must be true or false'),
]

const hillRoutes = express.Router()

hillRoutes.get('/', asyncHandler(getHills))

hillRoutes.post('/', validateHill, checkValidation, asyncHandler(saveOneHill))

hillRoutes.get('/:id', asyncHandler(getHillById))

hillRoutes.put('/:id', validateHill, checkValidation, asyncHandler(updateOneHill))

hillRoutes.delete('/:id', asyncHandler(deleteOneHill))



export default hillRoutes