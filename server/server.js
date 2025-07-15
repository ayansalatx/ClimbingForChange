import http from 'http'
import app from './app.js'
import config from './src/utils/config.js'
import connectDB from './src/utils/db.js'
import { initializeServerState } from './src/utils/serverState.js'

const startServer = async () => {
  await connectDB()

  const server = http.createServer(app)
  server.listen(config.PORT, () => {
    console.log(`Server started on port ${config.PORT}`)
    initializeServerState()
  })
}

startServer()