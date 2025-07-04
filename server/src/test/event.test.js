import { test, after, beforeEach } from 'node:test'
import mongoose from 'mongoose'
import supertest from 'supertest'
import assert from 'node:assert'
import app from '../../app.js'

import Location from '../models/location.js'
import Hill from '../models/hill.js'
import Mountain from '../models/mountain.js'
import Event from '../models/event.js'
import Team from '../models/team.js'
import Participant from '../models/participant.js'
import Lap from '../models/lap.js'
import RFIDTag from '../models/rfidTag.js'

// Helper to clear the database before each test run
export const emptyTestDB = async () => {
  await Promise.all([
    Location.deleteMany({}),
    Hill.deleteMany({}),
    Mountain.deleteMany({}),
    RFIDTag.deleteMany({}),
    Event.deleteMany({}),
    Team.deleteMany({}),
    Participant.deleteMany({}),
    Lap.deleteMany({}),
  ])
}

const api = supertest(app)

const initialLocations = [
  {
    name: 'Rocky Ridge Park',
    address: '123 Mountain Road',
    city: 'Banff',
    provState: 'AB',
    country: 'Canada',
  },
  {
    name: 'City Skyline Trail',
    address: '456 Downtown Ave',
    city: 'Edmonton',
    provState: 'AB',
    country: 'Canada',
  },
]

const initialHills = [
  {
    locationName: 'Rocky Ridge Park',
    name: 'Rabbit Hill',
    lapElevationGain: 50.0,
    lapDistance: 1.2,
  },
  {
    locationName: 'Rocky Ridge Park',
    name: 'Summer Hill',
    lapElevationGain: 45.6,
    lapDistance: 1.0,
  },
  {
    locationName: 'City Skyline Trail',
    name: 'Groove Climb',
    lapElevationGain: 51.2,
    lapDistance: 0.8,
  },
]

const initialMountains = [
  { name: 'Everest', totalElevation: 29029 },
  { name: 'Denali', totalElevation: 20310 },
]

const initialEvents = [
  {
    name: 'Charity Mountain Hike',
    locationName: 'Rocky Ridge Park',
    startDateTime: new Date('2025-07-12T09:00:00Z'),
    endDateTime: new Date('2025-07-12T12:30:00Z'),
    availableHillNames: ['Rabbit Hill', 'Summer Hill'],
    availableMountainNames: ['Everest', 'Denali'],
    active: true,
  },
  {
    name: 'City Skyline Climb',
    locationName: 'City Skyline Trail',
    startDateTime: new Date('2025-08-05T07:00:00Z'),
    endDateTime: new Date('2025-08-05T09:00:00Z'),
    availableHillNames: ['Groove Climb'],
    availableMountainNames: ['Denali'],
    active: false,
  },
]

let aLocationId = ''
let someHillIds = []
let someMountainIds = []

beforeEach(async () => {
  await emptyTestDB()

  // 1. Create all dependent entities first
  const createdLocations = await Location.insertMany(initialLocations)
  const createdMountains = await Mountain.insertMany(initialMountains)

  const hillsToCreate = initialHills.map((hill) => {
    const location = createdLocations.find((l) => l.name === hill.locationName)
    return { ...hill, location: location._id }
  })
  const createdHills = await Hill.insertMany(hillsToCreate)

  // 2. Create the Events using the IDs from the created entities
  const eventPromises = initialEvents.map((eventData) => {
    const location = createdLocations.find(
      (l) => l.name === eventData.locationName
    )
    const hills = createdHills.filter((h) =>
      eventData.availableHillNames.includes(h.name)
    )
    const mountains = createdMountains.filter((m) =>
      eventData.availableMountainNames.includes(m.name)
    )

    const newEvent = new Event({
      name: eventData.name,
      location: location._id,
      startDateTime: eventData.startDateTime,
      endDateTime: eventData.endDateTime,
      availableHills: hills.map((h) => h._id),
      availableMountains: mountains.map((m) => m._id),
      active: eventData.active,
    })

    return newEvent.save()
  })

  await Promise.all(eventPromises)

  // 3. Save some IDs for the 'add event' test
  aLocationId = createdLocations[0]._id.toString()
  someHillIds = createdHills
    .filter((h) => h.location.equals(aLocationId))
    .map((h) => h._id.toString())
  someMountainIds = createdMountains.map((m) => m._id.toString())
})

test('events are returned as json', async () => {
  await api
    .get('/api/events')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all events are returned', async () => {
  const response = await api.get('/api/events')
  assert.strictEqual(response.body.length, initialEvents.length)
})

test('a valid event can be added', async () => {
  const newEvent = {
    name: 'New Test Event',
    location: aLocationId,
    startDateTime: new Date('2025-09-01T06:30:00Z'),
    endDateTime: new Date('2025-09-01T11:00:00Z'),
    hills: someHillIds,
    mountains: [someMountainIds[0]],
    active: true,
  }

  await api
    .post('/api/events')
    .send(newEvent)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/events')
  const allEventNames = response.body.map((e) => e.name)

  assert.strictEqual(response.body.length, initialEvents.length + 1)
  assert(
    allEventNames.includes('New Test Event'),
    'The new event name should be in the list'
  )
})

test('an existing event can be updated', async () => {
  const allEventsAtStart = await api.get('/api/events')
  const eventToUpdate = allEventsAtStart.body[0]

  const updatePayload = {
    name: 'Updated Event Name!',
    location: eventToUpdate.location.id,
    startDateTime: eventToUpdate.startDateTime,
    endDateTime: eventToUpdate.endDateTime,
    active: false,
    mountains: someMountainIds,
    hills: someHillIds,
  }

  await api
    .put(`/api/events/${eventToUpdate.id}`)
    .send(updatePayload)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get(`/api/events/${eventToUpdate.id}`)
  const updatedEventFromDB = response.body

  assert.strictEqual(updatedEventFromDB.name, 'Updated Event Name!')
  assert.strictEqual(updatedEventFromDB.active, false)
  assert.strictEqual(
    updatedEventFromDB.mountains.length,
    someMountainIds.length
  )
})

test('an event can be deleted', async () => {
  const allEventsAtStart = await api.get('/api/events')
  const eventToDelete = allEventsAtStart.body[0]
  const initialCount = allEventsAtStart.body.length

  await api.delete(`/api/events/${eventToDelete.id}`).expect(204)

  const allEventsAtEnd = await api.get('/api/events')
  assert.strictEqual(allEventsAtEnd.body.length, initialCount - 1)

  // Verify that the specific event is no longer in the list
  const eventIdsAtEnd = allEventsAtEnd.body.map((e) => e.id)
  assert(
    !eventIdsAtEnd.includes(eventToDelete.id),
    'The deleted event ID should not be found'
  )
})

after(async () => {
  await mongoose.connection.close()
})
