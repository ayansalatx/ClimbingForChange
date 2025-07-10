import csv from 'csvtojson'
import fs from 'fs'

import Mountain from '../models/mountain.js'
import Team from '../models/team.js'
import Participant from '../models/participant.js'
import Hill from '../models/hill.js'

export const uploadCSV = async (request, response) => {

  const { eventid, overwrite } = request.query

  if (!request.file) {
    return response.status(400).json({ error: 'File to upload missing missing' })
  }

  const filePath = request.file.path
  let rows

  if (overwrite === 'true') {
    await Promise.all([
      Mountain.deleteMany({}),
      Team.deleteMany({}),
      Participant.deleteMany({}),
    ])

    try {
      rows = await csv().fromFile(filePath)
      try {
        fs.unlinkSync(filePath)
      } catch (unlinkError) {
        console.warn('⚠️ Failed to delete CSV file:', unlinkError.message)
      }
    } catch (err) {
      return response.status(400).json({ error: 'Invalid CSV format' })
    }

    for (const row of rows) {
      const firstName = row['First Name']
      const lastName = row['Last Name']
      const subEventArray = row['Sub-event'].split(' ')
      const teamName = row['Team Name']

      const mountainName = subEventArray[subEventArray.length - 1]

      const existingMountain = await Mountain.findOne({ name: mountainName })

      // If mountain have already been created 
      const mountain = existingMountain ? existingMountain : await Mountain.create({ name: mountainName, totalElevation: 0 })

      const hill = await Hill.findOne({})

      // If team have already been created by previous row
      const existingTeam = await Team.findOne({ name: teamName })
      const team = existingTeam ? existingTeam : await Team.create({
        event: eventid,
        mountain: mountain._id,
        hill: hill._id,
        name: teamName ? teamName : `${firstName} ${lastName}`,
        isSoloTeam: teamName ? false : true,
        isIncomplete: true
      })
      await Participant.create({
        team: team._id,
        firstName: firstName,
        lastName: lastName
      })
    }
  } else {
    console.log('NOT overwriting')
  }

  const allTeams = await Team.find({})
    .populate('participants')
    .populate('mountain')
    .populate('hill')

  response.json({ success: true, data: allTeams })
}