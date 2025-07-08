// import { describe, before, after } from 'node:test'
// import connectDB from '../utils/db.js'
// import { closeDBConnection } from './testHelper.js'

// // Simple setup - just connect to DB
// before(async () => {
//   console.log('--- Connecting to test database ---')
//   await connectDB()
// })

// // Import all test files
// import './location.test.js'
// import './hill.test.js'
// import './mountain.test.js'
// import './rfidTag.test.js'
// import './event.test.js'
// import './team.test.js'
// import './participant.test.js' // Add when ready

// describe('API Test Suite', () => {
//   after(async () => {
//     console.log('--- All tests finished, closing DB connection ---')
//     await closeDBConnection()
//   })
// })