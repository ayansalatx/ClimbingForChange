import Participant from '../models/participant.js'

export const getParticipants = async(req, response) => {

  const participants = await Participant.find({})

  response.json(participants)
}

export const saveOneParticipant = async (request, response) => {

  const body = request.body

  if (!body) {
    return response.status(400).json({ error: 'content missing' })
  }

  const newParticipant = new Participant({
    lastName: body.lastName,
    firstName: body.firstName,
    subEvent: body.subEvent,
    teamName: body.teamName,
  })

  const savedParticipant = await newParticipant.save()

  response.json(savedParticipant)
}