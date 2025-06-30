import express from 'express'
import asyncHandler from 'express-async-handler'
import { loginUser } from '../controllers/auth.js'

const authRouter = express.Router()

authRouter.post('/', asyncHandler(loginUser))

export default authRouter
