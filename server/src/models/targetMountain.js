import mongoose from '../utils/db.js'

const {Schema, model} = mongoose

const targetMountainSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  totalElevation: {
    type: Number,
    required: true,
  }
})

targetMountainSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default model('TargetMountain', targetMountainSchema)