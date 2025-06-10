import express from 'express'
import asyncHandler from 'express-async-handler'
import { getPhysicalMountain, getTargetMountain, saveOnePhysicalMountain, saveOneTargetMountain } from '../controllers/mountains.js'

const mountainRoutes = express.Router()

mountainRoutes.get('/physical', asyncHandler(getPhysicalMountain))

mountainRoutes.post('/physical', asyncHandler(saveOnePhysicalMountain))

mountainRoutes.get('/target', asyncHandler(getTargetMountain))

mountainRoutes.post('/target', asyncHandler(saveOneTargetMountain))

export default mountainRoutes