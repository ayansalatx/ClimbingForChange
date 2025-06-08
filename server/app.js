import express, { json } from 'express'
import cors from 'cors'

import participantRoutes from './routes/participants.js'
import { requestLogger } from './utils/middleware.js'
import eventRoutes from './routes/event.js'
import locationRoutes from './routes/location.js'
import mountainRoutes from './routes/mountain.js'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'

const app = express()
const openapiDoc = YAML.load('./openapi.yaml')

app.use(cors())

app.use(express.static('dist'))

app.use(requestLogger)

app.use(json())

const appRouter = express.Router()

app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(openapiDoc))

appRouter.use('/participants', participantRoutes)
appRouter.use('/events', eventRoutes)
appRouter.use('/locations', locationRoutes)
appRouter.use('/mountains', mountainRoutes)

app.use('/api', appRouter)

export default app