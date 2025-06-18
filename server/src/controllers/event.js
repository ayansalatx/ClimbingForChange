import Event from '../models/event.js'

export const getEvents = async (req, response) => {
  const events = await Event.find({})
    .populate('locationId')
    .populate('physicalMountainIds')

  response.json(events)
}

export const getEventByID = async (request, response) => {
  const id = request.params.id

  const events = await Event.findById(id)
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

export const updateOneEvent = async (request, response) => {
  const body = request.body

  if (!body) {
    return response.status(400).json({ error: 'Event missing' })
  }

  const updated = await Event.updateOne(
    {
      _id: body.id,
      active: true,
    },
    {
      $set: {
        name: body.name,
        locationId: body.locationId,
        physicalMountainIds: body.physicalMountainIds,
        startDateTime: body.startDateTime,
        endDateTime: body.endDateTime,
        active: body.active,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  )

  response.status(201).json(updated)
}

export const deleteOneEvent = async (request, response) => {
  const eventIdToDelete = request.body.id

  if (!eventIdToDelete) {
    return response.status(400).json({ error: 'Event id to delete is missing' })
  }

  const updated = await Event.findByIdAndUpdate(
    eventIdToDelete,
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
