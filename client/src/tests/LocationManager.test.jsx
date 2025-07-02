import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './test-utils';
import LocationManager from '../pages/admin/locations/LocationManager';

// Mock the location service
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
  ]),
  addNewLocation: jest.fn().mockImplementation((data) => 
    Promise.resolve({ ...data, id: '3' })
  ),
  editLocation: jest.fn().mockImplementation((id, data) => 
    Promise.resolve({ ...data, id })
  ),
  deleteLocation: jest.fn().mockResolvedValue({})
}));

describe('LocationManager - CRUD Operations', () => {
  // Reset all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders location manager with title and add button', async () => {
    renderWithProviders(<LocationManager />);
    
    // Check if the title is rendered
    expect(screen.getByRole('heading', { name: /location manager/i })).toBeInTheDocument();
    
    // Check if the add button is rendered
    const addButton = screen.getByRole('button', { name: /add location/i });
    expect(addButton).toBeInTheDocument();
    
    // Wait for data to load
    await screen.findByText('Mountain Peak');
  });

  test('displays list of locations', async () => {
    renderWithProviders(<LocationManager />);
    
    // Wait for locations to load
    const location1 = await screen.findByText('Mountain Peak');
    const location2 = await screen.findByText('Valley View');
    
    expect(location1).toBeInTheDocument();
    expect(location2).toBeInTheDocument();
    
    // Check if address and city are displayed
    expect(screen.getByText('123 Mountain Rd')).toBeInTheDocument();
    expect(screen.getByText('Banff')).toBeInTheDocument();
  });

  test('opens add location modal when add button is clicked', async () => {
    renderWithProviders(<LocationManager />);
    
    // Wait for initial data to load
    await screen.findByText('Mountain Peak');
    
    // Click the add button
    const addButton = screen.getByRole('button', { name: /add location/i });
    userEvent.click(addButton);
    
    // Check if modal is opened
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/add new location/i)).toBeInTheDocument();
  });

  test('can add a new location', async () => {
    renderWithProviders(<LocationManager />);
    
    // Wait for initial data to load
    await screen.findByText('Mountain Peak');
    
    // Click the add button
    const addButton = screen.getByRole('button', { name: /add location/i });
    userEvent.click(addButton);
    
    // Fill in the form
    const nameInput = screen.getByLabelText(/location name/i);
    const addressInput = screen.getByLabelText(/address/i);
    const cityInput = screen.getByLabelText(/city/i);
    const provinceInput = screen.getByLabelText(/province/i);
    const countryInput = screen.getByLabelText(/country/i);
    
    await userEvent.type(nameInput, 'New Test Location');
    await userEvent.type(addressInput, '789 Test St');
    await userEvent.type(cityInput, 'Test City');
    await userEvent.type(provinceInput, 'BC');
    await userEvent.type(countryInput, 'Canada');
    
    // Submit the form
    const saveButton = screen.getByRole('button', { name: /save/i });
    userEvent.click(saveButton);
    
    // Check if addNewLocation was called with the right data
    await waitFor(() => {
      expect(require('../../services/locationService').addNewLocation).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'New Test Location',
          address: '789 Test St',
          city: 'Test City',
          provState: 'BC',
          country: 'Canada',
          isActive: true
        })
      );
    });
  });

  test('can edit an existing location', async () => {
    renderWithProviders(<LocationManager />);
    
    // Wait for locations to load
    await screen.findByText('Mountain Peak');
    
    // Click the edit button for the first location
    const editButtons = screen.getAllByRole('button', { name: /edit/i });
    userEvent.click(editButtons[0]);
    
    // Check if modal is opened with edit title
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/edit location/i)).toBeInTheDocument();
    
    // Change the name
    const nameInput = screen.getByLabelText(/location name/i);
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'Updated Mountain Peak');
    
    // Submit the form
    const saveButton = screen.getByRole('button', { name: /save/i });
    userEvent.click(saveButton);
    
    // Check if editLocation was called with the right data
    await waitFor(() => {
      expect(require('../../services/locationService').editLocation).toHaveBeenCalledWith(
        '1',
        expect.objectContaining({
          name: 'Updated Mountain Peak',
          address: '123 Mountain Rd',
          city: 'Banff',
          provState: 'AB',
          country: 'Canada',
          isActive: true
        })
      );
    });
  });

  test('can delete a location', async () => {
    // Mock window.confirm
    window.confirm = jest.fn(() => true);
    
    renderWithProviders(<LocationManager />);
    
    // Wait for locations to load
    await screen.findByText('Mountain Peak');
    
    // Click the delete button for the first location
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    userEvent.click(deleteButtons[0]);
    
    // Check if delete was called with the right ID
    await waitFor(() => {
      expect(require('../../services/locationService').deleteLocation).toHaveBeenCalledWith('1');
    });
    
    // Cleanup
    window.confirm.mockRestore();
  });

  test('shows error message when location fetch fails', async () => {
    // Mock a failed API call
    const errorMessage = 'Failed to fetch locations';
    require('../../services/locationService').getAllLocations.mockRejectedValueOnce(
      new Error(errorMessage)
    );
    
    // Mock the alert function
    const mockAlert = jest.fn();
    jest.mock('../../hooks/useAlert', () => ({
      __esModule: true,
      default: () => ({
        displayAlert: mockAlert,
      }),
    }));
    
    renderWithProviders(<LocationManager />);
    
    // Check if error alert was shown
    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith(
        'Error',
        expect.stringContaining('Failed to Load Locations'),
        'error'
      );
    });
  });
});
