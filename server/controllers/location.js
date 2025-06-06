import Location from '../models/Location.js'

export const getLocations = async(req, response) => {

    const mountains = await Location.find({})

    response.json(mountains)
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
        province: body.province,
        country: body.country,
        lap: body.lap,
        active: body.active,
    })

    const savedLocation = await newLocation.save();

    response.json(savedLocation)
}