import Event from '../models/event.js'

export const getEvents = async (req, response) => {
  const events = await Event.find({})
    .populate('location')
    .populate('mountains')
    
  response.json(events)
}

export const getEventByID = async (request, response) => {
  const id = request.params.id

  const event = await Event.findById(id)
    .populate('location')
    .populate('mountains')
  
  response.json(event)
}

export const saveOneEvent = async (request, response) => {

  const body = request.body
  console.log('body', body)
  if (!body) {
    return response.status(400).json({ error: 'Event missing' })
  }

  const newEvent = new Event({
    
    name: body.name,
    location: body.location,
    mountains: body.mountains,
    hills: body.hills,
    startDateTime: body.startDateTime,
    endDateTime: body.endDateTime,
    active: body.active,
  })
  console.log('new event', newEvent)

  const savedEvent = await newEvent.save()
  console.log('saved event', savedEvent)

  response.status(201).json(savedEvent)
}

export const updateOneEvent = async (request, response) => {
  const body = request.body
  const id = request.params.id

  if (!id) {
    return response.status(400).json({ error: 'Event missing' })
  }

  const eventToUpdate = await Event.findById(id)

  if (!eventToUpdate) {
    return response.status(400).json({ error: 'This event no longer exists.' })
  }

  const updated = await Event.findByIdAndUpdate(id,
    {
      $set: {
        name: body.name,
        location: body.location,
        hills: body.hills,
        mountains: body.mountains,
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

  response.status(200).json(updated)
}

export const deleteOneEvent = async (request, response) => {
  const eventIdToDelete = request.params.id

  if (!eventIdToDelete) {
    return response.status(400).json({ error: 'Event id to delete is missing' })
  }

  const eventToDelete = await Event.findById(eventIdToDelete)

  if (!eventToDelete) {
    return response.status(400).json({ error: 'This event no longer exists.' })
  }

  await Event.findByIdAndDelete( eventIdToDelete)

  response.status(204).send()
}
