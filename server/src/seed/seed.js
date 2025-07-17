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
import Passing from '../models/passing.js'

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...')
    await connectDB()
    console.log('Connected to MongoDB.')

    console.log('Clearing existing data...')
    await Promise.all([
      Location.collection.drop().catch((e) => {
        if (e.codeName !== 'NamespaceNotFound') throw e
      }), // Drop collection, ignore if not found
      Mountain.collection.drop().catch((e) => {
        if (e.codeName !== 'NamespaceNotFound') throw e
      }),
      Hill.collection.drop().catch((e) => {
        if (e.codeName !== 'NamespaceNotFound') throw e
      }),
      RFIDTag.collection.drop().catch((e) => {
        if (e.codeName !== 'NamespaceNotFound') throw e
      }),
      Event.collection.drop().catch((e) => {
        if (e.codeName !== 'NamespaceNotFound') throw e
      }),
      Team.collection.drop().catch((e) => {
        if (e.codeName !== 'NamespaceNotFound') throw e
      }),
      Participant.collection.drop().catch((e) => {
        if (e.codeName !== 'NamespaceNotFound') throw e
      }),
      Lap.collection.drop().catch((e) => {
        if (e.codeName !== 'NamespaceNotFound') throw e
      }),
      Passing.collection.drop().catch((e) => {
        if (e.codeName !== 'NamespaceNotFound') throw e
      }),
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
        country: 'Canada',
      },
    ])

    await User.insertMany([
      {
        username: 'admin',
        firstName: 'John',
        lastName: 'Doe',
        password_hash:
          '$2a$12$7lCxHOSbd8XIJr/D6ZMsyO90FjYxqyQWzxx/IP6fznanAS6PjqcEK',
      },
      {
        username: 'admin2',
        firstName: 'Jane',
        lastName: 'Mary',
        password_hash:
          '$2a$12$7lCxHOSbd8XIJr/D6ZMsyO90FjYxqyQWzxx/IP6fznanAS6PjqcEK',
      },
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
      { serialNumber: '1', description: 'RFID for Luke Williamson (Solo)' },
      { serialNumber: '2', description: 'RFID for Stewart Wyllie (Solo)' },
      { serialNumber: '3', description: 'RFID for Andrew McDaniel (Solo)' },
      { serialNumber: '4', description: 'RFID for Devon Chorney (Solo)' },
      { serialNumber: '5', description: 'RFID for Nelson Baetjer (Solo)' },
      { serialNumber: '6', description: 'RFID for Lauren Guillette (Solo)' },
      { serialNumber: '7', description: 'RFID for Ryan Batty (Solo)' },
      { serialNumber: '8', description: 'RFID for Nick Green (Solo)' },
      { serialNumber: '9', description: 'RFID for Moe Barzagar (Solo)' },
      { serialNumber: '10', description: 'RFID for Jeff Gerretsen (Solo)' },
      { serialNumber: '11', description: 'RFID for Bennett Douglas (Solo)' },
      { serialNumber: '12', description: 'RFID for Matt Aubin (Solo)' },
      { serialNumber: '13', description: 'RFID for Jennifer Xu (Solo)' },
      { serialNumber: '14', description: 'RFID for Brittany Foy (Solo)' },
      { serialNumber: '15', description: 'RFID for Adam Perry (Solo)' },
      { serialNumber: '16', description: 'RFID for Justin Mazzolini (Solo)' },
      { serialNumber: '17', description: 'RFID for Angela Mazzolini (Solo)' },
      { serialNumber: '18', description: 'RFID for Erica Kirkman (Solo)' },
      {
        serialNumber: '19',
        description: 'RFID for Annamarie Lottering (Solo)',
      },
      { serialNumber: '20', description: 'RFID for Barend Lottering (Solo)' },
      { serialNumber: '21', description: 'RFID for Sarah Saunders (Solo)' },
      { serialNumber: '22', description: 'RFID for Alberta SPCA Team' },
      { serialNumber: '23', description: 'RFID for BIMbros Team' },
      {
        serialNumber: '24',
        description: 'RFID for Glenrose Human Ability Team',
      },
      { serialNumber: '25', description: 'RFID for HIBCO Generals Team' },
      { serialNumber: '26', description: 'RFID for Hill Billies Team' },
      { serialNumber: '27', description: 'RFID for KEEN Team' },
      { serialNumber: '28', description: 'RFID for Like A Boss Team' },
      { serialNumber: '29', description: 'RFID for Rabbit Hill Team' },
      { serialNumber: '30', description: 'RFID for Springboks Team' },
      { serialNumber: '31', description: 'RFID for STARS Team' },
      { serialNumber: '32', description: 'RFID for Team Order' },
      { serialNumber: '33', description: 'RFID for United Nations Team' },
    ])
    console.log('Seeded base data successfully.')

    // 2. Seed Hills (depends on Location)
    console.log('Seeding Hills...')
    const hills = await Hill.insertMany([
      {
        location: locations[0]._id,
        name: 'The Grinder',
        lapElevationGain: 1451,
        lapDistance: 0.75,
        elevationUnit: 'FT',
        distanceUnit: 'KM',
      },
      {
        location: locations[0]._id,
        name: 'Easy Loop',
        lapElevationGain: 721,
        lapDistance: 0.5,
        elevationUnit: 'FT',
        distanceUnit: 'KM',
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
    // All teams use the same hill (The Grinder) but have different lap requirements based on their mountain
    const everestData = mountains.find((m) => m.name === 'Everest')
    const denaliData = mountains.find((m) => m.name === 'Denali')
    const rainierData = mountains.find((m) => m.name === 'Rainier')
    const grinderHillData = hills.find((h) => h.name === 'The Grinder')

    // Calculate laps required based on mountain elevation using the same hill
    const everestLaps = Math.ceil(
      everestData.totalElevation / grinderHillData.lapElevationGain
    ) // ~134 laps
    const everestDistance = everestLaps * grinderHillData.lapDistance // ~100.5 km
    const denaliLaps = Math.ceil(
      denaliData.totalElevation / grinderHillData.lapElevationGain
    ) // ~94 laps
    const denaliDistance = denaliLaps * grinderHillData.lapDistance // ~70.5 km
    const rainierLaps = Math.ceil(
      rainierData.totalElevation / grinderHillData.lapElevationGain
    ) // ~121 laps
    const rainierDistance = rainierLaps * grinderHillData.lapDistance // ~90.75 km

    console.log(
      `[Seed] Lap requirements: Everest=${everestLaps}, Denali=${denaliLaps}, Rainier=${rainierLaps} (all using ${grinderHillData.name})`
    )

    const teams = await Team.insertMany([
      // Solo participants (no team name) - each becomes their own team
      {
        event: events[0]._id,
        mountain: everestData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find((tag) => tag.serialNumber === '1')._id,
        name: 'Luke Williamson',
        isSoloTeam: true,
        lapsRequired: everestLaps,
        totalDistanceRequired: everestDistance,
        startDateTime: new Date('2024-09-14T08:05:00Z'),
      },
      {
        event: events[0]._id,
        mountain: everestData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find((tag) => tag.serialNumber === '2')._id,
        name: 'Stewart Wyllie',
        isSoloTeam: true,
        lapsRequired: everestLaps,
        totalDistanceRequired: everestDistance,
        startDateTime: new Date('2024-09-14T08:10:00Z'),
      },
      {
        event: events[0]._id,
        mountain: everestData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find((tag) => tag.serialNumber === '3')._id,
        name: 'Andrew McDaniel',
        isSoloTeam: true,
        lapsRequired: everestLaps,
        totalDistanceRequired: everestDistance,
        startDateTime: new Date('2024-09-14T08:15:00Z'),
      },
      {
        event: events[0]._id,
        mountain: rainierData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find((tag) => tag.serialNumber === '4')._id,
        name: 'Devon Chorney',
        isSoloTeam: true,
        lapsRequired: rainierLaps,
        totalDistanceRequired: rainierDistance,
        startDateTime: new Date('2024-09-14T08:20:00Z'),
      },
      {
        event: events[0]._id,
        mountain: everestData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find((tag) => tag.serialNumber === '5')._id,
        name: 'Nelson Baetjer',
        isSoloTeam: true,
        lapsRequired: everestLaps,
        totalDistanceRequired: everestDistance,
        startDateTime: new Date('2024-09-14T08:25:00Z'),
      },
      {
        event: events[0]._id,
        mountain: rainierData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find((tag) => tag.serialNumber === '6')._id,
        name: 'Lauren Guillette',
        isSoloTeam: true,
        lapsRequired: rainierLaps,
        totalDistanceRequired: rainierDistance,
        startDateTime: new Date('2024-09-14T08:30:00Z'),
      },
      {
        event: events[0]._id,
        mountain: denaliData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find((tag) => tag.serialNumber === '7')._id,
        name: 'Ryan Batty',
        isSoloTeam: true,
        lapsRequired: denaliLaps,
        totalDistanceRequired: denaliDistance,
        startDateTime: new Date('2024-09-14T08:35:00Z'),
      },
      {
        event: events[0]._id,
        mountain: denaliData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find((tag) => tag.serialNumber === '8')._id,
        name: 'Nick Green',
        isSoloTeam: true,
        lapsRequired: denaliLaps,
        totalDistanceRequired: denaliDistance,
        startDateTime: new Date('2024-09-14T08:40:00Z'),
      },
      {
        event: events[0]._id,
        mountain: rainierData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find((tag) => tag.serialNumber === '9')._id,
        name: 'Moe Barzagar',
        isSoloTeam: true,
        lapsRequired: rainierLaps,
        totalDistanceRequired: rainierDistance,
        startDateTime: new Date('2024-09-14T08:45:00Z'),
      },
      {
        event: events[0]._id,
        mountain: rainierData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find((tag) => tag.serialNumber === '10')._id,
        name: 'Jeff Gerretsen',
        isSoloTeam: true,
        lapsRequired: rainierLaps,
        totalDistanceRequired: rainierDistance,
        startDateTime: new Date('2024-09-14T08:50:00Z'),
      },
      {
        event: events[0]._id,
        mountain: rainierData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find((tag) => tag.serialNumber === '11')._id,
        name: 'Bennett Douglas',
        isSoloTeam: true,
        lapsRequired: rainierLaps,
        totalDistanceRequired: rainierDistance,
        startDateTime: new Date('2024-09-14T08:55:00Z'),
      },
      {
        event: events[0]._id,
        mountain: denaliData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find((tag) => tag.serialNumber === '12')._id,
        name: 'Matt Aubin',
        isSoloTeam: true,
        lapsRequired: denaliLaps,
        totalDistanceRequired: denaliDistance,
        startDateTime: new Date('2024-09-14T09:00:00Z'),
      },
      {
        event: events[0]._id,
        mountain: denaliData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find((tag) => tag.serialNumber === '13')._id,
        name: 'Jennifer Xu',
        isSoloTeam: true,
        lapsRequired: denaliLaps,
        totalDistanceRequired: denaliDistance,
        startDateTime: new Date('2024-09-14T09:05:00Z'),
      },
      {
        event: events[0]._id,
        mountain: everestData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find((tag) => tag.serialNumber === '14')._id,
        name: 'Brittany Foy',
        isSoloTeam: true,
        lapsRequired: everestLaps,
        totalDistanceRequired: everestDistance,
        startDateTime: new Date('2024-09-14T09:10:00Z'),
      },
      {
        event: events[0]._id,
        mountain: everestData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find((tag) => tag.serialNumber === '15')._id,
        name: 'Adam Perry',
        isSoloTeam: true,
        lapsRequired: everestLaps,
        totalDistanceRequired: everestDistance,
        startDateTime: new Date('2024-09-14T09:15:00Z'),
      },
      {
        event: events[0]._id,
        mountain: everestData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find((tag) => tag.serialNumber === '16')._id,
        name: 'Justin Mazzolini',
        isSoloTeam: true,
        lapsRequired: everestLaps,
        totalDistanceRequired: everestDistance,
        startDateTime: new Date('2024-09-14T09:20:00Z'),
      },
      {
        event: events[0]._id,
        mountain: everestData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find((tag) => tag.serialNumber === '17')._id,
        name: 'Angela Mazzolini',
        isSoloTeam: true,
        lapsRequired: everestLaps,
        totalDistanceRequired: everestDistance,
        startDateTime: new Date('2024-09-14T09:25:00Z'),
      },
      {
        event: events[0]._id,
        mountain: everestData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find((tag) => tag.serialNumber === '18')._id,
        name: 'Erica Kirkman',
        isSoloTeam: true,
        lapsRequired: everestLaps,
        totalDistanceRequired: everestDistance,
        startDateTime: new Date('2024-09-14T09:30:00Z'),
      },
      {
        event: events[0]._id,
        mountain: rainierData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find((tag) => tag.serialNumber === '19')._id,
        name: 'Annamarie Lottering',
        isSoloTeam: true,
        lapsRequired: rainierLaps,
        totalDistanceRequired: rainierDistance,
        startDateTime: new Date('2024-09-14T09:35:00Z'),
      },
      {
        event: events[0]._id,
        mountain: rainierData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find((tag) => tag.serialNumber === '20')._id,
        name: 'Barend Lottering',
        isSoloTeam: true,
        lapsRequired: rainierLaps,
        totalDistanceRequired: rainierDistance,
        startDateTime: new Date('2024-09-14T09:40:00Z'),
      },
      {
        event: events[0]._id,
        mountain: everestData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find((tag) => tag.serialNumber === '21')._id,
        name: 'Sarah Saunders',
        isSoloTeam: true,
        lapsRequired: everestLaps,
        totalDistanceRequired: everestDistance,
        startDateTime: new Date('2024-09-14T09:45:00Z'),
      },
      // Team participants - each team gets one RFID tag
      {
        event: events[0]._id,
        mountain: rainierData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find((tag) => tag.serialNumber === '22')._id,
        name: 'Alberta SPCA',
        isSoloTeam: false,
        lapsRequired: rainierLaps,
        totalDistanceRequired: rainierDistance,
        startDateTime: new Date('2024-09-14T09:50:00Z'),
      },
      {
        event: events[0]._id,
        mountain: denaliData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find((tag) => tag.serialNumber === '23')._id,
        name: 'BIMbros',
        isSoloTeam: false,
        lapsRequired: denaliLaps,
        totalDistanceRequired: denaliDistance,
        startDateTime: new Date('2024-09-14T09:55:00Z'),
      },
      {
        event: events[0]._id,
        mountain: everestData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find((tag) => tag.serialNumber === '24')._id,
        name: 'Glenrose Human Ability',
        isSoloTeam: false,
        lapsRequired: everestLaps,
        totalDistanceRequired: everestDistance,
        startDateTime: new Date('2024-09-14T10:00:00Z'),
      },
      {
        event: events[0]._id,
        mountain: rainierData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find((tag) => tag.serialNumber === '25')._id,
        name: 'HIBCO Generals',
        isSoloTeam: false,
        lapsRequired: rainierLaps,
        totalDistanceRequired: rainierDistance,
        startDateTime: new Date('2024-09-14T10:05:00Z'),
      },
      {
        event: events[0]._id,
        mountain: denaliData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find((tag) => tag.serialNumber === '26')._id,
        name: 'Hill Billies',
        isSoloTeam: false,
        lapsRequired: denaliLaps,
        totalDistanceRequired: denaliDistance,
        startDateTime: new Date('2024-09-14T10:10:00Z'),
      },
      {
        event: events[0]._id,
        mountain: denaliData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find((tag) => tag.serialNumber === '27')._id,
        name: 'KEEN Team',
        isSoloTeam: false,
        lapsRequired: denaliLaps,
        totalDistanceRequired: denaliDistance,
        startDateTime: new Date('2024-09-14T10:15:00Z'),
      },
      {
        event: events[0]._id,
        mountain: denaliData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find((tag) => tag.serialNumber === '28')._id,
        name: 'Like A Boss',
        isSoloTeam: false,
        lapsRequired: denaliLaps,
        totalDistanceRequired: denaliDistance,
        startDateTime: new Date('2024-09-14T10:20:00Z'),
      },
      {
        event: events[0]._id,
        mountain: rainierData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find((tag) => tag.serialNumber === '29')._id,
        name: 'Rabbit Hill',
        isSoloTeam: false,
        lapsRequired: rainierLaps,
        totalDistanceRequired: rainierDistance,
        startDateTime: new Date('2024-09-14T10:25:00Z'),
      },
      {
        event: events[0]._id,
        mountain: rainierData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find((tag) => tag.serialNumber === '30')._id,
        name: 'Springboks',
        isSoloTeam: false,
        lapsRequired: rainierLaps,
        totalDistanceRequired: rainierDistance,
        startDateTime: new Date('2024-09-14T10:30:00Z'),
      },
      {
        event: events[0]._id,
        mountain: everestData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find((tag) => tag.serialNumber === '31')._id,
        name: 'STARS',
        isSoloTeam: false,
        lapsRequired: everestLaps,
        totalDistanceRequired: everestDistance,
        startDateTime: new Date('2024-09-14T10:35:00Z'),
      },
      {
        event: events[0]._id,
        mountain: denaliData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find((tag) => tag.serialNumber === '32')._id,
        name: 'Team Order',
        isSoloTeam: false,
        lapsRequired: denaliLaps,
        totalDistanceRequired: denaliDistance,
        startDateTime: new Date('2024-09-14T10:40:00Z'),
      },
      {
        event: events[0]._id,
        mountain: denaliData._id,
        hill: grinderHillData._id,
        rfidTag: rfidTags.find((tag) => tag.serialNumber === '33')._id,
        name: 'United Nations',
        isSoloTeam: false,
        lapsRequired: denaliLaps,
        totalDistanceRequired: denaliDistance,
        startDateTime: new Date('2024-09-14T10:45:00Z'),
      },
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
        lapNumber: 1,
      },
      {
        team: teams[0]._id,
        rfidTag: teams[0].rfidTag,
        startDateTime: new Date('2024-09-14T08:12:32Z'),
        endDateTime: new Date('2024-09-14T08:20:05Z'),
        lapDuration: 7 * 60 * 1000 + 33 * 1000, // 7 minutes 33 seconds in milliseconds
        lapNumber: 2,
      },
      // 1 lap for Peak Performers
      {
        team: teams[1]._id,
        rfidTag: teams[1].rfidTag,
        startDateTime: new Date('2024-09-14T08:10:01Z'),
        endDateTime: new Date('2024-09-14T08:19:45Z'),
        lapDuration: 9 * 60 * 1000 + 44 * 1000, // 9 minutes 44 seconds in milliseconds
        lapNumber: 1,
      },
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
