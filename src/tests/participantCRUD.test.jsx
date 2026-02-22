import { afterAll, afterEach, beforeAll, describe, expect, test } from '@jest/globals'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import {
  getAllParticipants,
  uploadParticipants,
} from '../services/participantService' // adjust path if needed
const BASE_URL = import.meta.env.VITE_API_URL

// Mock server with handlers
const server = setupServer(
  // Mock GET /participants
  rest.get(`${BASE_URL}/participants`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json([
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' },
      ])
    )
  ),

  // Mock POST /participants/upload
  rest.post(`${BASE_URL}/participants/upload`, (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        message: 'Participants uploaded successfully',
        count: req.body.length || 0,
      })
    )
  })
)

// Start/cleanup mock server
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Participant Service API', () => {
  test('fetches all participants', async () => {
    const participants = await getAllParticipants()
    expect(participants).toHaveLength(2)
    expect(participants[0]).toEqual({
      id: 1,
      name: 'Alice',
      email: 'alice@example.com',
    })
  })

  test('uploads participants successfully', async () => {
    const mockParticipants = [
      { name: 'Charlie', email: 'charlie@example.com' },
      { name: 'Diana', email: 'diana@example.com' },
    ]

    const response = await uploadParticipants(mockParticipants)
    expect(response).toEqual({
      message: 'Participants uploaded successfully',
      count: 2,
    })
  })
})
