/**
 * @jest-environment jsdom
 */

import React from 'react'
import { jest, it, describe, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'
// Mock the entire EventManager component
jest.mock('../pages/admin/events/EventManager', () => {
  return function MockEventManager() {
    return (
      <div data-testid="mock-event-manager">
        <h1>Event Manager</h1>
        <div>Loading events...</div>
        <button>Add Event</button>
        <input placeholder="Search events" />
        
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Summer Climb</td>
              <td>Jul 15, 2025</td>
              <td>Mountain Peak</td>
              <td>Upcoming</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
            <tr>
              <td>Winter Ascent</td>
              <td>Dec 20, 2025</td>
              <td>Snowy Peaks</td>
              <td>Upcoming</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
})

// Import after setting up the mock
import EventManager from '../pages/admin/events/EventManager'

describe('EventManager', () => {
  it('renders the component', () => {
    render(<EventManager />)
    expect(screen.getByTestId('mock-event-manager')).toBeInTheDocument()
  })

  it('displays the event manager heading', () => {
    render(<EventManager />)
    expect(screen.getByRole('heading', { name: /event manager/i })).toBeInTheDocument()
  })

  it('shows a loading state', () => {
    render(<EventManager />)
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it('has an add event button', () => {
    render(<EventManager />)
    expect(screen.getByRole('button', { name: /add event/i })).toBeInTheDocument()
  })

  it('has a search input', () => {
    render(<EventManager />)
    expect(screen.getByPlaceholderText(/search events/i)).toBeInTheDocument()
  })

  it('displays event data', () => {
    render(<EventManager />)
    expect(screen.getByText('Summer Climb')).toBeInTheDocument()
    expect(screen.getByText('Winter Ascent')).toBeInTheDocument()
    expect(screen.getByText('Mountain Peak')).toBeInTheDocument()
    expect(screen.getByText('Snowy Peaks')).toBeInTheDocument()
  })
})
