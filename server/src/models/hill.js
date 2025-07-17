import mongoose from 'mongoose'

const { Schema, model } = mongoose

const hillSchema = new Schema(
  {
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
    lapElevationGain: {
      type: Number,
      required: true,
    },
    lapDistance: {
      type: Number,
      required: true,
    },
    elevationUnit: {
      type: String,
      required: true,
      enum: ['FT', 'M'],
      default: 'FT',
    },
    distanceUnit: {
      type: String,
      required: true,
      enum: ['KM', 'MI'],
      default: 'KM',
    },
  },
  {
    timestamps: true,
  }
)

hillSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

export default model('Hill', hillSchema)
