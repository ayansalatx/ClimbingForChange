import mongoose from 'mongoose'

const { Schema, model } = mongoose

const lapSchema = new Schema({
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
    index: true 
  },
  
  rfidTag: {
    type: Schema.Types.ObjectId,
    ref: 'RFIDTag',
    required: true
  },
  startDateTime: {
    type: Date,
    required: true,
  },
  endDateTime: {
    type: Date,
    required: true,
  },
  lapDuration: {
    type: Number,
    required: true
  },
  lapNumber: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
})

lapSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default model('Lap', lapSchema)