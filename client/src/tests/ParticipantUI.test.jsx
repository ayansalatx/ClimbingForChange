import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './test-utils';
import ParticipantManager from '../pages/admin/participants/ParticipantManager';

// Mock the services with minimal data
jest.mock('../../services/participantService', () => ({
  getAllParticipants: jest.fn().mockResolvedValue([
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      team: { id: '1', name: 'Team Alpha' },
    },
  ]),
}));

jest.mock('../../services/teamService', () => ({
  getAllTeams: jest.fn().mockResolvedValue([
    { id: '1', name: 'Team Alpha' },
  ]),
}));

describe('Participants Page - UI Tests', () => {
  // Mock console.error to catch and display any errors
  const originalError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the participants page with title and controls', async () => {
    renderWithProviders(<ParticipantManager />);
    
    // Check for main page title
    expect(screen.getByRole('heading', { name: /participant manager/i })).toBeInTheDocument();
    
    // Check for main action buttons
    expect(screen.getByRole('button', { name: /add participant/i })).toBeInTheDocument();
    
    // Check for search input
    expect(screen.getByPlaceholderText(/search participants/i)).toBeInTheDocument();
    
    // Wait for data to load
    await screen.findByText('John Doe');
  });

  test('displays participant data in the table', async () => {
    renderWithProviders(<ParticipantManager />);
    
    // Wait for data to load
    await screen.findByText('John Doe');
    
    // Check table headers
    expect(screen.getByRole('columnheader', { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /team/i })).toBeInTheDocument();
    
    // Check participant data
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('Team Alpha')).toBeInTheDocument();
  });

  test('opens add participant modal when button is clicked', async () => {
    renderWithProviders(<ParticipantManager />);
    
    // Wait for initial data to load
    await screen.findByText('John Doe');
    
    // Click the add button
    const addButton = screen.getByRole('button', { name: /add participant/i });
    userEvent.click(addButton);
    
    // Check if modal is opened
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/add new participant/i)).toBeInTheDocument();
    
    // Check for form fields
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/team/i)).toBeInTheDocument();
  });

  test('clicking edit button opens edit modal with participant data', async () => {
    renderWithProviders(<ParticipantManager />);
    
    // Wait for data to load
    await screen.findByText('John Doe');
    
    // Click the edit button
    const editButton = screen.getByRole('button', { name: /edit/i });
    userEvent.click(editButton);
    
    // Check if modal is opened with edit title
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/edit participant/i)).toBeInTheDocument();
    
    // Check if form is pre-filled with participant data
    expect(screen.getByDisplayValue('John')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('john.doe@example.com')).toBeInTheDocument();
  });

  test('clicking delete button shows confirmation dialog', async () => {
    // Mock window.confirm
    const mockConfirm = jest.spyOn(window, 'confirm');
    mockConfirm.mockImplementation(jest.fn(() => true));
    
    renderWithProviders(<ParticipantManager />);
    
    // Wait for data to load
    await screen.findByText('John Doe');
    
    // Click the delete button
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    userEvent.click(deleteButton);
    
    // Check if confirm dialog was shown
    expect(mockConfirm).toHaveBeenCalledWith('Are you sure you want to delete this participant?');
    
    // Cleanup
    mockConfirm.mockRestore();
  });

  test('search filters participants by name', async () => {
    // Add more participants for this test
    require('../../services/participantService').getAllParticipants.mockResolvedValueOnce([
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
        team: { id: '1', name: 'Team Alpha' },
      },
    ]);
    
    renderWithProviders(<ParticipantManager />);
    
    // Wait for data to load
    await screen.findByText('John Doe');
    await screen.findByText('Jane Smith');
    
    // Type in search box
    const searchInput = screen.getByPlaceholderText(/search participants/i);
    userEvent.type(searchInput, 'Jane');
    
    // Check if only matching participant is shown
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });
});
