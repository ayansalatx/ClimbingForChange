import express from 'express'
import asyncHandler from 'express-async-handler'
import { deleteOneRFIDTag, getBySerialNumber, getRFIDTags, saveOneRFIDTag, updateOneRFIDTag } from '../controllers/rfidtag.js'

const rfidtagRoutes = express.Router()

rfidtagRoutes.get('/', asyncHandler(getRFIDTags))

rfidtagRoutes.get('/:serialNumber', asyncHandler(getBySerialNumber))

rfidtagRoutes.post('/', asyncHandler(saveOneRFIDTag))

rfidtagRoutes.put('/', asyncHandler(updateOneRFIDTag))

rfidtagRoutes.delete('/', asyncHandler(deleteOneRFIDTag))

export default rfidtagRoutes