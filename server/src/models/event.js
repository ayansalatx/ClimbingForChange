import mongoose from 'mongoose'

const { Schema, model } = mongoose

const eventSchema = new Schema(
  {
    mountains: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Mountain',
      },
    ],
    hills: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Hill',
      },
    ],
    location: {
      type: Schema.Types.ObjectId,
      ref: 'Location',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    startDateTime: {
      type: Date,
      required: true,
    },
    endDateTime: {
      type: Date,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

eventSchema.virtual('teams', {
  ref: 'Team',
  localField: '_id',
  foreignField: 'event',
  justOne: false,
})

eventSchema.set('toJSON', {
  virtuals: true,
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

eventSchema.set('toObject', { virtuals: true })

export default model('Event', eventSchema)
