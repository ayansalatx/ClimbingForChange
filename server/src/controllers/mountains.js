import PhysicalMountain from '../models/physicalMountain.js'
import TargetMountain from '../models/targetMountain.js'

export const getPhysicalMountains = async (req, response) => {

  const mountains = await PhysicalMountain.find({})

  response.json(mountains)
}

export const getTargetMountains = async (req, response) => {

  const mountains = await TargetMountain.find({})

  response.json(mountains)
}

export const getTargetMountainById = async (req, response) => {

  const { id } = req.params

  const mountain = await TargetMountain.findById(id)

  response.json(mountain)
}

export const getPhysicalMountainById = async (req, response) => {

  const { id } = req.params

  const mountain = await PhysicalMountain.findById(id)

  response.json(mountain)
}

export const saveOnePhysicalMountain = async (request, response) => {

  const body = request.body

  if (!body) {
    return response.status(400).json({ error: 'Mountain missing' })
  }

  const newMountain = new PhysicalMountain({
    name: body.name,
    elevationPerLap: body.elevationPerLap,
    active: body.active,
  })

  const savedMountain = await newMountain.save()

  response.status(201).json(savedMountain)
}

export const saveOneTargetMountain = async (request, response) => {

  const body = request.body

  if (!body) {
    return response.status(400).json({ error: 'Mountain missing' })
  }

  const newMountain = new TargetMountain({
    name: body.name,
    totalElevation: body.totalElevation,
    active: body.active,
  })

  const savedMountain = await newMountain.save()

  response.status(201).json(savedMountain)
}

export const updateOnePhysicalMountain = async (request, response) => {

  const body = request.body
  const id = request.params.id

  if (!body || !id) {
    return response.status(400).json({ error: 'Physical mountain body or id missing' })
  }

  const physicalMountainToDelete = PhysicalMountain.findById(id)

  if (!physicalMountainToDelete) {
    return response.status(400).json({ error: 'Physical mountain doesnt exist' })
  }

  const updated = await PhysicalMountain.updateOne(
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

export const deleteOnePhysicalMountain = async (request, response) => {

  const id = request.params.id

  if (!id) {
    return response.status(400).json({ error: 'Physical mountain id to delete is missing' })
  }

  const physicalMountainToDelete = await PhysicalMountain.findById(id)

  if (!physicalMountainToDelete) {
    return response.status(400).json({ error: 'Target mountain doesnt exist' })
  }

  const updated = await PhysicalMountain.findByIdAndDelete(id)

  response.status(200).json(updated)
}

export const updateOneTargetMountain = async (request, response) => {

  const body = request.body
  const id = request.params.id

  if (!body || !id) {
    return response.status(400).json({ error: 'Target mountain body or id missing' })
  }

  const targetMountainToDelete = await TargetMountain.findById(id)

  if (!targetMountainToDelete) {
    return response.status(400).json({ error: 'Target mountain doesnt exist' })
  }

  const updated = await TargetMountain.updateOne(
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

export const deleteOneTargetMountain = async (request, response) => {

  const id = request.params.id

  if (!id) {
    return response.status(400).json({ error: 'Target mountain id to delete is missing' })
  }

  const targetMountainToDelete = await TargetMountain.findById(id)

  if (!targetMountainToDelete) {
    return response.status(400).json({ error: 'Target mountain doesnt exist' })
  }

  const updated = await TargetMountain.findByIdAndDelete(id)

  response.status(200).json(updated)
}