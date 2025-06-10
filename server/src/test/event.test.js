import { test, after, beforeEach } from 'node:test'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../../app.js'
import Event from '../models/event.js'
import assert from 'node:assert'

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
]

beforeEach(async () => {
  await Event.deleteMany({})
  let eventObject = new Event(initialEvents[0])
  await eventObject.save()
  eventObject = new Event(initialEvents[1])
  await eventObject.save()
})


test('events are returned as json', async () => {
  await api
    .get('/api/events')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all events are returned', async () => {
  const response = await api.get('/api/events')

  assert.strictEqual(response.body.length, 2)
})

test('a valid event can be added', async () => {
  const newEvent = {
    eventName: 'Whistler Summit Trail',
    location: 'Whistler Alpine Network',
    startDate: new Date('2025-09-01T06:30:00Z'),
    endDate: new Date('2025-09-01T11:00:00Z'),
    duration: 270,
    lap: 3,
    active: false
  }

  await api.post('/api/events').send(newEvent).expect(201).expect('Content-Type', /application\/json/)

  const allEvents = await (await api.get('/api/events')).body

  const allEventsNames = allEvents.map(e => e.eventName)

  assert.strictEqual(allEvents.length, initialEvents.length + 1)
  assert(allEventsNames.includes('Whistler Summit Trail'))

})

after(async () => {
  await mongoose.connection.close()
})