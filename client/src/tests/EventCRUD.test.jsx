import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import EventManager from '../pages/admin/events/EventManager'
import { addEvent, deleteEvent, editEvent, getAllEvents } from '../services/eventService'
import { getAllLocations } from '../services/locationService'
import '@testing-library/jest-dom'
import { describe, expect, it, jest } from '@jest/globals'

jest.mock('../services/eventService')
jest.mock('../services/locationService')
jest.mock('../hooks/useAlert', () => ({
  useAlert: () => jest.fn()
}))

describe('EventManager CRUD operations', () => {
  const mockEvents = [
    {
      id: '1',
      name: 'Test Event 1',
      location: { id: 'loc1', name: 'Location 1' },
      startDateTime: '2025-08-10T10:00:00Z',
      endDateTime: '2025-08-10T12:00:00Z',
      active: true
    },
    {
      id: '2',
      name: 'Test Event 2',
      location: { id: 'loc2', name: 'Location 2' },
      startDateTime: '2025-08-12T14:00:00Z',
      endDateTime: '2025-08-12T16:00:00Z',
      active: true
    }
  ]

  const mockLocations = [
    { id: 'loc1', name: 'Location 1' },
    { id: 'loc2', name: 'Location 2' }
  ]

  beforeEach(() => {
    getAllEvents.mockResolvedValue(mockEvents)
    getAllLocations.mockResolvedValue(mockLocations)
    addEvent.mockResolvedValue({ status: 201 })
    editEvent.mockResolvedValue({ status: 200 })
    deleteEvent.mockResolvedValue(true)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders fetched events', async () => {
    render(<EventManager />)
    await waitFor(() => {
      expect(screen.getByText('Test Event 1')).toBeInTheDocument()
      expect(screen.getByText('Test Event 2')).toBeInTheDocument()
    })
  })

  it('adds a new event successfully', async () => {
    render(<EventManager />)
    await waitFor(() => screen.getByText('Add Event'))
    fireEvent.click(screen.getByText('Add Event'))
    await waitFor(() => screen.getByText(/add new event/i))

    const nameInput = screen.getByRole('textbox', { name: /event name/i })
    const locationSelect = screen.getByLabelText(/location/i)
    const startDateInput = screen.getByLabelText(/start date/i)
    const startTimeInput = screen.getByLabelText(/start time/i)
    const durationInput = screen.getByLabelText(/duration/i)
    const submitButton = screen.getByRole('button', { name: /add/i })

    fireEvent.change(nameInput, { target: { value: 'New Event' } })
    fireEvent.mouseDown(locationSelect) // Open the dropdown
    const option = await screen.findByRole('option', { name: 'Location 1' })

    fireEvent.click(option)             // Select option

    fireEvent.change(startDateInput, { target: { value: '2025-09-01' } })
    fireEvent.change(startTimeInput, { target: { value: '10:00' } })
    fireEvent.change(durationInput, { target: { value: '120' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(addEvent).toHaveBeenCalledWith(expect.objectContaining({
        name: 'New Event',
        location: 'loc1'
      }))
    })
  })

  it('edits an existing event successfully', async () => {
    render(<EventManager />)
    await waitFor(() => screen.getByText('Test Event 1'))
    const iconButtons = screen.getAllByRole('button')
    const editButton = iconButtons.find(btn => btn.querySelector('svg[data-testid="EditIcon"]'))
    fireEvent.click(editButton)
    await waitFor(() => screen.getByText(/edit event/i))


    const nameInput = screen.getByRole('textbox', { name: /event name/i })
    const submitButton = screen.getByRole('button', { name: /add/i })
    fireEvent.change(nameInput, { target: { value: 'Updated Event Name' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(editEvent).toHaveBeenCalledWith('1', expect.objectContaining({
        name: 'Updated Event Name'
      }))
    })
  })

  it('deletes an event successfully', async () => {
    render(<EventManager />)
    await waitFor(() => screen.getByText('Test Event 1'))
    const iconButtons = screen.getAllByRole('button')
    const deleteButton = iconButtons.find(btn => btn.querySelector('svg[data-testid="DeleteIcon"]'))
    fireEvent.click(deleteButton)
    await waitFor(() => {
      expect(deleteEvent).toHaveBeenCalledWith('1')
    })
  })
})
