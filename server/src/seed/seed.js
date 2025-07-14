import connectDB from '../utils/db.js'
import mongoose from 'mongoose'
import Event from '../models/event.js'
import Hill from '../models/hill.js'
import Lap from '../models/lap.js'
import Location from '../models/location.js'
import Mountain from '../models/mountain.js'
import Participant from '../models/participant.js'
import RFIDTag from '../models/rfidTag.js'
import Team from '../models/team.js'
import User from '../models/user.js'

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...')
    await connectDB()
    console.log('Connected to MongoDB.')

    console.log('Clearing existing data...')
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
    console.log('All collections cleared.')

    // ------------------ SEEDING (ORDER IS CRITICAL) ------------------ //

    // 1. Seed documents with NO dependencies first.
    console.log('Seeding User, Locations, Mountains, and RFID Tags...')
    const locations = await Location.insertMany([
      {
        name: 'Down Town Park',
        address: '123 Park Ave',
        city: 'Edmonton',
        provState: 'AB',
        country: 'Canada'
      },
    ])

    await User.insertMany([
      {
        username: 'admin',
        firstName: 'John',
        lastName: 'Doe',
        password_hash: '$2a$12$7lCxHOSbd8XIJr/D6ZMsyO90FjYxqyQWzxx/IP6fznanAS6PjqcEK',
      },
      {
        username: 'admin2',
        firstName: 'Jane',
        lastName: 'Mary',
        password_hash: '$2a$12$7lCxHOSbd8XIJr/D6ZMsyO90FjYxqyQWzxx/IP6fznanAS6PjqcEK',
      }
    ])

    const mountains = await Mountain.insertMany([
      {
        name: 'Everest',
        totalElevation: 29029,
        elevationUnit: 'FT',
      },
      {
        name: 'Denali',
        totalElevation: 20310,
        elevationUnit: 'FT',
      },
      {
        name: 'Rainier',
        totalElevation: 14410,
        elevationUnit: 'FT',
      },
    ])

    const rfidTags = await RFIDTag.insertMany([
      { serialNumber: '1', description: 'RFID for Bib 1' },
      { serialNumber: '11', description: 'RFID for Bib 11' },
      { serialNumber: '24', description: 'RFID for Bib 24' },
      { serialNumber: '115', description: 'RFID for Bib 115' },
      { serialNumber: '180', description: 'RFID for Bib 180' },
      { serialNumber: '211', description: 'RFID for Bib 211' },
      { serialNumber: '222', description: 'RFID for Bib 222' },
      { serialNumber: '225', description: 'RFID for Bib 225' },
      { serialNumber: '295', description: 'RFID for Bib 295' },
      { serialNumber: '305', description: 'RFID for Bib 305' },
      { serialNumber: '362', description: 'RFID for Bib 362' },
      { serialNumber: '400', description: 'RFID for Bib 400' },
      { serialNumber: '446', description: 'RFID for Bib 446' },
      { serialNumber: '469', description: 'RFID for Bib 469' },
      { serialNumber: '4085', description: 'RFID for Bib 4085' },
      { serialNumber: '4416', description: 'RFID for Bib 4416' },
      { serialNumber: '4607', description: 'RFID for Bib 4607' },
      { serialNumber: '4777', description: 'RFID for Bib 4777' },
      { serialNumber: '4977', description: 'RFID for Bib 4977' },
      { serialNumber: '5026', description: 'RFID for Bib 5026' },
      { serialNumber: '5052', description: 'RFID for Bib 5052' },
      { serialNumber: '5155', description: 'RFID for Bib 5155' },
      { serialNumber: '5207', description: 'RFID for Bib 5207' },
      { serialNumber: '5294', description: 'RFID for Bib 5294' },
      { serialNumber: '10041', description: 'RFID for Bib 10041' },
    ])
    console.log('Seeded base data successfully.')


    // 2. Seed Hills (depends on Location)
    console.log('Seeding Hills...')
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
    ])
    console.log('Seeded Hills successfully.')

    // 3. Seed Events (depends on Location, Mountain, Hill)
    console.log('Seeding Events...')
    const events = await Event.insertMany([
      {
        location: locations[0]._id,
        name: 'Climb for Change 2024',
        startDateTime: new Date('2024-09-14T08:00:00Z'),
        endDateTime: new Date('2024-09-14T18:00:00Z'),
        mountains: [mountains[0]._id, mountains[1]._id, mountains[2]._id],
        hills: [hills[0]._id, hills[1]._id],
        active: true,
      },
    ])
    console.log('Seeded Events successfully.')


    // 4. Seed Teams (depends on Event, Mountain, Hill, RFIDTag)
    console.log('Seeding Teams...')
    // We calculate required laps/distance for realism
    const everestData = mountains.find(m => m.name === 'Everest')
    const grinderHillData = hills.find(h => h.name === 'The Grinder')
    const everestLaps = Math.ceil(everestData.totalElevation / grinderHillData.lapElevationGain) // ~134
    const everestDistance = everestLaps * grinderHillData.lapDistance // ~100.5

    const denaliData = mountains.find(m => m.name === 'Denali')
    const denaliLaps = Math.ceil(denaliData.totalElevation / grinderHillData.lapElevationGain) // ~94
    const denaliDistance = denaliLaps * grinderHillData.lapDistance // ~70.5
    
    const teams = await Team.insertMany([
      {
        event: events[0]._id,
        mountain: everestData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find(tag => tag.serialNumber === '1')._id,
        name: 'Summit Striders',
        isSoloTeam: false,
        lapsRequired: everestLaps,
        totalDistanceRequired: everestDistance,
        startDateTime: new Date('2024-09-14T08:05:00Z')
      },
      {
        event: events[0]._id,
        mountain: denaliData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find(tag => tag.serialNumber === '11')._id,
        name: 'Peak Performers',
        isSoloTeam: false,
        lapsRequired: denaliLaps,
        totalDistanceRequired: denaliDistance,
        startDateTime: new Date('2024-09-14T08:10:00Z')
      },
      {
        event: events[0]._id,
        mountain: mountains.find(m => m.name === 'Rainier')._id,
        hill: hills.find(h => h.name === 'Easy Loop')._id,
        rfidTag: rfidTags.find(tag => tag.serialNumber === '24')._id,
        name: 'Jane Doe',
        isSoloTeam: true,
        lapsRequired: 121, // 14410 / 120
        totalDistanceRequired: 60.5, // 121 * 0.5
        startDateTime: new Date('2024-09-14T08:15:00Z')
      },
      // Add more teams for the remaining bib numbers
      {
        event: events[0]._id,
        mountain: everestData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find(tag => tag.serialNumber === '115')._id,
        name: 'Team 115',
        isSoloTeam: true,
        lapsRequired: everestLaps,
        totalDistanceRequired: everestDistance,
        startDateTime: new Date('2024-09-14T08:20:00Z')
      },
      {
        event: events[0]._id,
        mountain: denaliData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find(tag => tag.serialNumber === '180')._id,
        name: 'Team 180',
        isSoloTeam: true,
        lapsRequired: denaliLaps,
        totalDistanceRequired: denaliDistance,
        startDateTime: new Date('2024-09-14T08:25:00Z')
      },
      {
        event: events[0]._id,
        mountain: everestData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find(tag => tag.serialNumber === '211')._id,
        name: 'Team 211',
        isSoloTeam: true,
        lapsRequired: everestLaps,
        totalDistanceRequired: everestDistance,
        startDateTime: new Date('2024-09-14T08:30:00Z')
      },
      {
        event: events[0]._id,
        mountain: denaliData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find(tag => tag.serialNumber === '222')._id,
        name: 'Team 222',
        isSoloTeam: true,
        lapsRequired: denaliLaps,
        totalDistanceRequired: denaliDistance,
        startDateTime: new Date('2024-09-14T08:35:00Z')
      },
      {
        event: events[0]._id,
        mountain: everestData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find(tag => tag.serialNumber === '225')._id,
        name: 'Team 225',
        isSoloTeam: true,
        lapsRequired: everestLaps,
        totalDistanceRequired: everestDistance,
        startDateTime: new Date('2024-09-14T08:40:00Z')
      },
      {
        event: events[0]._id,
        mountain: denaliData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find(tag => tag.serialNumber === '295')._id,
        name: 'Team 295',
        isSoloTeam: true,
        lapsRequired: denaliLaps,
        totalDistanceRequired: denaliDistance,
        startDateTime: new Date('2024-09-14T08:45:00Z')
      },
      {
        event: events[0]._id,
        mountain: everestData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find(tag => tag.serialNumber === '305')._id,
        name: 'Team 305',
        isSoloTeam: true,
        lapsRequired: everestLaps,
        totalDistanceRequired: everestDistance,
        startDateTime: new Date('2024-09-14T08:50:00Z')
      },
      {
        event: events[0]._id,
        mountain: denaliData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find(tag => tag.serialNumber === '362')._id,
        name: 'Team 362',
        isSoloTeam: true,
        lapsRequired: denaliLaps,
        totalDistanceRequired: denaliDistance,
        startDateTime: new Date('2024-09-14T08:55:00Z')
      },
      {
        event: events[0]._id,
        mountain: everestData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find(tag => tag.serialNumber === '400')._id,
        name: 'Team 400',
        isSoloTeam: true,
        lapsRequired: everestLaps,
        totalDistanceRequired: everestDistance,
        startDateTime: new Date('2024-09-14T09:00:00Z')
      },
      {
        event: events[0]._id,
        mountain: denaliData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find(tag => tag.serialNumber === '446')._id,
        name: 'Team 446',
        isSoloTeam: true,
        lapsRequired: denaliLaps,
        totalDistanceRequired: denaliDistance,
        startDateTime: new Date('2024-09-14T09:05:00Z')
      },
      {
        event: events[0]._id,
        mountain: everestData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find(tag => tag.serialNumber === '469')._id,
        name: 'Team 469',
        isSoloTeam: true,
        lapsRequired: everestLaps,
        totalDistanceRequired: everestDistance,
        startDateTime: new Date('2024-09-14T09:10:00Z')
      },
      {
        event: events[0]._id,
        mountain: denaliData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find(tag => tag.serialNumber === '4085')._id,
        name: 'Team 4085',
        isSoloTeam: true,
        lapsRequired: denaliLaps,
        totalDistanceRequired: denaliDistance,
        startDateTime: new Date('2024-09-14T09:15:00Z')
      },
      {
        event: events[0]._id,
        mountain: everestData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find(tag => tag.serialNumber === '4416')._id,
        name: 'Team 4416',
        isSoloTeam: true,
        lapsRequired: everestLaps,
        totalDistanceRequired: everestDistance,
        startDateTime: new Date('2024-09-14T09:20:00Z')
      },
      {
        event: events[0]._id,
        mountain: denaliData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find(tag => tag.serialNumber === '4607')._id,
        name: 'Team 4607',
        isSoloTeam: true,
        lapsRequired: denaliLaps,
        totalDistanceRequired: denaliDistance,
        startDateTime: new Date('2024-09-14T09:25:00Z')
      },
      {
        event: events[0]._id,
        mountain: everestData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find(tag => tag.serialNumber === '4777')._id,
        name: 'Team 4777',
        isSoloTeam: true,
        lapsRequired: everestLaps,
        totalDistanceRequired: everestDistance,
        startDateTime: new Date('2024-09-14T09:30:00Z')
      },
      {
        event: events[0]._id,
        mountain: denaliData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find(tag => tag.serialNumber === '4977')._id,
        name: 'Team 4977',
        isSoloTeam: true,
        lapsRequired: denaliLaps,
        totalDistanceRequired: denaliDistance,
        startDateTime: new Date('2024-09-14T09:35:00Z')
      },
      {
        event: events[0]._id,
        mountain: everestData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find(tag => tag.serialNumber === '5026')._id,
        name: 'Team 5026',
        isSoloTeam: true,
        lapsRequired: everestLaps,
        totalDistanceRequired: everestDistance,
        startDateTime: new Date('2024-09-14T09:40:00Z')
      },
      {
        event: events[0]._id,
        mountain: denaliData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find(tag => tag.serialNumber === '5052')._id,
        name: 'Team 5052',
        isSoloTeam: true,
        lapsRequired: denaliLaps,
        totalDistanceRequired: denaliDistance,
        startDateTime: new Date('2024-09-14T09:45:00Z')
      },
      {
        event: events[0]._id,
        mountain: everestData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find(tag => tag.serialNumber === '5155')._id,
        name: 'Team 5155',
        isSoloTeam: true,
        lapsRequired: everestLaps,
        totalDistanceRequired: everestDistance,
        startDateTime: new Date('2024-09-14T09:50:00Z')
      },
      {
        event: events[0]._id,
        mountain: denaliData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find(tag => tag.serialNumber === '5207')._id,
        name: 'Team 5207',
        isSoloTeam: true,
        lapsRequired: denaliLaps,
        totalDistanceRequired: denaliDistance,
        startDateTime: new Date('2024-09-14T09:55:00Z')
      },
      {
        event: events[0]._id,
        mountain: everestData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find(tag => tag.serialNumber === '5294')._id,
        name: 'Team 5294',
        isSoloTeam: true,
        lapsRequired: everestLaps,
        totalDistanceRequired: everestDistance,
        startDateTime: new Date('2024-09-14T10:00:00Z')
      },
      {
        event: events[0]._id,
        mountain: denaliData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find(tag => tag.serialNumber === '10041')._id,
        name: 'Team 10041',
        isSoloTeam: true,
        lapsRequired: denaliLaps,
        totalDistanceRequired: denaliDistance,
        startDateTime: new Date('2024-09-14T10:05:00Z')
      }
    ])
    console.log('Seeded Teams successfully.')

    // 5. Seed Participants (depends on Teams)
    console.log('Seeding Participants...')
    await Participant.insertMany([
      // Summit Striders members
      { team: teams[0]._id, firstName: 'Alice', lastName: 'Johnson' },
      { team: teams[0]._id, firstName: 'Bob', lastName: 'Williams' },
      // Peak Performers members
      { team: teams[1]._id, firstName: 'Charlie', lastName: 'Brown' },
      { team: teams[1]._id, firstName: 'Diana', lastName: 'Miller' },
      // Solo team participant is already defined by team name, but can have a separate doc
      { team: teams[2]._id, firstName: 'Jane', lastName: 'Doe' },
      // A participant not yet on a team
      { firstName: 'Eve', lastName: 'Davis' },
    ])
    console.log('Seeded Participants successfully.')

    // 6. Seed Laps (depends on Teams, RFIDTags)
    console.log('Seeding Laps to simulate event in progress...')
    await Lap.insertMany([
      // 2 laps for the Summit Striders
      {
        team: teams[0]._id,
        rfidTag: teams[0].rfidTag,
        startDateTime: new Date('2024-09-14T08:05:01Z'),
        endDateTime: new Date('2024-09-14T08:12:31Z'),
        lapDuration: 7 * 60 * 1000 + 30 * 1000, // 7 minutes 30 seconds in milliseconds
        lapNumber: 1
      },
      {
        team: teams[0]._id,
        rfidTag: teams[0].rfidTag,
        startDateTime: new Date('2024-09-14T08:12:32Z'),
        endDateTime: new Date('2024-09-14T08:20:05Z'),
        lapDuration: 7 * 60 * 1000 + 33 * 1000, // 7 minutes 33 seconds in milliseconds
        lapNumber: 2
      },
      // 1 lap for Peak Performers
      {
        team: teams[1]._id,
        rfidTag: teams[1].rfidTag,
        startDateTime: new Date('2024-09-14T08:10:01Z'),
        endDateTime: new Date('2024-09-14T08:19:45Z'),
        lapDuration: 9 * 60 * 1000 + 44 * 1000, // 9 minutes 44 seconds in milliseconds
        lapNumber: 1
      }
    ])
    console.log('Seeded Laps successfully.')


    console.log('\n✅ ✅ ✅ Database seeding complete! ✅ ✅ ✅')

  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  } finally {
    // ------------------ CLOSE CONNECTION ------------------ //
    await mongoose.connection.close()
    console.log('MongoDB connection closed.')
  }
}

// Run the seeder
seedDatabase()