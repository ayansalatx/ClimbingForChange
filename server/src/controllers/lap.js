import Lap from '../models/lap.js'
import Team from '../models/team.js'
import Participant from '../models/participant.js'
import RFIDTag from '../models/rfidTag.js'

export const getLaps = async(req, response) => {

  const mountains = await Lap.find({})
    .populate('teamId')
    .populate('participantId')
    .populate('rfidTagId')

  response.json(mountains)
}

export const saveOneLap = async (request, response) => {

  const body = request.body

  if (!body) {
    return response.status(400).json({ error: 'Lap missing' })
  }

  const team = await Team.findById(body.teamId)
  const participant = await Participant.findById(body.participantId)
  const rfidTag = await RFIDTag.findById(body.rfidTagId)

  if (!team || !participant || !rfidTag) {
    return response.status(400).json({ error: 'Team, participant or rfidTag doesnt exists.' })
  }

  if (participant.teamId.toString() !== team.id) {
    return response.status(400).json({ error: `${participant.firstName + ' ' + participant.lastName} does not belong to team ${team.name}` })
  }

  if (rfidTag.id !== participant.rfidTagId.toString()) {
    return response.status(400).json({ error: `RFIDTag ${rfidTag.serialNumber} does not belongs to ${participant.firstName + ' ' + participant.lastName}` })
  }

  const newLap = new Lap({
    teamId: body.teamId,
    participantId: body.participantId,
    rfidTagId: body.rfidTagId,
    startDateTime: body.startDateTime,
    endDateTime: body.endDateTime,
  })

  const savedLap = await newLap.save()

  response.status(201).json(savedLap)
}