import PlaceIcon from '@mui/icons-material/Place'
import { Box } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import ConfirmDeleteDialog from '../../../components/admin/modals/ConfirmDeleteDialog.jsx'
import LocationModal from '../../../components/admin/modals/LocationModal.jsx'
import DataTable from '../../../components/admin/tables/DataTable.jsx'
import { useAlert } from '../../../hooks/useAlert.js'
import {
  addNewLocation,
  editLocation,
  getAllLocations,
  removeLocation,
} from '../../../services/locationService.js'

const fullColumns = [
  { id: 'name', label: 'Location', width: '30%', align: 'left' },
  { id: 'address', label: 'Address', width: '20%', align: 'left' },
  { id: 'city', label: 'City', width: '15%', align: 'center' },
  { id: 'provState', label: 'Province', width: '15%', align: 'center' },
  { id: 'country', label: 'Country', width: '13%', align: 'center' },
]

const LocationManager = () => {
  const [loading, setLoading] = useState(true)
  const [locations, setLocations] = useState([])
  const [showInactive, setShowInactive] = useState(false)
  const [currentLocation, setCurrentLocation] = useState(null)
  const [popupOpen, setPopupOpen] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [deletedLocation, setDeleteLocation] = useState(null)
  const [highlightedLocationId, setHighlightedLocationId] = useState(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [searchParams] = useSearchParams()
  const displayAlert = useAlert()

  const loadData = useCallback(async () => {
    try {
      const locationsList = await getAllLocations()

      const locationsWithHighlight = locationsList.map((location) => ({
        ...location,
        isHighlighted: location.id === highlightedLocationId,
      }))
      displayAlert(
        'Fresh backend data',
        `Loaded ${locationsList.length} locations from the backend.`,
        'success'
      )
      setLocations(locationsWithHighlight)
    }
    catch (error) {
      displayAlert(
        'Error',
        `Failed to Load Locations: ${error.message}`,
        'error'
      )
    }
    finally {
      setLoading(false)
    }
  }, [displayAlert, highlightedLocationId])

  useEffect(() => {
    loadData()
  }, [loadData])

  // Handle pagination for highlighted locations
  useEffect(() => {
    if (highlightedLocationId && locations.length > 0) {
      const highlightedIndex = locations.findIndex((location) => location.id === highlightedLocationId)
      if (highlightedIndex !== -1) {
        const correctPage = Math.floor(highlightedIndex / rowsPerPage)
        setPage(correctPage)
      }
    }
  }, [highlightedLocationId, locations, rowsPerPage])

  useEffect(() => {
    // Check URL parameters for location highlighting
    const locationParam = searchParams.get('location')
    if (locationParam) {
      setHighlightedLocationId(locationParam)
      // Show a brief alert to indicate which location was clicked
      setTimeout(() => {
        displayAlert('Location Selected', 'Showing the selected location from hills view.', 'info')
      }, 500)
      // Clear highlight after 5 seconds
      setTimeout(() => {
        setHighlightedLocationId(null)
      }, 5000)
    }
  }, [displayAlert, searchParams])

  const onAdd = () => {
    setCurrentLocation(null)
    setPopupOpen(true)
  }

  const onEdit = (location) => {
    setCurrentLocation(location)
    setPopupOpen(true)
  }

  const onDelete = async (location) => {
    document.activeElement?.blur()
    setDeleteLocation(location)
    setDeleteConfirmOpen(true)
  }

  const confirmedDelete = async () => {
    try {
      await removeLocation(deletedLocation.id)
      const newLocationList = await getAllLocations()
      setLocations(newLocationList)
      setDeleteConfirmOpen(false)
      displayAlert(
        'Location Deleted',
        `Deleted ${deletedLocation.name} location.`,
        'success'
      )
    }
    catch (error) {
      displayAlert(
        'Error',
        `Failed to delete ${deletedLocation.name}: ${error.message}`,
        'error'
      )
    }
    finally {
      setLoading(false)
    }
  }

  const cancelDelete = () => {
    setDeleteConfirmOpen(false)
    setDeleteLocation(null)
  }

  const handleSave = async (locationData) => {
    if (locationData.id) {
      try {
        await editLocation(locationData.id, locationData)
        const newLocationList = await getAllLocations()
        setLocations(newLocationList)
        displayAlert(
          'Edited Location',
          `Edited ${locationData.name} location.`,
          'success'
        )
      }
      catch (error) {
        displayAlert(
          'Error',
          `Failed to Edit ${locationData.name}: ${error.message}`,
          'error'
        )
      }
    }
    else {
      try {
        await addNewLocation(locationData)
        const newLocationList = await getAllLocations()
        setLocations(newLocationList)
        displayAlert(
          'New Location Added',
          `Added ${locationData.name} location.`,
          'success'
        )
      }
      catch (error) {
        displayAlert(
          'Error',
          `Failed to Create ${locationData.name}: ${error.message}`,
          'error'
        )
      }
    }

    setPopupOpen(false)
    displayAlert('Saved', 'Saved location to the backend.', 'success')
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: '4rem',
        px: '1.5rem',
      }}
    >
      <DataTable
        tableTitle="Locations"
        tableIcon={PlaceIcon}
        tableColumns={fullColumns}
        tableData={locations}
        showInactive={showInactive}
        setShowInactive={setShowInactive}
        eventsForDropdown=""
        selectedEvent=""
        setSelectedEvent=""
        onAddClick={onAdd}
        onEditClick={onEdit}
        onDeleteClick={onDelete}
        loading={loading}
        externalPage={page}
        externalSetPage={setPage}
        externalRowsPerPage={rowsPerPage}
        externalSetRowsPerPage={setRowsPerPage}
      />

      <LocationModal
        open={popupOpen}
        onClose={() => {
          setPopupOpen(false)
          setCurrentLocation(null)
        }}
        onSave={handleSave}
        locationData={currentLocation}
      />

      <ConfirmDeleteDialog
        open={deleteConfirmOpen}
        onCancel={cancelDelete}
        onConfirm={confirmedDelete}
      />
    </Box>
  )
}

export default LocationManager
