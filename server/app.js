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
import rfidtagRoutes from './src/routes/rfidtag.js'
import teamsRoutes from './src/routes/team.js'
import lapRoutes from './src/routes/lap.js'

const app = express()
const openapiDoc = YAML.load('./openapi.yaml')

const corsOptions = {
  origin: function (origin, callback) {
    const allowed = /localhost:\d{4}$/.test(origin) || /\.onrender\.com$/.test(origin);

    if (allowed || !origin) {
      callback(null, true);
    } else {
      callback(new Error('This origin is not allowed by CORS'));
    }
  },
  credentials: true, 
  optionsSuccessStatus: 200
};

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
appRouter.use('/rfidtags', rfidtagRoutes)
appRouter.use('/teams', teamsRoutes)
appRouter.use('/laps', lapRoutes)

app.use('/api', appRouter)

app.use(errorHandler)

export default app