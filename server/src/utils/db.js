import mongoose from 'mongoose'
import config from '../utils/config.js'

const MONGODB_URI = config.MONGODB_URI

const connectDB = async () => {
  try {
    console.log('Attempting to connect to', MONGODB_URI)
    await mongoose.connect(MONGODB_URI)
    console.log('Successfully connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message)
    process.exit(1)
  }
}

export default connectDB
