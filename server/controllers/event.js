import Event from '../models/event.js'

export const getEvents = async(req, response) => {

    const events = await Event.find({})

    response.json(events)
}

export const saveOneEvent = async (request, response) => {

    const body = request.body

    if (!body) {
        return response.status(400).json({ error: 'Event missing' })
    }

    const newEvent = new Event({
        eventName: body.eventName,
        location: body.location,
        startDate: body.startDate,
        endDate: body.endDate,
        duration: body.duration,
        lap: body.lap,
        active: body.active,
    })

    const savedEvent = await newEvent.save();

    response.json(savedEvent)
}