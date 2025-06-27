import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../../app.js'

import Location from '../models/location.js'
import Hill from '../models/hill.js'
import Mountain from '../models/mountain.js'
import User from '../models/user.js'

import RFIDTag from '../models/rfidTag.js'
import Event from '../models/event.js'
import Team from '../models/team.js'
import Participant from '../models/participant.js'
import Lap from '../models/lap.js'


export const api = supertest(app)

const testUser = {
  username: 'admin',
  password: '12345678'
}
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
        User.deleteMany({}),
  ])
}

export let authToken = ''

// --- EXPORT VARIABLES TO HOLD SHARED IDs ---
export let aLocationId = ''
export let aTeamId = ''

export const setupTestUserAndGetToken  = async () => {
  await User.deleteMany({})
  await User.create({
    username: testUser.username,
    password_hash: '$2a$12$7lCxHOSbd8XIJr/D6ZMsyO90FjYxqyQWzxx/IP6fznanAS6PjqcEK',
    firstName: 'Test',
    lastName: 'Admin'
  })

  const response = await api
    .post('/api/auth')
    .send({
      username: testUser.username,
      password: testUser.password
    })

  authToken = response.body.token 
}

export const setupInitialSeedData = async () => {
  console.log('--- Setting up initial seed data (Locations, Teams, etc.) ---')

  const location = await new Location({
    name: 'Shared Test Park', address: '123 Global Ave', /* etc */
  }).save()
  aLocationId = location._id

  const team = await new Team({
    name: 'The A-Team'
  }).save()
  aTeamId = team._id

  // Add any other shared data creation here...
}

export const closeDBConnection = async () => {
  await mongoose.connection.close()
}