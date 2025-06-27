import mongoose from "mongoose"

const {Schema, model} = mongoose

const eventSchema = new Schema({
  mountains: [{
    type: Schema.Types.ObjectId,
    ref: 'Mountain'
  }],
  hills: [{
    type: Schema.Types.ObjectId,
    ref: 'Hill'
  }],
  location: {
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