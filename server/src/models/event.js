import mongoose from '../utils/db.js'

const {Schema, model} = mongoose

const eventSchema = new Schema({
  eventName: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  duration: {
    type: Number, 
    required: true
  },
  lapDistance: {
    type: Number,
    default: 1
  },
  active: {
    type: Boolean,
    default: true
  }
})

eventSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default model('Event', eventSchema)