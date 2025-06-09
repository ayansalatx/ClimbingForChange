import Mountain from '../models/Mountain.js'

export const getMountains = async(req, response) => {

  const mountains = await Mountain.find({})

  response.json(mountains)
}

export const saveOneMountain = async (request, response) => {

  const body = request.body

  if (!body) {
    return response.status(400).json({ error: 'Mountain missing' })
  }

  const newMountain = new Mountain({
    name: body.name,
    elevation: body.elevation,
    active: body.active,
  })

  const savedMountain = await newMountain.save()

  response.status(201).json(savedMountain)
}