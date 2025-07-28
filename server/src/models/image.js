import mongoose from 'mongoose'

const { Schema, model } = mongoose

const imageSchema = new Schema(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    logoName: {
      type: String,
      required: false,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ['charity', 'sponsor'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

imageSchema.virtual('eventName', {
  ref: 'Event',
  localField: 'event',
  foreignField: '_id',
  justOne: true,
})

imageSchema.set('toJSON', {
  virtuals: true,
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

imageSchema.set('toObject', { virtuals: true })

export default model('Image', imageSchema)
