import express, { json } from 'express'
import cors from "cors"

import participantRoutes from './routes/participants.js'
import { requestLogger } from './utils/middleware.js'

const app = express()

app.use(cors())

app.use(express.static('dist'))

app.use(requestLogger)

app.use(json())

const appRouter = express.Router();

appRouter.use('/participants', participantRoutes)

app.use("/api", appRouter)

export default app;