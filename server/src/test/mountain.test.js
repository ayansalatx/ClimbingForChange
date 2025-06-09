import { test, after, beforeEach } from 'node:test'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../../app.js'
import Mountain from '../models/Mountain.js'
import assert from 'node:assert'

const api = supertest(app)

const initialMountains = [
  {
    name: 'Mount Everest',
    elevation: 8848,
    active: true
  },
  {
    name: 'K2',
    elevation: 8611,
    active: true
  },
  {
    name: 'Denali',
    elevation: 6190,
    active: true
  },
]

beforeEach(async () => {
  await Mountain.deleteMany({})
  let locationToSave = new Mountain(initialMountains[0])
  await locationToSave.save()
  locationToSave = new Mountain(initialMountains[1])
  await locationToSave.save()
  locationToSave = new Mountain(initialMountains[2])
  await locationToSave.save()
  // Promise.all(initialLocations.map(async (l) => {
  //     const locationToSave = new Location(l)
  //     return await locationToSave.save()
  // }))
})


test('Mountains are returned as json', async () => {
  await api
    .get('/api/mountains')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all mountains are returned', async () => {
  const response = await api.get('/api/mountains')

  assert.strictEqual(response.body.length, initialMountains.length)
})

test('a valid mountains can be added', async () => {
  const newMountain = {
    name: 'Mount Kilimanjaro',
    elevation: 5895,
    active: true
  }

  await api.post('/api/mountains').send(newMountain).expect(201).expect('Content-Type', /application\/json/)

  const allMountains = await (await api.get('/api/mountains')).body

  const allMountainsNames = allMountains.map(e => e.name)

  assert.strictEqual(allMountainsNames.length, initialMountains.length + 1)
  assert(allMountainsNames.includes('Mount Kilimanjaro'))

})

after(async () => {
  await mongoose.connection.close()
})