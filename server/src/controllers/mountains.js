import Hill from '../models/hill.js'
import Mountain from '../models/mountain.js'

export const getHills = async (req, response) => {

  const mountains = await Hill.find({})

  response.json(mountains)
}

export const getMountains = async (req, response) => {

  const mountains = await Mountain.find({})

  response.json(mountains)
}

export const getMountainById = async (req, response) => {

  const { id } = req.params

  const mountain = await Mountain.findById(id)

  response.json(mountain)
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
    elevationPerLap: body.elevationPerLap,
    active: body.active,
  })

  const savedMountain = await newMountain.save()

  response.status(201).json(savedMountain)
}

export const saveOneMountain = async (request, response) => {

  const body = request.body

  if (!body) {
    return response.status(400).json({ error: 'Mountain missing' })
  }

  const newMountain = new Mountain({
    name: body.name,
    totalElevation: body.totalElevation,
    active: body.active,
  })

  const savedMountain = await newMountain.save()

  response.status(201).json(savedMountain)
}

export const updateOneHill = async (request, response) => {

  const body = request.body
  const id = request.params.id

  if (!body || !id) {
    return response.status(400).json({ error: 'Physical mountain body or id missing' })
  }

  const HillToDelete = Hill.findById(id)

  if (!HillToDelete) {
    return response.status(400).json({ error: 'Physical mountain doesnt exist' })
  }

  const updated = await Hill.updateOne(
    {
      _id: id,
      // active: true
    },
    {
      $set: {
        name: body.name,
        elevationPerLap: body.elevationPerLap,
        active: body.active,
      }
    },
    {
      new: true,
    }
  )

  response.status(201).json(updated)
}

export const deleteOneHill = async (request, response) => {

  const id = request.params.id

  if (!id) {
    return response.status(400).json({ error: 'Physical mountain id to delete is missing' })
  }

  const HillToDelete = await Hill.findById(id)

  if (!HillToDelete) {
    return response.status(400).json({ error: 'Target mountain doesnt exist' })
  }

  const updated = await Hill.findByIdAndDelete(id)

  response.status(200).json(updated)
}

export const updateOneMountain = async (request, response) => {

  const body = request.body
  const id = request.params.id

  if (!body || !id) {
    return response.status(400).json({ error: 'Target mountain body or id missing' })
  }

  const MountainToDelete = await Mountain.findById(id)

  if (!MountainToDelete) {
    return response.status(400).json({ error: 'Target mountain doesnt exist' })
  }

  const updated = await Mountain.updateOne(
    {
      _id: id,
      // active: true
    },
    {
      $set: {
        name: body.name,
        totalElevation: body.totalElevation,
        active: body.active,
      }
    },
    {
      new: true,
    }
  )

  response.status(201).json(updated)
}

export const deleteOneMountain = async (request, response) => {

  const id = request.params.id

  if (!id) {
    return response.status(400).json({ error: 'Target mountain id to delete is missing' })
  }

  const MountainToDelete = await Mountain.findById(id)

  if (!MountainToDelete) {
    return response.status(400).json({ error: 'Target mountain doesnt exist' })
  }

  const updated = await Mountain.findByIdAndDelete(id)

  response.status(200).json(updated)
}