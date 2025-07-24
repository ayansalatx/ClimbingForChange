import mongoose from 'mongoose'
import Lap from '../models/lap.js'
import Team from '../models/team.js'
import Mountain from '../models/mountain.js'
import Hill from '../models/hill.js'

export default function LapChangeWatcher(io, db) {
  const lapsConnection = db.collection('laps')

  const lapChangeStream = lapsConnection.watch([], {
    fullDocument: 'updateLookup',
  })

  const transformId = (doc) => {
    return {
      ...doc,
      id: doc._id.toString(),
      teamId: doc.team?.id?.toString?.() || doc.team?.toString?.(),
    }
  }

  lapChangeStream.on('change', (change) => {
    if (change.fullDocument) {
      change.fullDocument = transformId(change.fullDocument)
    }
    if (change.documentKey) {
      change.documentKey._id = change.documentKey._id.toString()
    }

    io.emit('lapUpdate', change)
  })

  io.on('connection', (socket) => {
    socket.on('disconnect', () => {})
  })
}
