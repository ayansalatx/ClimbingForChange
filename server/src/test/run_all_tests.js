import { describe, after } from 'node:test'
import { closeDBConnection, setupTestUserAndGetToken, setupInitialSeedData, emptyTestDB } from './testHelper.js'
import connectDB from '../utils/db.js'

console.log('--- Test Suite Setup ---')
await connectDB()
await emptyTestDB()
await setupTestUserAndGetToken()
await setupInitialSeedData()
console.log('--- Setup complete. Starting tests... ---')

import './event.test.js'
import './hill.test.js'
import './location.test.js'
import './mountain.test.js'
import './participant.test.js'
import './rfidTag.test.js'
import './team.test.js'

describe('API Test Teardown', () => {
  after(async () => {
    console.log('--- All tests finished, closing DB connection. ---')
    await closeDBConnection()
  })
})