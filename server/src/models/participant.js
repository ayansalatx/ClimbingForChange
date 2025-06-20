import mongoose from '../utils/db.js'

const { Schema, model } = mongoose

const participantSchema = new Schema({
  teamId: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: false, // participant can be created without a team
    index: true
  },
  // rfidTagId: { // This field is included for the "RFID per Participant" scenario
  //   type: Schema.Types.ObjectId,
  //   ref: 'RFIDTag',
  //   required: false,
  //   unique: true,
  //   sparse: true // allows for null duplicate though we specified unique: true
  // },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

participantSchema.set('toJSON', {
  virtuals: true,
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default model('Participant', participantSchema)