import http from 'http'
import { Server } from 'socket.io'
import app from './app.js'
import config from './src/utils/config.js'
import connectDB from './src/utils/db.js'
import mongoose from 'mongoose'
import { initializeServerState } from './src/utils/serverState.js'
import LapChangeWatcher from './src/sockets/lapWatcher.js'

const startServer = async () => {
  await connectDB()

  const server = http.createServer(app)

  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET'],
    },
  })

  server.listen(config.PORT, () => {
    console.log(`Server started on port ${config.PORT}`)
    initializeServerState()

    mongoose.connection.once('open', () => {
      const db = mongoose.connection.db
      LapChangeWatcher(io, db)
    })
  })
}

startServer()
