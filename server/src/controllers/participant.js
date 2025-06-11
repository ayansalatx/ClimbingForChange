import Participant from '../models/participant.js'
import '../models/team.js'; // registring the Team model for the populate to work
import RFIDTag from '../models/rfidTag.js';
import Team from '../models/team.js';

export const getParticipants = async (req, response) => {

  const participants = await Participant.find({}).populate('rfidTagId').populate('teamId')

  response.json(participants)
}

export const saveOneParticipant = async (request, response) => {

  const body = request.body

  if (!body) {
    return response.status(400).json({ error: 'content missing' })
  }

  // we need RFIDTag and Team as optional

  const newParticipantObject = {
    ...body
  }

  const existingRFIDTag = await RFIDTag.findOne({
    serialNumber: body.rfidTagId
  })

  const existingTeam = await Team.findById(body.teamId)

  if (existingRFIDTag) {
    const participantWithThisRFIDTag = await Participant.findOne({
      rfidTagId: existingRFIDTag.id
    })

    if (participantWithThisRFIDTag) {
      return response.status(400).json({ error: "This RFIDTag is already assigned" })
    } else {
      newParticipantObject.rfidTagId = existingRFIDTag;
    }
  }

  if (existingTeam) {
    newParticipantObject.teamId = existingTeam.id
  }

  const newParticipant = new Participant({
    ...newParticipantObject
  })

  const savedParticipant = await newParticipant.save()

  response.status(201).json(savedParticipant)
}