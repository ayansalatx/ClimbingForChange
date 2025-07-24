import Lap from '../models/lap.js'
import Team from '../models/team.js'
import { createLapAndEmitStats } from '../services/lapService.js'

export const getLaps = async (req, response) => {
  const mountains = await Lap.find({})
    .populate('teamId')
    .populate('participantId')
    .populate('rfidTagId')

  response.json(mountains)
}

export const saveOneLap = async (request, response) => {
  const body = request.body
  try {
    const io = request.app.get('io')
    const savedLap = await createLapAndEmitStats(body, io)
    response.status(201).json(savedLap)
  } catch (err) {
    response.status(400).json({ error: err.message })
  }
}
