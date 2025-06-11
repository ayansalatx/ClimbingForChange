import RFIDTag from '../models/rfidTag.js'

export const getRFIDTags = async(req, response) => {

  const mountains = await RFIDTag.find({})

  response.json(mountains)
}

export const saveOneRFIDTag = async (request, response) => {

  const body = request.body

  if (!body) {
    return response.status(400).json({ error: 'RFIDTag missing' })
  }

  const newRFIDTag = new RFIDTag({
    serialNumber: body.serialNumber,
  })

  const savedRFIDTag = await newRFIDTag.save()

  response.status(201).json(savedRFIDTag)
}