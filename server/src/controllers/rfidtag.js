import RFIDTag from '../models/rfidTag.js'

export const getRFIDTags = async(req, response) => {

  const rfidTags = await RFIDTag.find({})

  response.json(rfidTags)
}

export const getBySerialNumber = async(request, response) => {

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

  const rfidTagToUpdate = request.body

  if (!rfidTagToUpdate) {
    return response.status(400).json({ error: 'RFIDTag missing' })
  }

  const updated = await RFIDTag.findByIdAndUpdate(
    rfidTagToUpdate.id,
    {
      $set: {
        serialNumber: rfidTagToUpdate.serialNumber,
      }
    },
    {
      new: true,
    }
  )

  response.status(201).json(updated)
}

export const deleteOneRFIDTag = async (request, response) => {

  const rfidTagIdToDelete = request.body.id

  if (!rfidTagIdToDelete) {
    return response.status(400).json({ error: 'Event id to delete is missing' })
  }

  const deleted = RFIDTag.deleteOne({
    _id: rfidTagIdToDelete.id
  })

  response.status(200).json(deleted)
}