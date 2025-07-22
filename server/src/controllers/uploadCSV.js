import csv from 'csvtojson'
import fs from 'fs'

import Event from '../models/event.js'
import Team from '../models/team.js'
import Participant from '../models/participant.js'
import Hill from '../models/hill.js'

export const uploadCSV = async (request, response) => {
  const { eventid, overwrite } = request.query

  if (!request.file) {
    return response
      .status(400)
      .json({ error: 'File to upload missing missing' })
  }

  const filePath = request.file.path
  let rows

  const event = await Event.findById(eventid).populate('mountains').populate('hills')
  if (!event) {
    return response.status(400).json({ error: 'Event not found' })
  }

  const mountains = event.mountains

  let hills = []
  if (event.hills && event.hills.length > 0) {
    hills = await Hill.find({ _id: { $in: event.hills } })
  }
  const hill = hills.length > 0 ? hills[0] : null

  try {
    rows = await csv().fromFile(filePath)
    try {
      fs.unlinkSync(filePath)
    }
    catch (unlinkError) {
      console.warn('⚠️ Failed to delete CSV file:', unlinkError.message)
    }
  }
  catch {
    return response.status(400).json({ error: 'Invalid CSV format' })
  }

  if (overwrite === 'true') {
    // Find teams for the event
    const teamsToDelete = await Team.find({ event: eventid })

    // Extract team IDs
    const teamIds = teamsToDelete.map(team => team._id)

    // Delete existing teams/participants
    await Promise.all([
      Team.deleteMany({ event: eventid }),
      Participant.deleteMany({ team: { $in: teamIds } }),
    ])
  }
  else {
    console.log('NOT overwriting')
  }

  for (const row of rows) {
    const firstName = row['First Name']
    const lastName = row['Last Name']
    const subEventArray = row['Sub-event'].split(' ')
    const teamName = row['Team Name']

    let rawMountainName = subEventArray[subEventArray.length - 1] || ''
    let mountainName = rawMountainName
      .replace(/mount/gi, '')
      .replace(/climb/gi, '')
      .replace(/[^a-zA-Z]/g, '')
      .trim()
      .toLowerCase()

    let mountain = mountains.find(
      m => m.name.trim().toLowerCase() === mountainName,
    )

    if (!mountain) {
      console.log(`Mountain not found for name: "${mountainName}"`)
    }

    const lapsRequired
      = hill && mountain
        ? Math.round(mountain.totalElevation / hill.lapElevationGain)
        : null

    // If team have already been created by previous row
    const existingTeam = await Team.findOne({ name: teamName, event: eventid })
    const team = existingTeam
      ? existingTeam
      : await Team.create({
          event: eventid,
          mountain: mountain._id,
          hill: hill ? hill._id : null,
          rfidTag: null,
          name: teamName ? teamName : `${firstName} ${lastName}`,
          lapsRequired: lapsRequired ?? 0,
          isSoloTeam: teamName ? false : true,
          isIncomplete: true,
          active: true,
        })
    await Participant.create({
      team: team._id,
      firstName: firstName,
      lastName: lastName,
    })
  }

  const allTeams = await Team.find({ event: eventid })
    .populate('participants')
    .populate('mountain')
    .populate('hill')

  response.json({ success: true, data: allTeams })
}
