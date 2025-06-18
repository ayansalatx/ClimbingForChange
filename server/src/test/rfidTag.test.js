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

const initialRFIDTags = [
  { serialNumber: 'RFID001' },
  { serialNumber: 'RFID002' },
  { serialNumber: 'RFID003' },
]

beforeEach(async () => {
  await emptyTestDB()
  await Promise.all(initialRFIDTags.map(async (t) => {
    const refidTagToSave = new RFIDTag(t)
    return await refidTagToSave.save()
  }))
})


test('RFIDTags are returned as json', async () => {
  await api
    .get('/api/rfidtags')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all rfid are returned', async () => {
  const response = await api.get('/api/rfidtags')

  assert.strictEqual(response.body.length, initialRFIDTags.length)
})

test('a valid rfid can be added', async () => {
  const newLocation = {
    serialNumber: 'RFID003',
  }

  await api.post('/api/rfidtags').send(newLocation).expect(201).expect('Content-Type', /application\/json/)

  const allLocations = await (await api.get('/api/rfidtags')).body

  const allLocationsNames = allLocations.map(e => e.serialNumber)

  assert.strictEqual(allLocationsNames.length, initialRFIDTags.length + 1)
  assert(allLocationsNames.includes('RFID003'))

})

after(async () => {
  await mongoose.connection.close()
})