import { test, after, beforeEach } from 'node:test'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../../app.js'
import assert from 'node:assert'

import Location from '../models/location.js'
import Hill from '../models/hill.js'
import Mountain from '../models/mountain.js'
import RFIDTag from '../models/rfidTag.js'
import Event from '../models/event.js'
import Team from '../models/team.js'
import Participant from '../models/participant.js'
import Lap from '../models/lap.js'

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

beforeEach(async () => {
  await emptyTestDB()
  await Location.insertMany(initialLocations)
})


test('locations are returned as json', async () => {
  await api
    .get('/api/locations')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all locations are returned', async () => {
  const response = await api.get('/api/locations')
  assert.strictEqual(response.body.length, initialLocations.length)
})

test('a valid location can be added', async () => {
  const newLocation = {
    name: 'Whistler Summit',
    address: '789 Alpine Way',
    city: 'Whistler',
    provState: 'BC',
    country: 'Canada',
  }

  await api
    .post('/api/locations')
    .send(newLocation)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/locations')
  const allLocationNames = response.body.map(l => l.name)

  assert.strictEqual(response.body.length, initialLocations.length + 1)
  assert(allLocationNames.includes('Whistler Summit'))
})

test('an existing location can be updated', async () => {
  const allLocationsAtStart = await api.get('/api/locations')
  const locationToUpdate = allLocationsAtStart.body[0]

  const updatePayload = {
    address: '123 NEW Mountain Road',
    city: 'Canmore',
  }

  await api
    .put(`/api/locations/${locationToUpdate.id}`)
    .send(updatePayload)
    .expect(200)

  const response = await api.get(`/api/locations/${locationToUpdate.id}`)
  const updatedLocation = response.body

  assert.strictEqual(updatedLocation.address, '123 NEW Mountain Road')
  assert.strictEqual(updatedLocation.city, 'Canmore')
  // Check that other fields are unchanged
  assert.strictEqual(updatedLocation.name, locationToUpdate.name)
})


test('a location can be deleted', async () => {
  const allLocationsAtStart = await api.get('/api/locations')
  const locationToDelete = allLocationsAtStart.body[0]
  const initialCount = allLocationsAtStart.body.length

  await api
    .delete(`/api/locations/${locationToDelete.id}`)
    .expect(204) // 204 No Content

  const allLocationsAtEnd = await api.get('/api/locations')
  assert.strictEqual(allLocationsAtEnd.body.length, initialCount - 1)

  const locationIds = allLocationsAtEnd.body.map(l => l.id)
  assert(!locationIds.includes(locationToDelete.id), 'Deleted location ID should not exist')
})


after(async () => {
  await mongoose.connection.close()
})