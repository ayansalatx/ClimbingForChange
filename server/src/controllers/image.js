import Event from '../models/event.js'
import Image from '../models/image.js'

export const getAllImages = async (req, res) => {
  const filter = {}

  if (req.query.event) {
    filter.event = req.query.event
  }
  if (req.query.type) {
    filter.type = req.query.type
  }

  const images = await Image.find(filter).populate('event')
  res.json(images)
}

export const getImageById = async (req, res) => {
  const id = req.params.id

  const image = await Image.findById(id).populate('event')
  if (!image) {
    return res.status(404).json({ error: 'Image not found.' })
  }

  res.json(image)
}

export const saveOneImage = async (req, res) => {
  const { url, type, event, logoName } = req.body

  // Validate required fields
  if (!url || !type || !logoName) {
    return res.status(400).json({ error: 'URL, type, and logo name are required.' })
  }

  // Validate type
  if (!['charity', 'sponsor'].includes(type)) {
    return res.status(400).json({ error: 'Type must be either charity or sponsor.' })
  }

  // Validate event exists
  const eventExists = await Event.findById(event)
  if (!eventExists) {
    return res.status(404).json({ error: 'The specified Event does not exist.' })
  }

  const newImage = new Image({
    url,
    type,
    event,
    logoName,
  })

  const savedImage = await newImage.save()
  res.status(201).json(savedImage)
}

export const updateOneImage = async (req, res) => {
  const imageId = req.params.id
  const { url, type, event, logoName } = req.body

  const imageToUpdate = await Image.findById(imageId)
  if (!imageToUpdate) {
    return res.status(404).json({ error: 'Image not found.' })
  }

  if (event) {
    const eventExists = await Event.findById(event)
    if (!eventExists) {
      return res.status(404).json({ error: 'The specified Event does not exist.' })
    }
  }

  if (type && !['charity', 'sponsor'].includes(type)) {
    return res.status(400).json({ error: 'Type must be either charity or sponsor.' })
  }

  // Validate logoName
  if ('logoName' in req.body && !logoName) {
    return res.status(400).json({ error: 'Logo name is required.' })
  }

  const updateData = {}
  if (url) updateData.url = url
  if (type) updateData.type = type
  if (event) updateData.event = event
  if (logoName) updateData.logoName = logoName

  const updatedImage = await Image.findByIdAndUpdate(imageId, updateData, {
    new: true,
    runValidators: true,
  }).populate('event')

  res.status(200).json(updatedImage)
}

export const deleteOneImage = async (req, res) => {
  const imageId = req.params.id

  if (!imageId) {
    return res.status(400).json({ error: 'Image id to delete is missing' })
  }

  await Image.findByIdAndDelete(imageId)
  res.status(204).send()
}
