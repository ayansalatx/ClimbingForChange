import mongoose from '../utils/db.js'

const {Schema, model} = mongoose

const physicalMountainSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  elevationPerLap: {
    type: Number,
    required: true
  }
})

physicalMountainSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default model('PhysicalMountain', physicalMountainSchema)