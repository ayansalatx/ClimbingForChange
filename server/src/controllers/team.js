import Event from '../models/event.js'
import Team from '../models/team.js'
import PhysicalMountain from '../models/physicalMountain.js'
import TargetMountainId from '../models/targetMountain.js'

export const getAllTeams = async (req, response) => {

  const mountains = await Team.find({}).populate('participants')

  response.json(mountains)
}

export const saveOneTeam = async (request, response) => {

  const body = request.body

  if (!body) {
    return response.status(400).json({ error: 'Team missing' })
  }

  const event = await Event.findById(body.eventId)
  const physicalMountain = await PhysicalMountain.findById(body.physicalMountainId)
  const targetMountain = await TargetMountainId.findById(body.targetMountainId)

  if (!event || !physicalMountain || !targetMountain) {
    return response.status(400).json({ error: 'Event, physical or target mountain have been deleted or no longer exist.' })
  }
  const newTeam = new Team({
    ...body,
  })

  const savedTeam = await newTeam.save()

  response.status(201).json(savedTeam)
}