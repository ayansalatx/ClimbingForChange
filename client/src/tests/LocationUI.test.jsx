import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './test-utils';
import LocationManager from '../pages/admin/locations/LocationManager';

// Mock the location service with minimal data
jest.mock('../../services/locationService', () => ({
  getAllLocations: jest.fn().mockResolvedValue([
    {
      id: '1',
      name: 'Mountain Peak',
      address: '123 Mountain Rd',
      city: 'Banff',
      provState: 'AB',
      country: 'Canada',
      isActive: true
    },
    {
      id: '2',
      name: 'Valley View',
      address: '456 Valley Dr',
      city: 'Canmore',
      provState: 'AB',
      country: 'Canada',
      isActive: true
    }
  ])
}));

describe('Locations Page - UI Tests', () => {
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

  test('renders the locations page with title and controls', async () => {
    renderWithProviders(<LocationManager />);
    
    // Check for main page title
    expect(screen.getByRole('heading', { name: /location manager/i })).toBeInTheDocument();
    
    // Check for main action buttons
    expect(screen.getByRole('button', { name: /add location/i })).toBeInTheDocument();
    
    // Check for table headers
    const headers = ['Location', 'Address', 'City', 'Province', 'Country', 'Actions'];
    headers.forEach(header => {
      expect(screen.getByRole('columnheader', { name: new RegExp(header, 'i') })).toBeInTheDocument();
    });
    
    // Wait for data to load
    await screen.findByText('Mountain Peak');
  });

  test('displays location data in the table', async () => {
    renderWithProviders(<LocationManager />);
    
    // Wait for data to load
    await screen.findByText('Mountain Peak');
    
    // Check location data is displayed correctly
    expect(screen.getByText('Mountain Peak')).toBeInTheDocument();
    expect(screen.getByText('123 Mountain Rd')).toBeInTheDocument();
    expect(screen.getByText('Banff')).toBeInTheDocument();
    expect(screen.getByText('AB')).toBeInTheDocument();
    expect(screen.getByText('Canada')).toBeInTheDocument();
  });

  test('opens add location modal when button is clicked', async () => {
    renderWithProviders(<LocationManager />);
    
    // Wait for initial data to load
    await screen.findByText('Mountain Peak');
    
    // Click the add button
    const addButton = screen.getByRole('button', { name: /add location/i });
    userEvent.click(addButton);
    
    // Check if modal is opened
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveTextContent(/add new location/i);
    
    // Check for form fields
    expect(screen.getByLabelText(/location name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/province/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
    
    // Check for action buttons
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });

  test('opens edit modal with location data when edit button is clicked', async () => {
    renderWithProviders(<LocationManager />);
    
    // Wait for data to load
    await screen.findByText('Mountain Peak');
    
    // Click the edit button for the first location
    const editButtons = screen.getAllByRole('button', { name: /edit/i });
    userEvent.click(editButtons[0]);
    
    // Check if modal is opened with edit title
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveTextContent(/edit location/i);
    
    // Check if form is pre-filled with location data
    expect(screen.getByDisplayValue('Mountain Peak')).toBeInTheDocument();
    expect(screen.getByDisplayValue('123 Mountain Rd')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Banff')).toBeInTheDocument();
    expect(screen.getByDisplayValue('AB')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Canada')).toBeInTheDocument();
  });

  test('shows delete confirmation dialog when delete button is clicked', async () => {
    // Mock window.confirm
    const mockConfirm = jest.spyOn(window, 'confirm');
    mockConfirm.mockImplementation(jest.fn(() => true));
    
    renderWithProviders(<LocationManager />);
    
    // Wait for data to load
    await screen.findByText('Mountain Peak');
    
    // Click the delete button for the first location
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    userEvent.click(deleteButtons[0]);
    
    // Check if confirm dialog was shown
    expect(mockConfirm).toHaveBeenCalledWith('Are you sure you want to delete this location?');
    
    // Cleanup
    mockConfirm.mockRestore();
  });

  test('shows loading state while fetching locations', async () => {
    // Mock a delayed response to test loading state
    require('../../services/locationService').getAllLocations.mockImplementationOnce(
      () => new Promise(resolve => setTimeout(() => resolve([
        {
          id: '1',
          name: 'Test Location',
          address: '123 Test St',
          city: 'Test City',
          provState: 'TT',
          country: 'Test Country',
          isActive: true
        }
      ]), 100))
    );

    renderWithProviders(<LocationManager />);
    
    // Check if loading indicator is shown
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    
    // Verify loading state is replaced with content
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      expect(screen.getByText('Test Location')).toBeInTheDocument();
    });
  });

  test('handles empty locations list', async () => {
    // Mock empty locations array
    require('../../services/locationService').getAllLocations.mockResolvedValueOnce([]);
    
    renderWithProviders(<LocationManager />);
    
    // Check for empty state message
    const emptyMessage = await screen.findByText(/no locations found/i);
    expect(emptyMessage).toBeInTheDocument();
  });
});
