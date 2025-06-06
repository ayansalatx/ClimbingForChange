import mongoose from '../utils/db.js';

const {Schema, model} = mongoose;

const participantSchema = new Schema({
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  subEvent: {
    type: String,
    required: true,
    trim: true
  },
  teamName: {
    type: String,
    trim: true
  },
})

participantSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default model('Participant', participantSchema)