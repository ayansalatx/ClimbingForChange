import express from 'express'
import asyncHandler from 'express-async-handler'
import { deleteOneRFIDTag, getBySerialNumber, getRFIDTags, saveOneRFIDTag, updateOneRFIDTag } from '../controllers/rfidtag.js'

const rfiftagRoutes = express.Router()

rfiftagRoutes.get('/', asyncHandler(getRFIDTags))

rfiftagRoutes.get('/:serialNumber', asyncHandler(getBySerialNumber))

rfiftagRoutes.post('/', asyncHandler(saveOneRFIDTag))

rfiftagRoutes.put('/', asyncHandler(updateOneRFIDTag))

rfiftagRoutes.delete('/', asyncHandler(deleteOneRFIDTag))

export default rfiftagRoutes