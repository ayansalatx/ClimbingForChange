import mongoose from 'mongoose'
import config from '../utils/config.js'

const MONGO_URI_BASE = config.MONGO_URI_BASE
//climb-for-change?retryWrites=true&w=majority&appName=Climb-for-change-cluster.

const dbName = 'climb-for-change'

const fullMongoUri = `${MONGO_URI_BASE}${dbName}?retryWrites=true&w=majority`

console.log('connecting to', fullMongoUri)
mongoose.connect(fullMongoUri)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

export default mongoose
