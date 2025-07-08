import mongoose from 'mongoose'

const { Schema, model } = mongoose

const participantSchema = new Schema({
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: false, // participant can be created without a team
    index: true
  },
  {
    timestamps: true,
  }
)

participantSchema.set('toJSON', {
  virtuals: true,
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

export default model('Participant', participantSchema)
