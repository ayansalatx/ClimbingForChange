import { test, after, beforeEach } from 'node:test'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../../app.js'
import PhysicalMountain from '../models/physicalMountain.js'
import TargetMountain from '../models/targetMountain.js'
import assert from 'node:assert'
import { emptyTestDB } from './index.test.js'

const api = supertest(app)

const initialPhysicalMountains = [
  {
    name: 'Rabbit Hill',
    elevationPerLap: 50.0,
  },
  {
    name: 'Summer Hill',
    elevationPerLap: 45.6,
  },
]

const initialTargetMountains = [
  {
    name: 'Mount Everest',
    totalElevation: 8848,
  },
  {
    name: 'K2',
    totalElevation: 8611,
  },
]

beforeEach(async () => {
  await emptyTestDB()
  await Promise.all(initialPhysicalMountains.map(async (pm) => {
      const physicalMountainToSave = new PhysicalMountain(pm)
      return await physicalMountainToSave.save()
  }))

  await Promise.all(initialTargetMountains.map(async (tm) => {
      const tmSave = new TargetMountain(tm)
      return await tmSave.save()
  }))
})


test('Physical mountains are returned as json', async () => {
  await api
    .get('/api/mountains/physical')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('Target mountains are returned as json', async () => {
  await api
    .get('/api/mountains/target')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all physical mountains are returned', async () => {
  const response = await api.get('/api/mountains/physical')

  assert.strictEqual(response.body.length, initialPhysicalMountains.length)
})

test('all target mountains are returned', async () => {
  const response = await api.get('/api/mountains/target')

  assert.strictEqual(response.body.length, initialTargetMountains.length)
})

test('a valid physical mountains can be added', async () => {
  const newPM = {
    name: 'Small Kilimanjaro',
    elevationPerLap: 55.0,
  }

  await api.post('/api/mountains/physical').send(newPM).expect(201).expect('Content-Type', /application\/json/)

  const allMountains = await (await api.get('/api/mountains/physical')).body

  const allMountainsNames = allMountains.map(e => e.name)

  assert.strictEqual(allMountainsNames.length, initialPhysicalMountains.length + 1)
  assert(allMountainsNames.includes('Small Kilimanjaro'))

})

test('a valid target mountains can be added', async () => {
  const newPM = {
    name: 'Denali',
    totalElevation: 6190,
  }

  await api.post('/api/mountains/target').send(newPM).expect(201).expect('Content-Type', /application\/json/)

  const allMountains = await (await api.get('/api/mountains/target')).body

  const allMountainsNames = allMountains.map(e => e.name)

  assert.strictEqual(allMountainsNames.length, initialPhysicalMountains.length + 1)
  assert(allMountainsNames.includes('Denali'))

})

after(async () => {
  await mongoose.connection.close()
})