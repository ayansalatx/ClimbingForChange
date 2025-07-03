import express from 'express'
import asyncHandler from 'express-async-handler'
import { uploadCSV } from '../controllers/uploadCSV.js'

const uploadCSVRoutes = express.Router()

uploadCSVRoutes.post('/', asyncHandler(uploadCSV))

export default uploadCSVRoutes
