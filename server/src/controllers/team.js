import Event from '../models/event.js'
import Team from '../models/team.js'
import Hill from '../models/hill.js'
import Mountain from '../models/mountain.js'
import RFIDTag from '../models/rfidTag.js'

export const getAllTeams = async (req, response) => {
  const allTeams = await Team.find({})
    .populate('participants')
    .populate('mountain')
    .populate('hill')
    .populate('rfidTag')

  response.json(allTeams)
}

export const getTeamById = async (request, response) => {
  const id = request.params.id

  const team = await Team.findById(id)
    .populate('participants')
    .populate('mountain')
    .populate('hill')
    .populate('rfidTag')

  response.json(team)
}

export const saveOneTeam = async (request, response) => {
  const body = request.body

  // First, validate all dependencies exist.
  const [event, hill, mountain, rfidTag] = await Promise.all([
    Event.findById(body.event),
    Hill.findById(body.hill),
    Mountain.findById(body.mountain),
    body.rfidTagId ? RFIDTag.findById(body.rfidTagId) : null,
  ])

  if (!event || !hill || !mountain) {
    return response.status(404).json({
      error: 'The specified Event, Hill, or Mountain does not exist.',
    })
  }

  if (body.rfidTagId) {
    if (!rfidTag) {
      return response
        .status(404)
        .json({ error: 'The specified RFID Tag does not exist.' })
    }
    const teamWithThisTag = await Team.findOne({ rfidTagId: rfidTag._id })
    if (teamWithThisTag) {
      return response
        .status(400)
        .json({ error: 'This RFID Tag is already assigned to another team.' })
    }
  }

  // All checks passed, create and save the new team.
  const newTeam = new Team({
    name: body.name,
    event: body.event,
    mountain: body.mountain,
    hill: body.hill,
    rfidTagId: body.rfidTagId,
    isSoloTeam: body.isSoloTeam,
    lapsRequired: body.lapsRequired,
    startDateTime: body.startDateTime,
    totalDistanceRequired: body.totalDistanceRequired,
  })

  const savedTeam = await newTeam.save()
  response.status(201).json(savedTeam)
}

export const updateOneTeam = async (request, response) => {
  const teamID = request.params.id
  const body = request.body

  const teamToUpdate = await Team.findById(teamID)
  if (!teamToUpdate) {
    return response.status(404).json({ error: 'Team not found.' })
  }

  // 1. If an RFID tag is being updated, validate it
  if (body.rfidTagId) {
    const teamWithThisTag = await Team.findOne({ rfidTagId: body.rfidTagId })
    // Check if a tag exists and is assigned to a different team
    if (teamWithThisTag && teamWithThisTag._id.toString() !== teamID) {
      return response
        .status(400)
        .json({ error: 'This RFID Tag is already assigned to another team.' })
    }
  }

  // 2. Prepare the update object with only the fields to be changed
  const updateData = {
    ...body,
  }

  // 3. Perform the update
  const updatedTeam = await Team.findByIdAndUpdate(teamID, updateData, {
    new: true,
    runValidators: true,
  }).populate('participants')
  response.status(200).json(updatedTeam)
}

export const deleteOneTeam = async (request, response) => {
  const teamIdToDelete = request.params.id

  if (!teamIdToDelete) {
    return response.status(400).json({ error: 'Team id to delete is missing' })
  }

  await Team.findByIdAndDelete(teamIdToDelete)

  response.status(204).send()
}
