import express from 'express'
import asyncHandler from 'express-async-handler'
import { getLiveData } from '../controllers/liveData.js'

const liveDataRoutes = express.Router()

liveDataRoutes.get('/', asyncHandler(getLiveData))


export default liveDataRoutes
