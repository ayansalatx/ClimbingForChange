import Event from '../models/event.js'

export const getEvents = async(req, response) => {

  const events = await Event.find({})
    .populate('locationId')
    .populate('physicalMountainIds')

  response.json(events)
}

export const saveOneEvent = async (request, response) => {

  const body = request.body

  if (!body) {
    return response.status(400).json({ error: 'Event missing' })
  }

  const newEvent = new Event({
    name: body.name,
    locationId: body.locationId,
    physicalMountainIds: body.physicalMountainIds,
    startDateTime: body.startDateTime,
    endDateTime: body.endDateTime,
    active: body.active,
  })

  const savedEvent = await newEvent.save()

  response.status(201).json(savedEvent)
}