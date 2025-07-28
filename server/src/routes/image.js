import express from 'express'
import asyncHandler from 'express-async-handler'
import { checkValidation, validateImage } from '../middleware/validations.js'
import { getAllImages, saveOneImage, getImageById, updateOneImage, deleteOneImage } from '../controllers/image.js'

const imageRoutes = express.Router()

imageRoutes.get('/', asyncHandler(getAllImages))

imageRoutes.post('/', validateImage, checkValidation, asyncHandler(saveOneImage))

imageRoutes.get('/:id', asyncHandler(getImageById))

imageRoutes.put(
  '/:id',
  validateImage,
  checkValidation,
  asyncHandler(updateOneImage),
)

imageRoutes.delete('/:id', asyncHandler(deleteOneImage))

export default imageRoutes
