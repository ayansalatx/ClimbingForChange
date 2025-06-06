// seed.js
import mongoose from '../utils/db.js';
import Location from '../models/location.js';
import Participant from '../models/participant.js';
import Event from '../models/event.js';
import Mountain from '../models/mountain.js';
import { dummyEvents, dummyLocations, dummyMountains, dummyParticipants } from './seedData.js';

async function seed() {
  try {

    await Location.deleteMany({});
    await Event.deleteMany({});
    await Participant.deleteMany({});
    await Mountain.deleteMany({});
    console.log('🧹 Cleared existing Location documents');

    // 4) Insert dummy data
    await Location.insertMany(dummyLocations);
    await Event.insertMany(dummyEvents);
    await Mountain.insertMany(dummyMountains);
    await Participant.insertMany(dummyParticipants);
    console.log(`Inserted ${dummyLocations.length} Location documents`);
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {

    // 5) Close the connection
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0);
  }
}

seed();
