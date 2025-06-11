import mongoose from '../utils/db.js'

const {Schema, model} = mongoose

const teamSchema = new Schema({
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  physicalMountainId: {
    type: Schema.Types.ObjectId,
    ref: 'PhysicalMountain',
    required: true
  },
  targetMountainId: {
    type: Schema.Types.ObjectId,
    ref: 'TargetMountain',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  isSoloTeam: {
    type: Boolean,
    default: false
  },
  lapsRequired: {
    type: Number,
    required: true,
    min: 0
  },
  startDateTime: {
    type: Date,
    required: true
  },
  // rfidTagId: { // Uncomment and set 'required: true' if RFID is assigned per Team
  //   type: Schema.Types.ObjectId,
  //   ref: 'RFIDTag',
  //   required: false // Set to true if it must be assigned
  // }
}, {
  timestamps: true // Adds createdAt and updatedAt fields automatically
})

teamSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default model('Team', teamSchema)