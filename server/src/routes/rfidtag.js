import express from 'express'
import asyncHandler from 'express-async-handler'
import { deleteOneRFIDTag, getBySerialNumber, getRFIDTagByID, getRFIDTags, saveOneRFIDTag, updateOneRFIDTag } from '../controllers/rfidtag.js'

const rfidtagRoutes = express.Router()

rfidtagRoutes.get('/', asyncHandler(getRFIDTags))

rfidtagRoutes.get('/:id', asyncHandler(getRFIDTagByID))

rfidtagRoutes.get('/:serialNumber', asyncHandler(getBySerialNumber))

rfidtagRoutes.post('/', asyncHandler(saveOneRFIDTag))

rfidtagRoutes.put('/:id', asyncHandler(updateOneRFIDTag))

rfidtagRoutes.delete('/:id', asyncHandler(deleteOneRFIDTag))

export default rfidtagRoutes