import mongoose from 'mongoose'
import config from '../utils/config.js'

const MONGO_URI_BASE = config.MONGO_URI_BASE
//climb-for-change?retryWrites=true&w=majority&appName=Climb-for-change-cluster.

// Note: Render sets this as a string 'true', not a boolean.
const isPreview = process.env.IS_PULL_REQUEST === 'true'

const dbName = 'climb-for-change'
// isPreview
//   ? `pr-preview-${process.env.RENDER_PULL_REQUEST_NUMBER}` // Still need the number for a unique name!
//   : 'climb-for-change' // Main staging database name.

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
