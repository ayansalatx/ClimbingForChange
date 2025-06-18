import { test, after, beforeEach } from 'node:test'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../../app.js'
import assert from 'node:assert'
import Location from '../models/location.js'
import PhysicalMountain from '../models/physicalMountain.js'
import TargetMountain from '../models/targetMountain.js'
import RFIDTag from '../models/rfidTag.js'
import Event from '../models/event.js'
import Team from '../models/team.js'
import Participant from '../models/participant.js'
import Lap from '../models/lap.js'

export const emptyTestDB = async () => {
  await Promise.all([
    Location.deleteMany({}),
    PhysicalMountain.deleteMany({}),
    TargetMountain.deleteMany({}),
    RFIDTag.deleteMany({}),
    Event.deleteMany({}),
    Team.deleteMany({}),
    Participant.deleteMany({}),
    Lap.deleteMany({}),
  ])
}

const api = supertest(app)

const initialEvents = [
  {
    name: 'Charity Mountain Hike',
    locationName: 'Rocky Ridge Park',
    startDateTime: new Date('2025-07-12T09:00:00Z'),
    endDateTime: new Date('2025-07-12T12:30:00Z'),
    physicalMountainNames: ['Rabbit Hill', 'Summer Hill'],
    active: true,
  },
  {
    name: 'City Skyline Climb',
    locationName: 'City Skyline Trail',
    startDateTime: new Date('2025-08-05T07:00:00Z'),
    endDateTime: new Date('2025-08-05T09:00:00Z'),
    physicalMountainNames: ['Groove Climb'],
    active: true,
  },
  {
    name: 'Whistler Alpine Challenge',
    locationName: 'Whistler Summit',
    startDateTime: new Date('2025-09-01T06:30:00Z'),
    endDateTime: new Date('2025-09-01T11:00:00Z'),
    physicalMountainNames: ['Small Kilimanjaro'],
    active: false,
  },
]

const initialLocations = new Map()

const initialPhysicalMountainNames = new Map()

initialPhysicalMountainNames.set('Charity Mountain Hike', [{
  name: 'Rabbit Hill',
  elevationPerLap: 50.0,
}, {
  name: 'Summer Hill',
  elevationPerLap: 45.6,
}])

initialPhysicalMountainNames.set('City Skyline Climb', [{name: 'Groove Climb', elevationPerLap: 51.2,}])
initialPhysicalMountainNames.set('Whistler Alpine Challenge', [{name: 'Small Kilimanjaro', elevationPerLap: 55.0,}])

initialLocations.set('Rocky Ridge Park', {
  name: 'Rocky Ridge Park',
  address: '123 Mountain Road',
  city: 'Banff',
  provState: 'Alberta',
  country: 'Canada',

})
initialLocations.set('City Skyline Trail', {
  name: 'City Skyline Trail',
  address: '456 Downtown Ave',
  city: 'Edmonton',
  provState: 'Alberta',
  country: 'Canada',

})
initialLocations.set('Whistler Summit', {
  name: 'Whistler Summit',
  address: '456 Downtown Ave',
  city: 'Edmonton',
  provState: 'Alberta',
  country: 'Canada',

})

let somePhysicalMountains = []
let aLocationId = '' 

beforeEach(async () => {
  await emptyTestDB()

  await Promise.all(initialEvents.map(async (e) => {

    const physicalMountains = await PhysicalMountain.insertMany(initialPhysicalMountainNames.get(e.name))
    const physicalMountainsIDs = physicalMountains.map(p => p.id)
    somePhysicalMountains = physicalMountainsIDs

    const location = await Location.insertOne(initialLocations.get(e.locationName))
    aLocationId = location.id
    const refidTagToSave = new Event({
      name: e.name,
      locationId: location.id,
      physicalMountainIds: physicalMountainsIDs,
      startDateTime: e.startDateTime,
      endDateTime: e.endDateTime,
      active: e.active,
    })
    return await refidTagToSave.save()
  }))
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
    name: 'Whistler Summit Trail',
    locationId: aLocationId,
    physicalMountainIds: somePhysicalMountains,
    startDateTime: new Date('2025-09-01T06:30:00Z'),
    endDateTime: new Date('2025-09-01T11:00:00Z'),
    active: false
  }

  await api.post('/api/events').send(newEvent).expect(201).expect('Content-Type', /application\/json/)

  const allEvents = await (await api.get('/api/events')).body

  const allEventsNames = allEvents.map(e => e.name)

  assert.strictEqual(allEvents.length, initialEvents.length + 1)
  assert(allEventsNames.includes('Whistler Summit Trail'))

})

after(async () => {
  await mongoose.connection.close()
})