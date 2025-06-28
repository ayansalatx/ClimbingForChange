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

// Clear all test data
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

// Create test user and get auth token - call this in each test file
export const loginAndGetToken = async () => {
  const testUser = {
    username: 'admin',
    password: '12345678'
  }

  // Create test user
  await User.create({
    username: testUser.username,
    password_hash: '$2a$12$7lCxHOSbd8XIJr/D6ZMsyO90FjYxqyQWzxx/IP6fznanAS6PjqcEK',
    firstName: 'Test',
    lastName: 'Admin'
  })

  // Get auth token
  const response = await api
    .post('/api/auth')
    .send({
      username: testUser.username,
      password: testUser.password
    })

  return response.body.token
}

export const closeDBConnection = async () => {
  await mongoose.connection.close()
}