import { Box } from '@mui/material'
import { useEffect, useState } from 'react'

import ConfirmDeleteDialog from '../../../components/admin/modals/ConfirmDeleteDialog.jsx'
import LocationModal from '../../../components/admin/modals/LocationModal.jsx'
import DataTable from '../../../components/admin/tables/DataTable.jsx'
import { useAlert } from '../../../hooks/useAlert.js'
import {
  addNewLocation,
  deleteLocation,
  editLocation,
  getAllLocations,
} from '../../../services/locationService.js'

const fullColumns = [
  { id: 'name', label: 'Location', width: '30%', align: 'left' },
  { id: 'address', label: 'Address', width: '20%', align: 'left' },
  { id: 'city', label: 'City', width: '15%', align: 'center' },
  { id: 'provState', label: 'Province', width: '15%', align: 'center' },
  { id: 'country', label: 'Country', width: '13%', align: 'center' },
]

const LocationManager = () => {
  const [locations, setLocations] = useState([])
  const [showInactive, setShowInactive] = useState(false)
  const [currentLocation, setCurrentLocation] = useState(null)
  const [popupOpen, setPopupOpen] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [deletedLocation, setDeleteLocation] = useState(null)

  const displayAlert = useAlert()

  useEffect(() => {
    async function loadData() {
      try {
        const locationsList = await getAllLocations()
        displayAlert(
          'Fresh backend data',
          `Loaded ${locationsList.length} locations from the backend.`,
          'success'
        )
        setLocations(locationsList)
      } catch (error) {
        displayAlert('Error', `Failed to Load Locations: ${error.message}`, 'error')
      }
    }

    loadData()
  }, [displayAlert])

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
      await deleteLocation(deletedLocation.id)
      setLocations((prev) =>
        prev.map((item) =>
          item.id === deletedLocation.id ? { ...item, active: false } : item
        )
      )
      setDeleteConfirmOpen(false)
      displayAlert(
        'Location Deleted',
        `Deleted ${deletedLocation.name} location.`,
        'success'
      )
    } catch (error) {
      displayAlert('Error', `Failed to delete ${deletedLocation.name}: ${error.message}`, 'error')
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
      } catch (error) {
        displayAlert('Error', `Failed to Edit ${locationData.name}: ${error.message}`, 'error')
      }
    } else {
      try {
        await addNewLocation(locationData)
        const newLocationList = await getAllLocations()
        setLocations(newLocationList)
        displayAlert(
          'New Location Added',
          `Added ${locationData.name} location.`,
          'success'
        )
      } catch (error) {
        displayAlert('Error', `Failed to Create ${locationData.name}: ${error.message}`, 'error')
      }
    }

    setPopupOpen(false)
    displayAlert('Saved', 'Saved location to the backend.', 'success')
  }

  return (
    <Box
      sx={{
        width: '80vw',
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <DataTable
        tableTitle={'Locations'}
        tableColumns={fullColumns}
        tableData={locations}
        showInactive={showInactive}
        setShowInactive={setShowInactive}
        onAddClick={onAdd}
        onEditClick={onEdit}
        onDeleteClick={onDelete}
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
