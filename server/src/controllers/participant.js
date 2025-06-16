import Participant from '../models/participant.js'
import '../models/team.js' // registring the Team model for the populate to work
import RFIDTag from '../models/rfidTag.js'
import Team from '../models/team.js'

export const getParticipants = async (req, response) => {
  const participants = await Participant.find({})
    .populate('rfidTagId')
    .populate('teamId')
    .populate({
      path: 'participants',
      populate: { path: 'laps' },
    })

  response.json(participants)
}

export const getParticipantById = async (request, response) => {
  const id = request.params.id

  if (!id) {
    return response.status(400).json({ error: 'Participant id is missing' })
  }

  const participant = await Participant.findById(id)
    .populate('rfidTagId')
    .populate('teamId')

  response.json(participant)
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

  const existingRFIDTag = await RFIDTag.findOne({
    serialNumber: body.rfidTagId,
  })

  const existingTeam = await Team.findById(body.teamId)

  if (existingRFIDTag) {
    const participantWithThisRFIDTag = await Participant.findOne({
      rfidTagId: existingRFIDTag.id,
    })

    // This RFIDTag already exists and is assigned to another person
    if (participantWithThisRFIDTag) {
      return response
        .status(400)
        .json({ error: 'This RFIDTag is already assigned' })
    } else {
      newParticipantObject.rfidTagId = existingRFIDTag
    }
  }

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
  const body = request.body

  if (!body) {
    return response.status(400).json({ error: 'Participant is missing' })
  }

  const participantObjectToUpdate = {
    ...body,
  }

  const existingRFIDTag = await RFIDTag.findById(
    participantObjectToUpdate.rfidTagId
  )

  const existingTeam = await Team.findById(participantObjectToUpdate.teamId)

  if (existingRFIDTag) {
    const participantWithThisRFIDTag = await Participant.findOne({
      rfidTagId: existingRFIDTag.id,
    })
    console.log(
      '🚀 ~ updateOneParticipant ~ participantWithThisRFIDTag:',
      participantWithThisRFIDTag
    )

    if (participantWithThisRFIDTag.id !== participantObjectToUpdate.id) {
      return response
        .status(400)
        .json({
          error: 'This RFIDTag is already assigned to a different person.',
        })
    } else {
      participantObjectToUpdate.rfidTagId = existingRFIDTag.id
    }
  }

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
  const participantIdToDelete = request.body.id

  if (!participantIdToDelete) {
    return response
      .status(400)
      .json({ error: 'Participant id to delete is missing' })
  }

  const updated = await Participant.findByIdAndUpdate(
    participantIdToDelete,
    {
      $set: {
        active: false,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  )

  response.status(200).json(updated)
}
