import Event from '../models/event.js'
import Team from '../models/team.js'
import Hill from '../models/hill.js'
import Mountain from '../models/mountain.js'
import Participant from '../models/participant.js'

export const getAllTeams = async (req, response) => {
  const allTeams = await Team.find({})
    .populate('participants')
    .populate('laps')
    .populate('mountain')
    .populate('hill')
    
  response.json(allTeams)
}

export const getTeamById = async (request, response) => {
  const id = request.params.id

  const team = await Team.findById(id).populate('participants')

  response.json(team)
}

export const saveOneTeam = async (request, response) => {
  const body = request.body

  if (!body) {
    return response.status(400).json({ error: 'Team missing' })
  }

  const event = await Event.findById(body.event)
  const hill = await Hill.findById(
    body.hill
  )
  const mountain = await Mountain.findById(body.mountain)

  if (!event || !hill || !mountain) {
    return response.status(400).json({
      error:
        'Event, hill or mountain have been deleted or no longer exist.',
    })
  }

  const newTeam = new Team({
    ...body,
  })

  const savedTeam = await newTeam.save()

  response.status(201).json(savedTeam)
}

export const updateOneTeam = async (request, response) => {
  const teamID = request.params.id
  const body = request.body

  if (!body) {
    return response.status(400).json({ error: 'Team body missing' })
  }

  const existingTeam = await Team.findById(teamID).populate('participants')

  if (!existingTeam) {
    return response.status(400).json({
      error: 'Team id missing or the team you want to update no longer exists',
    })
  }

  existingTeam.name = body.name !== undefined ? body.name : existingTeam.name
  existingTeam.isSoloTeam =
    body.isSoloTeam !== undefined ? body.isSoloTeam : existingTeam.isSoloTeam
  existingTeam.event =
    body.event !== undefined ? body.event : existingTeam.event
  existingTeam.hill =
    body.HillId !== undefined
      ? body.hill
      : existingTeam.hill
  existingTeam.mountain =
    body.MountainId !== undefined
      ? body.mountain
      : existingTeam.mountain
  existingTeam.lapsRequired =
    body.lapsRequired !== undefined
      ? body.lapsRequired
      : existingTeam.lapsRequired
  existingTeam.startDateTime =
    body.startDateTime !== undefined
      ? body.startDateTime
      : existingTeam.startDateTime

  const event = await Event.findById(body.event)
  const hill = await Hill.findById(
    body.hill
  )
  const mountain = await Mountain.findById(body.mountain)

  if (!event || !hill || !mountain) {
    return response.status(400).json({
      error:
        'Event, physical or target mountain have been deleted or no longer exist.',
    })
  }

  const newParticipantsIds = body.participantsIds
  const currentParticipantsIds = existingTeam.participants.map((p) =>
    p.id.toString()
  )

  if (Array.isArray(newParticipantsIds)) {
    const participantsToAdd = newParticipantsIds.filter(
      (pid) => !currentParticipantsIds.includes(pid)
    )
    const participantsToRemove = currentParticipantsIds.filter(
      (pid) => !newParticipantsIds.includes(pid)
    )

    if (participantsToAdd.length > 0) {
      const existingParticipantsToAdd = await Participant.find({
        _id: { $in: participantsToAdd },
      })
      const validParticipantIdsToAdd = existingParticipantsToAdd.map(
        (p) => p._id
      )

      if (validParticipantIdsToAdd.length !== participantsToAdd.length) {
        // Handle case where some participant IDs sent by frontend don't exist
        console.warn('Some participant IDs to add were not found.')
        // Might choose to throw an error or log and continue
      }

      await Participant.updateMany(
        { _id: { $in: validParticipantIdsToAdd }, teamId: { $ne: teamID } }, // Only update if not already on this team
        { $set: { teamId: existingTeam._id } }
      )
    }

    if (participantsToRemove.length > 0) {
      // b. Remove participants from this team (reassign them)
      // CRITICAL: Your Participant schema has teamId: required.
      // This means participants must ALWAYS belong to a team.
      // You CANNOT set teamId to null.
      // Assign them to a specific "unassigned" or "solo" team.
      if (participantsToRemove.length > 0) {
        for (const participantId of participantsToRemove) {
          const participant = await Participant.findById(participantId)
          if (participant && participant.teamId.equals(teamID)) {
            // Double-check they were actually on THIS team

            const soloTeam = new Team({
              name: `${participant.firstName} ${participant.lastName} (Solo)`,
              isSoloTeam: true,
              event: existingTeam.event,
              hill: existingTeam.hill,
              mountain: existingTeam.mountain,
              lapsRequired: existingTeam.lapsRequired,
              totalDistanceRequired: existingTeam.totalDistanceRequired,
              startDateTime: participant.startDateTime || new Date(),
            })
            const savedSoloTeam = await soloTeam.save()

            // Update the participant's teamId to their new solo team
            participant.teamId = savedSoloTeam._id
            await participant.save()
          }
        }
      }
    }
  }

  const savedTeam = await existingTeam.save()

  response.status(200).json(savedTeam)
}

export const deleteOneTeam = async (request, response) => {
  const teamIdToDelete = request.params.id

  if (!teamIdToDelete) {
    return response.status(400).json({ error: 'Team id to delete is missing' })
  }

  const updated = await Team.findByIdAndDelete(teamIdToDelete)

  response.status(204).send()
}
