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
import { closeDBConnection, connectToTestDB, loginAndGetToken } from './testHelper.js'

const api = supertest(app)

let anEventId = ''
let aMountainId = ''
let aHillId = ''
let anRfidTagId = ''
let initialTeamId = ''

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

  // 1. Create all independent/prerequisite documents first
  const location = await new Location({ name: 'Test Park', address: '1 Test St', city: 'Testville', provState: 'TS', country: 'Testland' }).save()
  const mountain = await new Mountain({ name: 'Test Mountain', totalElevation: 1000 }).save()
  const hill = await new Hill({ name: 'Test Hill', location: location._id, lapElevationGain: 100, lapDistance: 1 }).save()
  const rfidTag = await new RFIDTag({ serialNumber: 'TAG-INITIAL' }).save()
  const event = await new Event({
    name: 'Test Event', location: location._id, startDateTime: new Date(), endDateTime: new Date(),
    availableHills: [hill._id], availableMountains: [mountain._id]
  }).save()

  // 2. Store IDs for use in tests
  anEventId = event._id
  aMountainId = mountain._id
  aHillId = hill._id
  anRfidTagId = rfidTag._id

  // 3. Create an initial Team to test GET, UPDATE, and DELETE
  const initialTeam = await new Team({
    name: 'The First Climbers',
    event: anEventId,
    mountain: aMountainId,
    hill: aHillId,
    rfidTagId: anRfidTagId,
    lapsRequired: 10,
    totalDistanceRequired: 10,
    startDateTime: new Date(),
  }).save()
  initialTeamId = initialTeam._id

  // 4. Create a participant and assign them to the team to test virtual population
  await new Participant({ firstName: 'Alex', lastName: 'Jones', team: initialTeamId }).save()
})


describe('Teams API (/api/teams)', () => {

  test('teams are returned as json', async () => {
    await api
      .get('/api/teams')
      .set('Authorization', `bearer ${authToken}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all teams are returned', async () => {
    const response = await api.get('/api/teams').set('Authorization', `bearer ${authToken}`)
    assert.strictEqual(response.body.length, 1)
  })

  test('a single team can be fetched and includes participants', async () => {
    const response = await api
      .get(`/api/teams/${initialTeamId}`).set('Authorization', `bearer ${authToken}`)
      .expect(200)

    const team = response.body
    assert.strictEqual(team.name, 'The First Climbers')

    // Test that the virtual 'participants' field is populated
    assert(Array.isArray(team.participants), 'Participants field should be an array')
    assert.strictEqual(team.participants.length, 1)
    assert.strictEqual(team.participants[0].firstName, 'Alex')
  })

  test('a valid team can be added', async () => {
    const newTeamPayload = {
      name: 'The Second Wave',
      event: anEventId,
      mountain: aMountainId,
      hill: aHillId,
      // Note: No RFID tag to test optionality
      lapsRequired: 10,
      totalDistanceRequired: 10,
      isSoloTeam: true,
      startDateTime: new Date(),
    }

    await api
      .post('/api/teams')
      .set('Authorization', `bearer ${authToken}`)
      .send(newTeamPayload)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/teams').set('Authorization', `bearer ${authToken}`)
    const teamNames = response.body.map(t => t.name)

    assert.strictEqual(response.body.length, 2)
    assert(teamNames.includes('The Second Wave'))
  })

  test('a team can be updated', async () => {
    const response = await api
      .get(`/api/teams/${initialTeamId}`)
      .set('Authorization', `bearer ${authToken}`)

    const teamToUpdate = response.body

    const updatePayload = {
      ...teamToUpdate,
      name: 'The First Climbers - Updated Name',
      isSoloTeam: true,
    }

    await api
      .put(`/api/teams/${initialTeamId}`)
      .set('Authorization', `bearer ${authToken}`)
      .send(updatePayload)
      .expect(200)

    const res = await api.get(`/api/teams/${initialTeamId}`).set('Authorization', `bearer ${authToken}`)
    assert.strictEqual(res.body.name, 'The First Climbers - Updated Name')
    assert.strictEqual(res.body.isSoloTeam, true)
  })

  test('a team can be deleted', async () => {
    await api
      .delete(`/api/teams/${initialTeamId}`)
      .set('Authorization', `bearer ${authToken}`)
      .expect(204)

    const response = await api.get('/api/teams').set('Authorization', `bearer ${authToken}`)
    assert.strictEqual(response.body.length, 0)
  })

})


after(async () => {
  await closeDBConnection()
})