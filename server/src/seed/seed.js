import mongoose from '../utils/db.js'
import Location from '../models/location.js'
import PhysicalMountain from '../models/physicalMountain.js'
import TargetMountain from '../models/targetMountain.js'
import RFIDTag from '../models/rfidTag.js'
import Event from '../models/event.js'
import Team from '../models/team.js'
import Participant from '../models/participant.js'
import Lap from '../models/lap.js'

import {
  dummyLocations,
  dummyPhysicalMountains,
  dummyTargetMountains,
  dummyRFIDTags,
  dummyEvents,
  dummyParticipantsAndTeams
} from './seedData.js'


const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...')
    await mongoose.connection.asPromise()
    console.log('Connected to MongoDB.')

    console.log('Clearing existing data...')
    await Promise.all([
      Location.collection.drop().catch(e => { if (e.codeName !== 'NamespaceNotFound') throw e; }), // Drop collection, ignore if not found
      PhysicalMountain.collection.drop().catch(e => { if (e.codeName !== 'NamespaceNotFound') throw e; }),
      TargetMountain.collection.drop().catch(e => { if (e.codeName !== 'NamespaceNotFound') throw e; }),
      RFIDTag.collection.drop().catch(e => { if (e.codeName !== 'NamespaceNotFound') throw e; }),
      Event.collection.drop().catch(e => { if (e.codeName !== 'NamespaceNotFound') throw e; }),
      Team.collection.drop().catch(e => { if (e.codeName !== 'NamespaceNotFound') throw e; }),
      Participant.collection.drop().catch(e => { if (e.codeName !== 'NamespaceNotFound') throw e; }),
      Lap.collection.drop().catch(e => { if (e.codeName !== 'NamespaceNotFound') throw e; }),
    ]);
    console.log('Existing data cleared.')

    console.log('Inserting Locations...')
    const insertedLocations = await Location.insertMany(dummyLocations)
    const locationMap = new Map(insertedLocations.map(loc => [loc.name, loc._id]))
    console.log('Locations inserted.')

    console.log('Inserting Physical Mountains...')
    const insertedPhysicalMountains = await PhysicalMountain.insertMany(dummyPhysicalMountains)
    const physicalMountainMap = new Map(insertedPhysicalMountains.map(pm => [pm.name, pm._id]))
    console.log('Physical Mountains inserted.')

    console.log('Inserting Target Mountains...')
    const insertedTargetMountains = await TargetMountain.insertMany(dummyTargetMountains)
    const targetMountainMap = new Map(insertedTargetMountains.map(tm => [tm.name, tm._id]))
    console.log('Target Mountains inserted.')

    console.log('Inserting RFID Tags...')
    const insertedRFIDTags = await RFIDTag.insertMany(dummyRFIDTags)
    const rfidTagMap = new Map(insertedRFIDTags.map(tag => [tag.serialNumber, tag._id]))
    console.log('RFID Tags inserted.')

    console.log('Inserting Events...')
    const eventsToInsert = dummyEvents.map(eventData => ({
      ...eventData,
      locationId: locationMap.get(eventData.locationName),
      physicalMountainIds: eventData.physicalMountainNames.map(name => physicalMountainMap.get(name)),
    }))
    const insertedEvents = await Event.insertMany(eventsToInsert)

    const eventMap = new Map(insertedEvents.map(event => [`${event.name}-${locationMap.get(dummyEvents.find(e => e.name === event.name).locationName).toString()}`, event._id]))
    console.log('Events inserted.')

    console.log('Inserting Teams and Participants...')
    const insertedTeams = []
    const insertedParticipants = []

    for (const teamData of dummyParticipantsAndTeams) {
      const eventId = eventMap.get(`${teamData.eventLookup.name}-${locationMap.get(teamData.eventLookup.locationName).toString()}`)
      const physicalMountainId = physicalMountainMap.get(teamData.physicalMountainName)
      const targetMountainId = targetMountainMap.get(teamData.targetMountainName)

      if (!eventId || !physicalMountainId || !targetMountainId) {
        console.error(`Skipping team ${teamData.teamName}: Missing reference. Event ID: ${eventId}, Physical Mtn ID: ${physicalMountainId}, Target Mtn ID: ${targetMountainId}`)
        continue
      }

      const targetMtn = insertedTargetMountains.find(m => m._id.equals(targetMountainId))
      const physicalMtn = insertedPhysicalMountains.find(m => m._id.equals(physicalMountainId))
      const lapsRequired = Math.ceil(targetMtn.totalElevation / physicalMtn.elevationPerLap)

      const newTeam = await Team.create({
        name: teamData.teamName,
        isSoloTeam: teamData.isSoloTeam,
        eventId,
        physicalMountainId,
        targetMountainId,
        lapsRequired,
        startDateTime: teamData.startDateTime,
      })
      insertedTeams.push(newTeam)

      for (const participantData of teamData.participants) {
        const rfidTagId = rfidTagMap.get(participantData.rfidSerialNumber)
        // if (!rfidTagId) {
        //   console.error(`Skipping participant ${participantData.firstName} ${participantData.lastName}: RFID tag not found for serial ${participantData.rfidSerialNumber}`)
        //   continue
        // }

        const newParticipant = await Participant.create({
          firstName: participantData.firstName,
          lastName: participantData.lastName,
          teamId: newTeam._id,
          rfidTagId,
        })
        insertedParticipants.push(newParticipant)
      }
    }
    console.log('Teams and Participants inserted.')

    if (insertedParticipants.length > 0) {
      console.log('Inserting sample Lap data...')
      const sampleParticipant = insertedParticipants[0]
      const sampleTeam = insertedTeams.find(team => team._id.equals(sampleParticipant.teamId))
      const sampleRFIDTag = insertedRFIDTags.find(tag => tag._id.equals(sampleParticipant.rfidTagId))

      if (sampleParticipant && sampleTeam && sampleRFIDTag) {
        await Lap.create({
          teamId: sampleTeam._id,
          participantId: sampleParticipant._id,
          rfidTagId: sampleRFIDTag._id,
          startDateTime: new Date(sampleTeam.startDateTime.getTime() + 5 * 60 * 1000), // 5 mins after team start
          endDateTime: new Date(sampleTeam.startDateTime.getTime() + 10 * 60 * 1000), // 10 mins after team start
        })
        console.log('Sample Lap inserted.')
      }
    }

    console.log('Database seeding complete!')
  } catch (error) {
    console.error('Database seeding failed:', error)
  } finally {
    console.log('Closing MongoDB connection.')
    await mongoose.connection.close()
  }
}

seedDatabase()