// import { test, after, beforeEach } from 'node:test'
// import mongoose from 'mongoose'
// import supertest from 'supertest'
// import app from '../../app.js'
// import Participant from '../models/participant.js'
// // import assert from 'node:assert'

// const api = supertest(app)

// const initialParticipants = [
//   {
//     lastName: 'Pelletier',
//     firstName: 'Justine',
//     subEvent: 'Climb Mount Rainier',
//     teamName: 'Alberta SPCA'
//   },
//   {
//     lastName: 'Winegarden',
//     firstName: 'Aimee',
//     subEvent: 'Climb Mount Rainier',
//     teamName: 'Alberta SPCA'
//   },
//   {
//     lastName: 'Laser',
//     firstName: 'Jason',
//     subEvent: 'Climb Denali',
//     teamName: 'BIMbros'
//   },
// ]

// beforeEach(async () => {
//   await Participant.deleteMany({})
//   // await Promise.all(initialParticipants.map(async (p) => {
//   //   const participantObject = new Participant(p)
//   //   return await participantObject.save()
//   // }))
// })

// test('Participants are returned as json', async () => {
//   await api
//     .get('/api/participants')
//     .expect(200)
//     .expect('Content-Type', /application\/json/)
// })

// // test('all Participants are returned', async () => {
// //   const response = await api.get('/api/participants')

// //   assert.strictEqual(response.body.length, initialParticipants.length)
// // })

// // test('a valid Participant can be added', async () => {
// //   const newParticipant = {
// //     lastName: 'Gilligan',
// //     firstName: 'Michael',
// //     subEvent: 'Climb Denali',
// //     teamName: 'BIMbros'
// //   }

// //   await api.post('/api/participants').send(newParticipant).expect(201).expect('Content-Type', /application\/json/)

// //   const allParticipants = await (await api.get('/api/participants')).body

// //   const allParticipantsNames = allParticipants.map(e => e.lastName)

// //   assert.strictEqual(allParticipants.length, initialParticipants.length + 1)
// //   assert(allParticipantsNames.includes('Gilligan'))

// // })

// after(async () => {
//   await mongoose.connection.close()
// })
