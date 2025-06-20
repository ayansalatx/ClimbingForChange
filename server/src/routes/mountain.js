import express from 'express'
import asyncHandler from 'express-async-handler'
import {  getMountains,
          getMountainById,
          saveOneMountain,
          deleteOneMountain, 
          updateOneMountain} from '../controllers/mountains.js'
import { checkValidation } from './event.js'
import { body } from 'express-validator'


const validateMountain = [
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

mountainRoutes.get('/', asyncHandler(getMountains))

mountainRoutes.post('/', validateMountain, checkValidation, asyncHandler(saveOneMountain))

mountainRoutes.get('/:id', asyncHandler(getMountainById))

mountainRoutes.put('/:id', validateMountain, checkValidation, asyncHandler(updateOneMountain))

mountainRoutes.delete('/:id', asyncHandler(deleteOneMountain))


export default mountainRoutes