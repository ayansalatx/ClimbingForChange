import express from 'express'
import asyncHandler from 'express-async-handler'
import { uploadCSV } from '../controllers/uploadCSV.js'
import multer from 'multer'

const uploadCSVRoutes = express.Router()
const upload = multer({ dest: 'temp/csv/' })

uploadCSVRoutes.post('/', upload.single('file'), asyncHandler(uploadCSV))

export default uploadCSVRoutes
