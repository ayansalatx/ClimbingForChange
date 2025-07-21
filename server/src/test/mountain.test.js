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
  loginAndGetToken,
  closeDBConnection,
  connectToTestDB,
} from './testHelper.js'

const api = supertest(app)

const initialMountainsData = [
  { name: 'Mount Everest', totalElevation: 29029, elevationUnit: 'FT' },
  { name: 'K2', totalElevation: 28251, elevationUnit: 'FT' },
]

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

  await Mountain.insertMany(initialMountainsData)
})

describe('Mountains API (/api/mountains)', () => {
  test('mountains are returned as json', async () => {
    await api
      .get('/api/mountains')
      .set('Authorization', `bearer ${authToken}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all mountains are returned', async () => {
    const response = await api
      .get('/api/mountains')
      .set('Authorization', `bearer ${authToken}`)
    assert.strictEqual(response.body.length, initialMountainsData.length)
  })

  test('a valid mountain can be added', async () => {
    const newMountain = {
      name: 'Denali',
      totalElevation: 20310,
      elevationUnit: 'FT',
    }

    await api
      .post('/api/mountains')
      .set('Authorization', `bearer ${authToken}`)
      .send(newMountain)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api
      .get('/api/mountains')
      .set('Authorization', `bearer ${authToken}`)
    const mountainNames = response.body.map(m => m.name)

    assert.strictEqual(response.body.length, initialMountainsData.length + 1)
    assert(mountainNames.includes('Denali'))
  })

  test('a mountain can be updated', async () => {
    const mountains = await api
      .get('/api/mountains')
      .set('Authorization', `bearer ${authToken}`)
    const mountainToUpdate = mountains.body[0]
    const payload = { ...mountainToUpdate, name: 'UPDATED Everest' }

    await api
      .put(`/api/mountains/${mountainToUpdate.id}`)
      .set('Authorization', `bearer ${authToken}`)
      .send(payload)
      .expect(200)

    const res = await api
      .get(`/api/mountains/${mountainToUpdate.id}`)
      .set('Authorization', `bearer ${authToken}`)
    assert.strictEqual(res.body.name, 'UPDATED Everest')
  })

  test('a mountain can be deleted', async () => {
    const mountains = await api
      .get('/api/mountains')
      .set('Authorization', `bearer ${authToken}`)
    const mountainToDelete = mountains.body[0]

    await api
      .delete(`/api/mountains/${mountainToDelete.id}`)
      .set('Authorization', `bearer ${authToken}`)
      .expect(204)

    const finalMountains = await api
      .get('/api/mountains')
      .set('Authorization', `bearer ${authToken}`)
    assert.strictEqual(
      finalMountains.body.length,
      initialMountainsData.length - 1,
    )
  })
})

after(async () => {
  await closeDBConnection()
})
