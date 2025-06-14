import express from 'express'
import asyncHandler from 'express-async-handler'
import { getPhysicalMountains, getTargetMountains, getTargetMountainById, saveOnePhysicalMountain, saveOneTargetMountain } from '../controllers/mountains.js'

const mountainRoutes = express.Router()

mountainRoutes.get('/physical', asyncHandler(getPhysicalMountains))

mountainRoutes.post('/physical', asyncHandler(saveOnePhysicalMountain))

mountainRoutes.get('/target', asyncHandler(getTargetMountains))

mountainRoutes.get(`/target/:id`, asyncHandler(getTargetMountainById))

mountainRoutes.post('/target', asyncHandler(saveOneTargetMountain))

export default mountainRoutes