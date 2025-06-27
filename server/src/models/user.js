import mongoose from '../utils/db.js'

const { Schema, model } = mongoose

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  password_hash: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default model('User', userSchema)