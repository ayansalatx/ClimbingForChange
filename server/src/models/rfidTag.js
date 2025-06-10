import mongoose from '../utils/db.js'

const {Schema, model} = mongoose

const rfidTagSchema = new Schema({
  serialNumber: {
    type: String,
    required: true,
    trim: true
  }
})

rfidTagSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default model('RFIDTag', rfidTagSchema)