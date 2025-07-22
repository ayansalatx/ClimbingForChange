import { test, describe, after, beforeEach, before } from 'node:test'
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
import {
  closeDBConnection,
  connectToTestDB,
  loginAndGetToken,
} from './testHelper.js'

const api = supertest(app)

const initialHillsData = [
  {
    name: 'Rabbit Hill',
    lapElevationGain: 50.0,
    lapDistance: 1.2,
    elevationUnit: 'FT',
    distanceUnit: 'KM',
  },
  {
    name: 'Summer Hill',
    lapElevationGain: 45.6,
    lapDistance: 1.0,
    elevationUnit: 'FT',
    distanceUnit: 'KM',
  },
]

let aLocationId = ''

let authToken = ''

before(async () => {
  await connectToTestDB()
  authToken = await loginAndGetToken()
})

beforeEach(async () => {
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

  const location = await new Location({
    name: 'Test Park',
    address: '1 Test St',
    city: 'Testville',
    provState: 'TS',
    country: 'Testland',
  }).save()
  aLocationId = location.id

  const hillsToCreate = initialHillsData.map(h => ({
    ...h,
    location: aLocationId,
  }))
  await Hill.insertMany(hillsToCreate)
})

describe('Hills API (/api/hills)', () => {
  test('hills are returned as json', async () => {
    await api
      .get('/api/hills')
      .set('Authorization', `bearer ${authToken}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all hills are returned', async () => {
    const response = await api
      .get('/api/hills')
      .set('Authorization', `bearer ${authToken}`)
    assert.strictEqual(response.body.length, initialHillsData.length)
  })

  test('a valid hill can be added', async () => {
    const newHill = {
      name: 'The Grinder',
      lapElevationGain: 217,
      lapDistance: 0.75,
      location: aLocationId,
    }

    await api
      .post('/api/hills')
      .set('Authorization', `bearer ${authToken}`)
      .send(newHill)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api
      .get('/api/hills')
      .set('Authorization', `bearer ${authToken}`)
    const hillNames = response.body.map(h => h.name)

    assert.strictEqual(response.body.length, initialHillsData.length + 1)
    assert(hillNames.includes('The Grinder'))
  })

  test('a hill can be updated', async () => {
    const hills = await api
      .get('/api/hills')
      .set('Authorization', `bearer ${authToken}`)
    const hillToUpdate = hills.body[0]
    const payload = { ...hillToUpdate, lapDistance: 99.9 }

    await api
      .put(`/api/hills/${hillToUpdate.id}`)
      .set('Authorization', `bearer ${authToken}`)
      .send(payload)
      .expect(200)

    const res = await api
      .get(`/api/hills/${hillToUpdate.id}`)
      .set('Authorization', `bearer ${authToken}`)
    assert.strictEqual(res.body.lapDistance, 99.9)
  })

  test('a hill can be deleted', async () => {
    const hills = await api
      .get('/api/hills')
      .set('Authorization', `bearer ${authToken}`)
    const hillToDelete = hills.body[0]

    await api
      .delete(`/api/hills/${hillToDelete.id}`)
      .set('Authorization', `bearer ${authToken}`)
      .expect(204)

    const finalHills = await api
      .get('/api/hills')
      .set('Authorization', `bearer ${authToken}`)
    assert.strictEqual(finalHills.body.length, initialHillsData.length - 1)
  })
})

after(async () => {
  await closeDBConnection()
})
