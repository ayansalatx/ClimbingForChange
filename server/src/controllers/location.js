import Location from '../models/location.js'

export const getLocations = async(request, response) => {

  const locations = await Location.find({})

  response.json(locations)
}

export const getLocationById = async(request, response) => {
  const id = request.params.id

  const location = await Location.findById(id)

  response.json(location)
}

export const saveOneLocation = async (request, response) => {

  const body = request.body

  if (!body) {
    return response.status(400).json({ error: 'Location missing' })
  }

  const newLocation = new Location({
    name: body.name,
    address: body.address,
    city: body.city,
    provState: body.provState,
    country: body.country,
    lap: body.lap,
    active: true,
  })

  const savedLocation = await newLocation.save()

  response.status(201).json(savedLocation)
}

export const updateOneLocation = async (request, response) => {

  const body = request.body
  const id = request.params.id

  if (!body) {
    return response.status(400).json({ error: 'Location missing' })
  }

  const updated = await Location.updateOne(
    {
      _id: id,
      // active: true
    },
    {
      $set: {
        name: body.name,
        address: body.address,
        city: body.city,
        provState: body.provState,
        country: body.country,
        lap: body.lap,
        active: body.active,
      }
    },
    {
      new: true,
      runValidators: true
    }
  )

  response.status(200).json(updated)
}

export const deleteOneLocation = async (request, response) => {

  const id = request.params.id

  if (!id) {
    return response.status(400).json({ error: 'Location id to delete is missing' })
  }

  await Location.findByIdAndDelete(id)

  response.status(204).send()
}