import express, { json } from 'express'
import cors from 'cors'

import participantRoutes from './src/routes/participants.js'
import { requestLogger, tokenExtractor } from './src/utils/middleware.js'
import eventRoutes from './src/routes/event.js'
import locationRoutes from './src/routes/location.js'
import mountainRoutes from './src/routes/mountain.js'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import { errorHandler } from './src/error.js'
import rfidtagRoutes from './src/routes/rfidtag.js'
import teamsRoutes from './src/routes/team.js'
import lapRoutes from './src/routes/lap.js'
import hillRoutes from './src/routes/hill.js'
import uploadCSVRoutes from './src/routes/uploadCSV.js'
import authRoutes from './src/routes/auth.js'

import { mockRouter } from './src/mock/mock.router.js'
import config from './src/utils/config.js'
import leaderboardRoutes from './src/routes/leaderboard.js'
import { pollForNewData } from './src/utils/serverState.js'

const app = express()
const openapiDoc = YAML.load('./openapi.yaml')

app.use(cors())

app.use(express.static('public'))

app.use(json())

app.use(requestLogger)

app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(openapiDoc))

if (config.API_MODE === 'mock') {
  console.log('Server is starting in MOCK API mode.')
  app.use('/mock-api', mockRouter)
}

app.use('/api/leaderboard', leaderboardRoutes)

app.use('/api/auth', authRoutes)

const authenticatedApiRouter = express.Router()

authenticatedApiRouter.use(tokenExtractor)

authenticatedApiRouter.use('/participants', participantRoutes)
authenticatedApiRouter.use('/events', eventRoutes)
authenticatedApiRouter.use('/locations', locationRoutes)
authenticatedApiRouter.use('/mountains', mountainRoutes)
authenticatedApiRouter.use('/hills', hillRoutes)
authenticatedApiRouter.use('/rfidtags', rfidtagRoutes)
authenticatedApiRouter.use('/teams', teamsRoutes)
authenticatedApiRouter.use('/laps', lapRoutes)
authenticatedApiRouter.use('/upload-csv', uploadCSVRoutes)

app.use('/api', authenticatedApiRouter)

app.use(errorHandler)

if (process.env.NODE_ENV !== 'test') {
  setTimeout(() => {
    setInterval(pollForNewData, 5000) 
  }, 2000) 
}

export default app