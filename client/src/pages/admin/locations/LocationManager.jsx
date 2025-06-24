import { Box } from '@mui/material'
import { useEffect, useState } from 'react'

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
  const displayAlert = useAlert()

  useEffect(() => {
    async function loadData() {
      try {
        const locationsList = await getAllLocations()
        setLocations(locationsList)
      } catch (error) {
        console.log('Failed to load location data', error)
      }
    }

    loadData()
  }, [])

  const onAdd = () => {
    setCurrentLocation(null)
    setPopupOpen(true)
  }

  const onEdit = (location) => {
    setCurrentLocation(location)
    setPopupOpen(true)
  }

  const onDelete = async (location) => {
    await deleteLocation(location.id)
    setLocations((prev) => prev.filter((item) => item.id !== location.id))
  }

  const handleSave = async (locationData) => {
    if (locationData.id) {
      await editLocation(locationData.id, locationData)
      setLocations((prev) =>
        prev.map((item) => (item.id === locationData.id ? locationData : item))
      )
    } else {
      const newLocation = await addNewLocation(locationData)
      setLocations((prev) => [...prev, newLocation])
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
    </Box>
  )
}

export default LocationManager
