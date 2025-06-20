import mongoose from '../utils/db.js'

const {Schema, model} = mongoose

const teamSchema = new Schema({
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  mountain: {
    type: Schema.Types.ObjectId,
    ref: 'Mountain',
    required: true
  },
  hill: {
    type: Schema.Types.ObjectId,
    ref: 'Hill',
    required: true
  },
  rfidTagId: {
    type: Schema.Types.ObjectId,
    ref: 'RFIDTag',
    unique: true,
    required: false
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  isSoloTeam: {
    type: Boolean,
    default: false
  },
  lapsRequired: {
    type: Number,
    required: true,
    min: 0
  },
  startDateTime: {
    type: Date,
    required: true
  },
  totalDistanceRequired: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
})

teamSchema.virtual('participants', {
  ref: 'Participant',         
  localField: '_id',          
  foreignField: 'teamId',     
  justOne: false
})

teamSchema.virtual('laps', {
  ref: 'Lap',         
  localField: '_id',          
  foreignField: 'teamId',     
  justOne: false
})

teamSchema.set('toJSON', {
  virtuals: true,
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

teamSchema.set('toObject', { virtuals: true })

export default model('Team', teamSchema)