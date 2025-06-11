import Team from '../models/team.js'
import Event from '../models/event.js'
import PhysicalMountain from '../models/physicalMountain.js'
import TargetMountain from '../models/targetMountain.js'

export const getAllTeams = async (req, response) => {

    const mountains = await Team.find({}).populate('participants')

    response.json(mountains)
}

export const saveOneTeam = async (request, response) => {

    const body = request.body

    if (!body) {
        return response.status(400).json({ error: 'RFIDTag missing' })
    }

    //TODO: change it later after clarifications from the client
    const allEvents = await Event.find();
    const defaultEvent = allEvents[0];

    const allPhysicalMountains = await PhysicalMountain.find();
    const defaultPM = allPhysicalMountains[0];

    const allTragetMountains = await TargetMountain.find();
    const defaultTM = allTragetMountains[0];

    const newTeam = new Team({
        ...body,
        eventId: defaultEvent.id,
        physicalMountainId: defaultPM.id,
        targetMountainId: defaultTM.id
    })

      const savedTeam = await newTeam.save()

      response.status(201).json(savedTeam)
}