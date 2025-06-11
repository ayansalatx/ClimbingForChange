import express, { json } from 'express'
import cors from 'cors'

import participantRoutes from './src/routes/participants.js'
import { requestLogger } from './src/utils/middleware.js'
import eventRoutes from './src/routes/event.js'
import locationRoutes from './src/routes/location.js'
import mountainRoutes from './src/routes/mountain.js'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import { errorHandler } from './src/error.js'
import rfiftagRoutes from './src/routes/rfidtag.js'
import teamsRoutes from './src/routes/team.js'

const app = express()
const openapiDoc = YAML.load('./openapi.yaml')

app.use(cors())

app.use(express.static('public'))

app.use(json())

app.use(requestLogger)

const appRouter = express.Router()

app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(openapiDoc))

appRouter.use('/participants', participantRoutes)
appRouter.use('/events', eventRoutes)
appRouter.use('/locations', locationRoutes)
appRouter.use('/mountains', mountainRoutes)
appRouter.use('/rfidtag', rfiftagRoutes)
appRouter.use('/teams', teamsRoutes)

app.use('/api', appRouter)

app.use(errorHandler)

export default app