import PhysicalMountain from '../models/physicalMountain.js'
import TargetMountain from '../models/targetMountain.js'

export const getPhysicalMountains = async(req, response) => {

  const mountains = await PhysicalMountain.find({})

  response.json(mountains)
}

export const getTargetMountains = async(req, response) => {

  const mountains = await TargetMountain.find({})

  response.json(mountains)
}

export const getTargetMountainById = async (req, response) => {
  
  const { id } = req.params
  
  const mountain = await TargetMountain.findById(id)

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