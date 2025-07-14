import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const passingSchema = new Schema({
  Code: {
    type: String,
    required: true,
    index: true
  },
  LoopID: {
    type: Number,
    required: true,
    index: true
  },
  PassingNo: {
    type: Number,
    required: true
  },
  RealTime: {
    type: Date,
    required: true,
    index: true
  },
  RunTime: {
    type: Number
  },
  FileNo: {
    type: Number,
    required: true
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  
  DeviceID: {
    type: String
  },
  DeviceName: {
    type: String
  },
  Customer: {
    type: Number
  },
  IsActive: {
    type: Boolean
  },
  Battery: {
    type: Number
  },
  Channel: {
    type: Number
  },
  Hits: {
    type: Number
  },
  RSSI: {
    type: Number
  },
  Temp: {
    type: Number
  },
  WUC: {
    type: Number
  },
  Position: {
    type: Schema.Types.Mixed 
  }
}, {
  timestamps: true
});

passingSchema.index({ Code: 1, LoopID: 1, PassingNo: 1 }, { unique: true });

passingSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

export default model('Passing', passingSchema);