import { test, after, beforeEach } from 'node:test'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../../app.js'
import Location from '../models/location.js'
import assert from 'node:assert'
import { emptyTestDB } from './index.test.js'

const api = supertest(app)

const initialLocations = [
  {
    name: 'Rocky Ridge Park',
    address: '123 Mountain Road',
    city: 'Banff',
    provState: 'Alberta',
    country: 'Canada',

  },
  {
    name: 'City Skyline Trail',
    address: '456 Downtown Ave',
    city: 'Edmonton',
    provState: 'Alberta',
    country: 'Canada',
  },
]

beforeEach(async () => {
  await emptyTestDB()
  await Promise.all(initialLocations.map(async (l) => {
    const locationToSave = new Location(l)
    return await locationToSave.save()
  }))
})


test('Locations are returned as json', async () => {
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
    provState: 'British Columbia',
    country: 'Canada',
    lap: '8km Ascent',
    active: false,
  }

  await api.post('/api/locations').send(newLocation).expect(201).expect('Content-Type', /application\/json/)

  const allLocations = await (await api.get('/api/locations')).body

  const allLocationsNames = allLocations.map(e => e.name)

  assert.strictEqual(allLocationsNames.length, initialLocations.length + 1)
  assert(allLocationsNames.includes('Whistler Summit'))

})

after(async () => {
  await mongoose.connection.close()
})