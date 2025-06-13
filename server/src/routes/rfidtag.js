import express from 'express'
import asyncHandler from 'express-async-handler'
import { getRFIDTags, saveOneRFIDTag } from '../controllers/rfidtag.js'

const rfiftagRoutes = express.Router()

rfiftagRoutes.get('/', asyncHandler(getRFIDTags))

rfiftagRoutes.post('/', asyncHandler(saveOneRFIDTag))

export default rfiftagRoutes