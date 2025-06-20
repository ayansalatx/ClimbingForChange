import Participant from '../models/participant.js'
import '../models/team.js' // registring the Team model for the populate to work
import Team from '../models/team.js'

export const getParticipants = async (req, response) => {
  const participants = await Participant.find({})
    .populate('teamId')

  response.json(participants)
}

export const getParticipantById = async (request, response) => {
  const id = request.params.id

  if (!id) {
    return response.status(400).json({ error: 'Participant id is missing' })
  }

  const participant = await Participant.findById(id)
    .populate('teamId')

  response.json(participant)
}

export const uploadParticipants = async (request, response) => {
  const body = request.body

  if (!body) {
    return response.status(400).json({ error: 'PArticipants to upload missing missing' })
  }
  
  console.log('🚀 ~ uploadParticipants ~ body:', body.length)
  response.status(200).send()
}

export const saveOneParticipant = async (request, response) => {
  const body = request.body

  if (!body) {
    return response.status(400).json({ error: 'content missing' })
  }

  // we need RFIDTag and Team as optional

  const newParticipantObject = {
    ...body,
  }

  const existingTeam = await Team.findById(body.teamId)

  // Attach the team id to this participant to assign them to that team.
  if (existingTeam) {
    newParticipantObject.teamId = existingTeam.id
  }

  const newParticipant = new Participant({
    ...newParticipantObject,
  })

  const savedParticipant = await newParticipant.save()

  response.status(201).json(savedParticipant)
}

export const updateOneParticipant = async (request, response) => {
  const id = request.params.id
  const body = request.body

  if (!id) {
    return response.status(400).json({ error: 'Participant is missing' })
  }

  const existingParticiapnt = await Participant.findById(id)

  if (!existingParticiapnt) {
    return response.status(400).json({ error: 'Participant is doesnt exist' })
  }

  const participantObjectToUpdate = {
    ...body,
  }

  const existingTeam = await Team.findById(participantObjectToUpdate.teamId)

  // Attach the team id to this participant to assign them to that team.
  if (existingTeam) {
    participantObjectToUpdate.teamId = existingTeam.id
  } else {
    // Remove them from that team as it doesn't exist anymore
    delete participantObjectToUpdate.teamId
  }

  const updated = await Participant.findByIdAndUpdate(
    participantObjectToUpdate.id,
    {
      $set: {
        firstName: participantObjectToUpdate.firstName,
        lastName: participantObjectToUpdate.lastName,
        teamId: participantObjectToUpdate.teamId,
        rfidTagId: participantObjectToUpdate.rfidTagId,
      },
    },
    {
      new: true,
    }
  )

  response.status(201).json(updated)
}

export const deleteOneParticipant = async (request, response) => {
  const id = request.params.id

  if (!id) {
    return response
      .status(400)
      .json({ error: 'Participant id to delete is missing' })
  }

  const existingParticiapnt = await Participant.findById(id)

  if (!existingParticiapnt) {
    return response.status(400).json({ error: 'Participant is doesnt exist' })
  }

  const updated = await Participant.findByIdAndUpdate(id)

  response.status(200).json(updated)
}
