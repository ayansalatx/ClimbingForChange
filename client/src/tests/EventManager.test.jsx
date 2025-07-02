import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { MemoryRouter } from 'react-router-dom';
import EventManager from '../pages/admin/events/EventManager';

// Mock the services
jest.mock('../../../services/eventService', () => ({
  getAllEvents: jest.fn(),
  addEvent: jest.fn(),
  editEvent: jest.fn(),
  deleteEvent: jest.fn(),
}));

jest.mock('../../../services/locationService', () => ({
  getAllLocations: jest.fn(),
}));

// Mock the useAlert hook
jest.mock('../../../hooks/useAlert', () => ({
  __esModule: true,
  default: () => ({
    displayAlert: jest.fn(),
  }),
}));

// Sample test data
const mockEvents = [
  {
    id: '1',
    name: 'Test Event 1',
    date: '2025-07-15',
    location: 'Test Location 1',
    status: 'upcoming',
  },
  {
    id: '2',
    name: 'Test Event 2',
    date: '2025-08-20',
    location: 'Test Location 2',
    status: 'active',
  },
];

const mockLocations = [
  { id: '1', name: 'Test Location 1' },
  { id: '2', name: 'Test Location 2' },
];

describe('EventManager', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Setup mock implementations
    require('../../../services/eventService').getAllEvents.mockResolvedValue(mockEvents);
    require('../../../services/locationService').getAllLocations.mockResolvedValue(mockLocations);
    require('../../../services/eventService').addEvent.mockImplementation((data) => 
      Promise.resolve({ data: { ...data, id: '3' } })
    );
    require('../../../services/eventService').editEvent.mockImplementation((id, data) => 
      Promise.resolve({ data: { ...data, id } })
    );
    require('../../../services/eventService').deleteEvent.mockResolvedValue({});
  });

  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <EventManager />
      </MemoryRouter>
    );
  };

  test('renders event manager with title and add button', async () => {
    renderComponent();
    
    // Check if the title is rendered
    expect(screen.getByText('Event Manager')).toBeInTheDocument();
    
    // Check if the add button is rendered
    const addButton = screen.getByRole('button', { name: /add event/i });
    expect(addButton).toBeInTheDocument();
    
    // Wait for data to load
    await screen.findByText('Test Event 1');
  });

  test('displays list of events', async () => {
    renderComponent();
    
    // Wait for events to load
    const event1 = await screen.findByText('Test Event 1');
    const event2 = await screen.findByText('Test Event 2');
    
    expect(event1).toBeInTheDocument();
    expect(event2).toBeInTheDocument();
  });

  test('opens add event modal when add button is clicked', async () => {
    renderComponent();
    
    // Click the add button
    const addButton = screen.getByRole('button', { name: /add event/i });
    userEvent.click(addButton);
    
    // Check if modal is opened
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/add new event/i)).toBeInTheDocument();
  });

  test('can add a new event', async () => {
    renderComponent();
    
    // Open the add event modal
    const addButton = screen.getByRole('button', { name: /add event/i });
    userEvent.click(addButton);
    
    // Fill in the form
    const eventName = screen.getByLabelText(/event name/i);
    const eventDate = screen.getByLabelText(/date/i);
    
    // Use userEvent.type for better simulation of user input
    await userEvent.type(eventName, 'New Test Event');
    await userEvent.type(eventDate, '2025-09-01');
    
    // Submit the form
    const saveButton = screen.getByRole('button', { name: /save/i });
    userEvent.click(saveButton);
    
    // Check if addEvent was called with the right data
    await waitFor(() => {
      expect(require('../../../services/eventService').addEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'New Test Event',
          date: '2025-09-01',
        })
      );
    });
  });

  test('can delete an event', async () => {
    renderComponent();
    
    // Wait for events to load
    await screen.findByText('Test Event 1');
    
    // Find and click the delete button for the first event
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    window.confirm = jest.fn(() => true); // Mock window.confirm
    userEvent.click(deleteButtons[0]);
    
    // Check if delete was called with the right ID
    await waitFor(() => {
      expect(require('../../../services/eventService').deleteEvent).toHaveBeenCalledWith('1');
    });
  });

  test('can search events', async () => {
    renderComponent();
    
    // Wait for events to load
    await screen.findByText('Test Event 1');
    
    // Find the search input and type a search term
    const searchInput = screen.getByPlaceholderText(/search events/i);
    userEvent.type(searchInput, 'Event 1');
    
    // Check if only the matching event is displayed
    expect(screen.getByText('Test Event 1')).toBeInTheDocument();
    expect(screen.queryByText('Test Event 2')).not.toBeInTheDocument();
  });
});
