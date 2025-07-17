import Hill from '../models/hill.js'

export const getHills = async (req, response) => {
  const mountains = await Hill.find({})

  response.json(mountains)
}

export const getHillById = async (req, response) => {
  const { id } = req.params

  const mountain = await Hill.findById(id)

  response.json(mountain)
}

export const saveOneHill = async (request, response) => {
  const body = request.body

  if (!body) {
    return response.status(400).json({ error: 'Mountain missing' })
  }

  const newMountain = new Hill({
    name: body.name,
    lapDistance: body.lapDistance,
    lapElevationGain: body.lapElevationGain,
    location: body.location,
    active: body.active,
    distanceUnit: body.distanceUnit,
    elevationUnit: body.elevationUnit,
  })

  const savedMountain = await newMountain.save()

  response.status(201).json(savedMountain)
}

export const updateOneHill = async (request, response) => {
  const body = request.body
  const id = request.params.id

  if (!body || !id) {
    return response.status(400).json({ error: 'Hill body or id missing' })
  }

  const hillToUpdate = await Hill.findById(id)

  if (!hillToUpdate) {
    return response.status(400).json({ error: 'Hill doesnt exist' })
  }

  const updated = await Hill.findByIdAndUpdate(
    id,
    {
      $set: {
        name: body.name,
        lapDistance: body.lapDistance,
        lapElevationGain: body.lapElevationGain,
        location: body.location,
        active: body.active,
        distanceUnit: body.distanceUnit,
        elevationUnit: body.elevationUnit,
      },
    },
    {
      new: true,
    }
  )

  response.status(200).json(updated)
}

export const deleteOneHill = async (request, response) => {
  const id = request.params.id

  if (!id) {
    return response
      .status(400)
      .json({ error: 'Physical mountain id to delete is missing' })
  }

  const hillToDelete = await Hill.findById(id)

  if (!hillToDelete) {
    return response.status(400).json({ error: 'Target mountain doesnt exist' })
  }

  await Hill.findByIdAndDelete(id)

  response.status(204).send()
}
