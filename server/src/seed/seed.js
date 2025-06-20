import mongoose from '../utils/db.js'
import Event from '../models/event.js';
import Hill from '../models/hill.js';
import Lap from '../models/lap.js';
import Location from '../models/location.js';
import Mountain from '../models/mountain.js';
import Participant from '../models/participant.js';
import RFIDTag from '../models/rfidTag.js';
import Team from '../models/team.js';

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...')
    await mongoose.connection.asPromise()
    console.log('Connected to MongoDB.')

    console.log('Clearing existing data...');
     await Promise.all([
      Location.collection.drop().catch(e => { if (e.codeName !== 'NamespaceNotFound') throw e }), // Drop collection, ignore if not found
      Mountain.collection.drop().catch(e => { if (e.codeName !== 'NamespaceNotFound') throw e }),
      Hill.collection.drop().catch(e => { if (e.codeName !== 'NamespaceNotFound') throw e }),
      RFIDTag.collection.drop().catch(e => { if (e.codeName !== 'NamespaceNotFound') throw e }),
      Event.collection.drop().catch(e => { if (e.codeName !== 'NamespaceNotFound') throw e }),
      Team.collection.drop().catch(e => { if (e.codeName !== 'NamespaceNotFound') throw e }),
      Participant.collection.drop().catch(e => { if (e.codeName !== 'NamespaceNotFound') throw e }),
      Lap.collection.drop().catch(e => { if (e.codeName !== 'NamespaceNotFound') throw e }),
    ])
    console.log('All collections cleared.');

    // ------------------ SEEDING (ORDER IS CRITICAL) ------------------ //

    // 1. Seed documents with NO dependencies first.
    console.log('Seeding Locations, Mountains, and RFID Tags...');
    const locations = await Location.insertMany([
      {
        name: 'Down Town Park',
        address: '123 Park Ave',
        city: 'Edmonton',
        provState: 'AB',
        country: 'Canada'
      },
    ]);

    const mountains = await Mountain.insertMany([
      {
        name: 'Everest',
        totalElevation: 29029,
        elevationUnit: 'FT',
        imageURL: 'https://images.unsplash.com/photo-1486911278844-a81c5267e227?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        name: 'Denali',
        totalElevation: 20310,
        elevationUnit: 'FT',
        imageURL: 'https://plus.unsplash.com/premium_photo-1674500519353-c816e0c06ad6?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        name: 'Rainier',
        totalElevation: 14410,
        elevationUnit: 'FT',
        imageURL: 'https://plus.unsplash.com/premium_photo-1673264933212-d78737f38e48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TW91bnQlMjBSYWluaWVyfGVufDB8fDB8fHww'
      },
    ]);

    const rfidTags = await RFIDTag.insertMany([
      { serialNumber: 'A1B2C3D4E5' },
      { serialNumber: 'F6G7H8I9J0' },
      { serialNumber: 'K1L2M3N4O5' },
      { serialNumber: 'P6Q7R8S9T0' },
    ]);
    console.log('Seeded base data successfully.');


    // 2. Seed Hills (depends on Location)
    console.log('Seeding Hills...');
    const hills = await Hill.insertMany([
      {
        location: locations[0]._id,
        name: 'The Grinder',
        lapElevationGain: 217,
        lapDistance: 0.75,
        elevationUnit: 'FT',
        distanceUnit: 'KM'
      },
      {
        location: locations[0]._id,
        name: 'Easy Loop',
        lapElevationGain: 120,
        lapDistance: 0.5,
        elevationUnit: 'FT',
        distanceUnit: 'KM'
      },
    ]);
    console.log('Seeded Hills successfully.');

    // 3. Seed Events (depends on Location, Mountain, Hill)
    console.log('Seeding Events...');
    const events = await Event.insertMany([
      {
        location: locations[0]._id,
        name: 'Climb for Change 2024',
        startDateTime: new Date('2024-09-14T08:00:00Z'),
        endDateTime: new Date('2024-09-14T18:00:00Z'),
        // Define which mountains and hills are available for this event
        availableMountains: [mountains[0]._id, mountains[1]._id, mountains[2]._id],
        availableHills: [hills[0]._id, hills[1]._id],
      },
    ]);
    console.log('Seeded Events successfully.');


    // 4. Seed Teams (depends on Event, Mountain, Hill, RFIDTag)
    console.log('Seeding Teams...');
    // We calculate required laps/distance for realism
    const everestData = mountains.find(m => m.name === 'Everest');
    const grinderHillData = hills.find(h => h.name === 'The Grinder');
    const everestLaps = Math.ceil(everestData.totalElevation / grinderHillData.lapElevationGain); // ~134
    const everestDistance = everestLaps * grinderHillData.lapDistance; // ~100.5

    const denaliData = mountains.find(m => m.name === 'Denali');
    const denaliLaps = Math.ceil(denaliData.totalElevation / grinderHillData.lapElevationGain); // ~94
    const denaliDistance = denaliLaps * grinderHillData.lapDistance; // ~70.5
    
    const teams = await Team.insertMany([
      {
        eventId: events[0]._id,
        mountain: everestData._id,
        hill: grinderHillData._id,
        rfidTagId: rfidTags[0]._id,
        name: 'Summit Striders',
        isSoloTeam: false,
        lapsRequired: everestLaps,
        totalDistanceRequired: everestDistance,
        startDateTime: new Date('2024-09-14T08:05:00Z')
      },
      {
        eventId: events[0]._id,
        mountain: denaliData._id,
        hill: grinderHillData._id,
        rfidTagId: rfidTags[1]._id,
        name: 'Peak Performers',
        isSoloTeam: false,
        lapsRequired: denaliLaps,
        totalDistanceRequired: denaliDistance,
        startDateTime: new Date('2024-09-14T08:10:00Z')
      },
      {
        eventId: events[0]._id,
        mountain: mountains.find(m => m.name === 'Rainier')._id,
        hill: hills.find(h => h.name === 'Easy Loop')._id,
        rfidTagId: rfidTags[2]._id,
        name: 'Jane Doe',
        isSoloTeam: true,
        lapsRequired: 121, // 14410 / 120
        totalDistanceRequired: 60.5, // 121 * 0.5
        startDateTime: new Date('2024-09-14T08:15:00Z')
      }
    ]);
    console.log('Seeded Teams successfully.');

    // 5. Seed Participants (depends on Teams)
    console.log('Seeding Participants...');
    await Participant.insertMany([
      // Summit Striders members
      { teamId: teams[0]._id, firstName: 'Alice', lastName: 'Johnson' },
      { teamId: teams[0]._id, firstName: 'Bob', lastName: 'Williams' },
      // Peak Performers members
      { teamId: teams[1]._id, firstName: 'Charlie', lastName: 'Brown' },
      { teamId: teams[1]._id, firstName: 'Diana', lastName: 'Miller' },
      // Solo team participant is already defined by team name, but can have a separate doc
      { teamId: teams[2]._id, firstName: 'Jane', lastName: 'Doe' },
      // A participant not yet on a team
      { firstName: 'Eve', lastName: 'Davis' },
    ]);
    console.log('Seeded Participants successfully.');

    // 6. Seed Laps (depends on Teams, RFIDTags)
    console.log('Seeding Laps to simulate event in progress...');
    await Lap.insertMany([
      // 2 laps for the Summit Striders
      {
        teamId: teams[0]._id,
        rfidTagId: teams[0].rfidTagId,
        startDateTime: new Date('2024-09-14T08:05:01Z'),
        endDateTime: new Date('2024-09-14T08:12:31Z')
      },
      {
        teamId: teams[0]._id,
        rfidTagId: teams[0].rfidTagId,
        startDateTime: new Date('2024-09-14T08:12:32Z'),
        endDateTime: new Date('2024-09-14T08:20:05Z')
      },
      // 1 lap for Peak Performers
      {
        teamId: teams[1]._id,
        rfidTagId: teams[1].rfidTagId,
        startDateTime: new Date('2024-09-14T08:10:01Z'),
        endDateTime: new Date('2024-09-14T08:19:45Z')
      }
    ]);
    console.log('Seeded Laps successfully.');


    console.log('\n✅ ✅ ✅ Database seeding complete! ✅ ✅ ✅');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    // ------------------ CLOSE CONNECTION ------------------ //
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
};

// Run the seeder
seedDatabase();