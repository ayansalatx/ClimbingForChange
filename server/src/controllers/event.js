import Event from '../models/event.js'

export const getEvents = async (req, response) => {

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

// GET relevent event
// GET Event if active
// If no active get most recent Event
// If no recent event in the last 2 weeks or event coming up in the next 2 weeks, show empty
export const getDisplayEvent = async (request, response) => {
  const activeEvent = await Event.findOne({ active: true })
  try {
    const now = new Date();
    const twoWeeksMs = 1000 * 60 * 60 * 24 * 14;
    // Calc date for how long to display results on progress board
    const twoWeeksFromNow = new Date(now.getTime() + twoWeeksMs);
    const twoWeeksAgo = new Date(now.getTime() - twoWeeksMs);

    // Find an active Event
    let event = await Event.findOne({ active: true })
      .populate('locationId')
      .populate('physicalMountainIds')
    // .populate({
    //   path: 'teams',
    //   populate: {
    //     path: 'participants',
    //     populate: {
    //       path: 'laps',
    //     },
    //   },
    // })

    /*
    If no active Event
      Get latest event IF
        No more than 2 weeks after last event
        No less than 2 weeks before next Event
      Else return no Event
    */

    // Get last Event within the alloted time frame
    if (!event) {
      event = await Event.findOne({
        endDateTime: { $gte: twoWeeksAgo },
      }).sort({ endDateTime: 1 })
    }

    // Get Next Event within the alloted time frame
    if (!event) {
      event = await Event.findOne({
        startDateTime: { $lte: twoWeeksFromNow },
      }).sort({ startDateTime: -1 })
    }

    // IF no event active, pending, or recently completed, return nothing
    if (!event) {
      return res.json(null)
    }

    response.json(event)
  } catch (error) {
    return response.status(500).json({ error: 'Server Error' })
  }
}
