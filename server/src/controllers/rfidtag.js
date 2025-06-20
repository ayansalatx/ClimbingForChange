import RFIDTag from '../models/rfidTag.js'

export const getRFIDTags = async (request, response) => {
  
  const rfidTags = await RFIDTag.find({})

  response.json(rfidTags)
}

export const getRFIDTagByID = async (request, response) => {
  const id = request.params.id
  const rfidTags = await RFIDTag.findById(id)

  response.json(rfidTags)
}

export const getBySerialNumber = async (request, response) => {

  const serialNumber = request.params.serialNumber

  const rfidTag = await RFIDTag.find({
    serialNumber: serialNumber
  })

  response.json(rfidTag)
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

export const updateOneRFIDTag = async (request, response) => {
  const id = request.params.id
  const rfidTagToUpdate = request.body

  if (!id) {
    return response.status(400).json({ error: 'RFIDTag missing' })
  }

  const updated = await RFIDTag.findByIdAndUpdate(
    id,
    {
      $set: {
        serialNumber: rfidTagToUpdate.serialNumber,
      }
    },
    {
      new: true,
    }
  )

  response.status(200).json(updated)
}

export const deleteOneRFIDTag = async (request, response) => {
  const id = request.params.id

  if (!id) {
    return response.status(400).json({ error: 'Event id to delete is missing' })
  }

  await RFIDTag.findByIdAndDelete(id)

  response.status(204).send()
}