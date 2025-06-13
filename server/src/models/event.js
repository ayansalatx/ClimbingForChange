import mongoose from '../utils/db.js'

const {Schema, model} = mongoose

const eventSchema = new Schema({
  physicalMountainIds: [{
    type: Schema.Types.ObjectId,
    ref: 'PhysicalMountain'
  }],
  locationId: {
    type: Schema.Types.ObjectId,
    ref: 'Location',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  startDateTime: {
    type: Date,
    required: true
  },
  endDateTime: {
    type: Date,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

eventSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default model('Event', eventSchema)