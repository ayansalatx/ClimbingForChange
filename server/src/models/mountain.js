import mongoose from "mongoose"

const {Schema, model} = mongoose

const mountainSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  totalElevation: {
    type: Number,
    required: true,
  },
  elevationUnit: {
    type: String,
    required: true,
    enum: ['FT', 'M'],
    default: 'FT'
  }
}, {
  timestamps: true
})

mountainSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default model('Mountain', mountainSchema)