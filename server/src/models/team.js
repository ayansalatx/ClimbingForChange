import mongoose from 'mongoose'

const { Schema, model } = mongoose

const teamSchema = new Schema(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    mountain: {
      type: Schema.Types.ObjectId,
      ref: 'Mountain',
      required: false,
    },
    hill: {
      type: Schema.Types.ObjectId,
      ref: 'Hill',
      required: false,
    },
    rfidTag: {
      type: Schema.Types.ObjectId,
      ref: 'RFIDTag',
      unique: true,
      sparse: true,
      required: false,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    isSoloTeam: {
      type: Boolean,
      default: false,
    },
    lapsRequired: {
      type: Number,
      required: false,
      min: 0,
    },
    startDateTime: {
      type: Date,
      required: false,
    },
    totalDistanceRequired: {
      type: Number,
      required: false,
      min: 0,
    },
    isIncomplete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

teamSchema.virtual('participants', {
  ref: 'Participant',
  localField: '_id',
  foreignField: 'team',
  justOne: false,
})

teamSchema.virtual('laps', {
  ref: 'Lap',
  localField: '_id',
  foreignField: 'team',
  justOne: false,
})

teamSchema.set('toJSON', {
  virtuals: true,
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

teamSchema.set('toObject', { virtuals: true })

export default model('Team', teamSchema)
