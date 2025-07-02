import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './test-utils';
import EventManager from '../pages/admin/events/EventManager';

// Mock the services
jest.mock('../../services/eventService', () => ({
  getAllEvents: jest.fn().mockResolvedValue([
    {
      id: '1',
      name: 'Summer Climb',
      date: '2025-07-15T00:00:00.000Z',
      location: { name: 'Mountain Peak' },
      status: 'upcoming',
    },
    {
      id: '2',
      name: 'Winter Ascent',
      date: '2025-12-20T00:00:00.000Z',
      location: { name: 'Snowy Peaks' },
      status: 'upcoming',
    },
  ]),
}));

jest.mock('../../services/locationService', () => ({
  getAllLocations: jest.fn().mockResolvedValue([
    { id: '1', name: 'Mountain Peak' },
    { id: '2', name: 'Snowy Peaks' },
  ]),
}));

describe('Events Page - Render and Basic Interactions', () => {
  // Reset all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the main events table with correct headers', async () => {
    renderWithProviders(<EventManager />);
    
    // Check for main page elements
    expect(screen.getByRole('heading', { name: /event manager/i })).toBeInTheDocument();
    
    // Check for table headers
    const headers = ['Name', 'Date', 'Location', 'Status', 'Actions'];
    headers.forEach(header => {
      expect(screen.getByRole('columnheader', { name: new RegExp(header, 'i') })).toBeInTheDocument();
    });
    
    // Wait for data to load and check if events are displayed
    await waitFor(() => {
      expect(screen.getByText('Summer Climb')).toBeInTheDocument();
      expect(screen.getByText('Winter Ascent')).toBeInTheDocument();
    });
  });

  test('displays loading state while fetching events', async () => {
    // Mock a delayed response to test loading state
    require('../../services/eventService').getAllEvents.mockImplementationOnce(
      () => new Promise(resolve => setTimeout(() => resolve([
        {
          id: '1',
          name: 'Test Event',
          date: '2025-01-01T00:00:00.000Z',
          location: { name: 'Test Location' },
          status: 'upcoming',
        }
      ]), 100))
    );

    renderWithProviders(<EventManager />);
    
    // Check if loading indicator is shown
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    
    // Verify loading state is replaced with content
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      expect(screen.getByText('Test Event')).toBeInTheDocument();
    });
  });

  test('opens and closes the add event modal', async () => {
    renderWithProviders(<EventManager />);
    
    // Click the add event button
    const addButton = screen.getByRole('button', { name: /add event/i });
    userEvent.click(addButton);
    
    // Check if modal is opened
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/add new event/i)).toBeInTheDocument();
    
    // Close the modal
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    userEvent.click(cancelButton);
    
    // Check if modal is closed
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('displays action buttons for each event', async () => {
    renderWithProviders(<EventManager />);
    
    // Wait for events to load
    await screen.findByText('Summer Climb');
    
    // Check for action buttons in each row
    const editButtons = screen.getAllByRole('button', { name: /edit/i });
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    
    expect(editButtons.length).toBe(2); // One for each event
    expect(deleteButtons.length).toBe(2);
  });

  test('allows searching events by name', async () => {
    renderWithProviders(<EventManager />);
    
    // Wait for events to load
    await screen.findByText('Summer Climb');
    
    // Type in the search input
    const searchInput = screen.getByPlaceholderText(/search events/i);
    userEvent.type(searchInput, 'Summer');
    
    // Check if only matching event is displayed
    expect(screen.getByText('Summer Climb')).toBeInTheDocument();
    expect(screen.queryByText('Winter Ascent')).not.toBeInTheDocument();
    
    // Clear search
    userEvent.clear(searchInput);
    userEvent.type(searchInput, 'Winter');
    
    // Check if the other event is now visible
    expect(screen.getByText('Winter Ascent')).toBeInTheDocument();
    expect(screen.queryByText('Summer Climb')).not.toBeInTheDocument();
  });

  test('shows empty state when no events match search', async () => {
    renderWithProviders(<EventManager />);
    
    // Wait for events to load
    await screen.findByText('Summer Climb');
    
    // Search for non-existent event
    const searchInput = screen.getByPlaceholderText(/search events/i);
    userEvent.type(searchInput, 'Non-existent Event');
    
    // Check if empty state is shown
    expect(await screen.findByText(/no events found/i)).toBeInTheDocument();
  });
});
