/* eslint-disable no-unused-vars */
import mongoose from 'mongoose'
import config from '../utils/config.js'

const url = config.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

export default mongoose
