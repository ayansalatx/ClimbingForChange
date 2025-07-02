import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './test-utils';
import ParticipantManager from '../pages/admin/participants/ParticipantManager';

// Mock the services
jest.mock('../../services/participantService', () => ({
  getAllParticipants: jest.fn().mockResolvedValue([
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      team: { id: '1', name: 'Team Alpha' },
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      team: { id: '2', name: 'Team Beta' },
    },
  ]),
  uploadParticipants: jest.fn().mockResolvedValue({ message: 'Participants uploaded successfully' }),
}));

jest.mock('../../services/teamService', () => ({
  getAllTeams: jest.fn().mockResolvedValue([
    { id: '1', name: 'Team Alpha' },
    { id: '2', name: 'Team Beta' },
  ]),
}));

describe('ParticipantManager - Render and Basic Interactions', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('renders the participants table with correct headers', async () => {
    renderWithProviders(<ParticipantManager />);
    
    // Check for main page elements
    expect(screen.getByRole('heading', { name: /participant manager/i })).toBeInTheDocument();
    
    // Check for table headers
    const headers = ['Name', 'Email', 'Team', 'Actions'];
    headers.forEach(header => {
      expect(screen.getByRole('columnheader', { name: new RegExp(header, 'i') })).toBeInTheDocument();
    });
    
    // Wait for data to load and check if participants are displayed
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('jane.smith@example.com')).toBeInTheDocument();
      expect(screen.getByText('Team Alpha')).toBeInTheDocument();
    });
  });

  test('displays loading state while fetching participants', async () => {
    // Mock a delayed response to test loading state
    require('../../services/participantService').getAllParticipants.mockImplementationOnce(
      () => new Promise(resolve => setTimeout(() => resolve([
        {
          id: '3',
          firstName: 'Test',
          lastName: 'User',
          email: 'test@example.com',
          team: { id: '1', name: 'Team Alpha' },
        }
      ]), 100))
    );

    renderWithProviders(<ParticipantManager />);
    
    // Check if loading indicator is shown
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    
    // Verify loading state is replaced with content
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      expect(screen.getByText('Test User')).toBeInTheDocument();
    });
  });

  test('opens the add participant modal when button is clicked', async () => {
    renderWithProviders(<ParticipantManager />);
    
    // Wait for initial data to load
    await screen.findByText('John Doe');
    
    // Click the add participant button
    const addButton = screen.getByRole('button', { name: /add participant/i });
    userEvent.click(addButton);
    
    // Check if modal is opened with the correct title
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/add new participant/i)).toBeInTheDocument();
  });

  test('displays action buttons for each participant', async () => {
    renderWithProviders(<ParticipantManager />);
    
    // Wait for participants to load
    await screen.findByText('John Doe');
    
    // Check for action buttons in each row
    const editButtons = screen.getAllByRole('button', { name: /edit/i });
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    
    expect(editButtons.length).toBe(2); // One for each participant
    expect(deleteButtons.length).toBe(2);
  });

  test('allows searching participants by name or email', async () => {
    renderWithProviders(<ParticipantManager />);
    
    // Wait for participants to load
    await screen.findByText('John Doe');
    
    // Search by first name
    const searchInput = screen.getByPlaceholderText(/search participants/i);
    userEvent.type(searchInput, 'John');
    
    // Check if only matching participant is displayed
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    
    // Clear and search by email
    userEvent.clear(searchInput);
    userEvent.type(searchInput, 'jane.smith@example.com');
    
    // Check if only matching participant is displayed
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });

  test('shows empty state when no participants match search', async () => {
    renderWithProviders(<ParticipantManager />);
    
    // Wait for participants to load
    await screen.findByText('John Doe');
    
    // Search for non-existent participant
    const searchInput = screen.getByPlaceholderText(/search participants/i);
    userEvent.type(searchInput, 'Non-existent Participant');
    
    // Check if empty state is shown
    expect(await screen.findByText(/no participants found/i)).toBeInTheDocument();
  });

  test('displays team names correctly', async () => {
    renderWithProviders(<ParticipantManager />);
    
    // Wait for participants to load
    await screen.findByText('John Doe');
    
    // Check if team names are displayed correctly
    expect(screen.getByText('Team Alpha')).toBeInTheDocument();
    expect(screen.getByText('Team Beta')).toBeInTheDocument();
  });
});
