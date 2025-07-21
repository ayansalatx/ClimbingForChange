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

const initialRFIDTags = [
  { serialNumber: 'RFID001' },
  { serialNumber: 'RFID002' },
  { serialNumber: 'RFID003' },
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

  await RFIDTag.insertMany(initialRFIDTags)
})

describe('RFID Tags API (/api/rfidtags)', () => {
  test('RFID tags are returned as json', async () => {
    await api
      .get('/api/rfidtags')
      .set('Authorization', `bearer ${authToken}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all RFID tags are returned', async () => {
    const response = await api
      .get('/api/rfidtags')
      .set('Authorization', `bearer ${authToken}`)
    assert.strictEqual(response.body.length, initialRFIDTags.length)
  })

  test('a valid RFID tag can be added', async () => {
    const newRFIDTag = {
      serialNumber: 'RFID999',
    }

    await api
      .post('/api/rfidtags')
      .set('Authorization', `bearer ${authToken}`)
      .send(newRFIDTag)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api
      .get('/api/rfidtags')
      .set('Authorization', `bearer ${authToken}`)
    const allSerialNumbers = response.body.map(t => t.serialNumber)

    assert.strictEqual(response.body.length, initialRFIDTags.length + 1)
    assert(allSerialNumbers.includes('RFID999'))
  })

  test('an RFID tag can be updated', async () => {
    const tagsAtStart = await api
      .get('/api/rfidtags')
      .set('Authorization', `bearer ${authToken}`)
    const tagToUpdate = tagsAtStart.body[0]

    const payload = {
      serialNumber: 'UPDATED-RFID-001',
    }

    await api
      .put(`/api/rfidtags/${tagToUpdate.id}`)
      .set('Authorization', `bearer ${authToken}`)
      .send(payload)
      .expect(200)

    const res = await api
      .get(`/api/rfidtags/${tagToUpdate.id}`)
      .set('Authorization', `bearer ${authToken}`)

    assert.strictEqual(res.body.serialNumber, 'UPDATED-RFID-001')
  })

  test('an RFID tag can be deleted', async () => {
    const tagsAtStart = await api
      .get('/api/rfidtags')
      .set('Authorization', `bearer ${authToken}`)
    const tagToDelete = tagsAtStart.body[0]

    await api
      .delete(`/api/rfidtags/${tagToDelete.id}`)
      .set('Authorization', `bearer ${authToken}`)
      .expect(204)

    const tagsAtEnd = await api
      .get('/api/rfidtags')
      .set('Authorization', `bearer ${authToken}`)
    const finalIds = tagsAtEnd.body.map(t => t.id)

    assert.strictEqual(tagsAtEnd.body.length, initialRFIDTags.length - 1)
    assert(!finalIds.includes(tagToDelete.id))
  })
})

after(async () => {
  await closeDBConnection()
})
