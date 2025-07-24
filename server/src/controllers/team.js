import Event from '../models/event.js'
import Team from '../models/team.js'
import Hill from '../models/hill.js'
import Mountain from '../models/mountain.js'
import RFIDTag from '../models/rfidTag.js'

export const getAllTeams = async (req, response) => {
  const filter = {}

  if (req.query.event) {
    filter.event = req.query.event
  }

  const allTeams = await Team.find(filter)
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
    body.rfidTag ? RFIDTag.findById(body.rfidTag) : null, // deleted id
  ])

  if (!event || !hill || !mountain) {
    return response.status(404).json({
      error: 'The specified Event, Hill, or Mountain does not exist.',
    })
  }

  if (body.rfidTag) { // delete id
    if (!rfidTag) {
      return response
        .status(404)
        .json({ error: 'The specified RFID Tag does not exist.' })
    }

    const teamWithThisTag = await Team.findOne({ rfidTag: rfidTag._id }) // deleted id
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
    rfidTag: body.rfidTag, // deleted id
    isSoloTeam: body.isSoloTeam,
    lapsRequired: Math.ceil(mountain.totalElevation / hill.lapElevationGain),
    startDateTime: body.startDateTime,
    totalDistanceRequired: body.totalDistanceRequired,
  })

  const savedTeam = await newTeam.save()
  response.status(201).json(savedTeam)
}

export const updateOneTeam = async (request, response) => {
  const teamID = request.params.id
  const body = request.body
  let rfidTag

  if (body.rfidTag && typeof body.rfidTag === 'object' && body.rfidTag.id) {
    rfidTag = await RFIDTag.findById(body.rfidTag.id)
  }
  else {
    rfidTag = await RFIDTag.findOne({ serialNumber: body.rfidTag })
  }

  const hill = await Hill.findById(body.hill)
  const mountain = await Mountain.findById(body.mountain)

  const teamToUpdate = await Team.findById(teamID)
  if (!teamToUpdate) {
    return response.status(404).json({ error: 'Team not found.' })
  }

  // 1. If an RFID tag is being updated, validate it
  if (body.rfidTag) { // deleted id
    const teamWithThisTag = await Team.findOne({ serialNumber: body.rfidTag }) // deleted id
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
    rfidTag: rfidTag._id,
    mountain: body.mountain.id,
    hill: body.hill.id,
    lapsRequired: Math.ceil(mountain.totalElevation / hill.lapElevationGain),
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
