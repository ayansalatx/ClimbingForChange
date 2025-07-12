import { setupServer } from 'msw/node'
import { rest } from 'msw'
import {
  getAllLocations,
  getLocationById,
  addNewLocation,
  editLocation,
  deleteLocation,
} from '../services/locationService' // adjust path if needed

const BASE_URL = import.meta.env.VITE_API_URL

// Setup MSW mock server
const server = setupServer(
  // Mock GET /locations
  rest.get(`${BASE_URL}/locations`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json([
        { id: 1, name: 'Alpha Location', address: '123 Main St' },
        { id: 2, name: 'Beta Location', address: '456 High St' },
      ])
    )
  ),

  // Mock GET /locations/:id
  rest.get(`${BASE_URL}/locations/:id`, (req, res, ctx) => {
    const { id } = req.params
    return res(
      ctx.status(200),
      ctx.json({ id, name: `Location ${id}`, address: `${id} Example St` })
    )
  }),

  // Mock POST /locations
  rest.post(`${BASE_URL}/locations`, (req, res, ctx) =>
    res(ctx.status(201), ctx.json({ id: 3, ...req.body }))
  ),

  // Mock PUT /locations/:id
  rest.put(`${BASE_URL}/locations/:id`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json({ id: req.params.id, ...req.body }))
  ),

  // Mock DELETE /locations/:id
  rest.delete(`${BASE_URL}/locations/:id`, (req, res, ctx) =>
    res(ctx.status(200))
  )
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Location Service API', () => {
  test('fetches all locations and sorts them alphabetically', async () => {
    const locations = await getAllLocations()
    expect(locations).toHaveLength(2)
    expect(locations[0].name).toBe('Alpha Location')
    expect(locations[1].name).toBe('Beta Location')
  })

  test('fetches a single location by ID', async () => {
    const location = await getLocationById(1)
    expect(location).toEqual({
      id: '1',
      name: 'Location 1',
      address: '1 Example St',
    })
  })

  test('adds a new location successfully', async () => {
    const newLocation = {
      name: 'Gamma Location',
      address: '789 Oak St',
    }
    const created = await addNewLocation(newLocation)
    expect(created).toMatchObject(newLocation)
    expect(created.id).toBe(3)
  })

  test('edits an existing location successfully', async () => {
    const updated = await editLocation(1, {
      name: 'Alpha Updated',
      address: '999 Updated St',
    })
    expect(updated.name).toBe('Alpha Updated')
    expect(updated.address).toBe('999 Updated St')
  })

  test('deletes a location successfully', async () => {
    const result = await deleteLocation(1)
    expect(result).toBe(true)
  })
})
