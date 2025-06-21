import { Box } from '@mui/material'
import { useEffect, useState } from 'react'

import LocationModal from '../../../components/admin/modals/LocationModal.jsx'
import DataTable from '../../../components/admin/tables/DataTable.jsx'
import { useAlert } from '../../../hooks/useAlert.js'
import { getAllLocations } from '../../../services/locationService.js'

const fullColumns = [
  { id: 'name', label: 'Location', width: '30%', align: 'left' },
  { id: 'address', label: 'Address', width: '20%', align: 'left' },
  { id: 'city', label: 'City', width: '15%', align: 'center' },
  { id: 'provState', label: 'Province', width: '15%', align: 'center' },
  { id: 'country', label: 'Country', width: '13%', align: 'center' },
]

const LocationManager = () => {
  const [locations, setLocations] = useState([])
  const [currentLocation, setCurrentLocation] = useState()
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

  const handleEditLocation = (currentLocation) => {
    setPopupOpen(true)
  }

  const handleAddLocation = () => {
    setPopupOpen(true)
  }

  const handleSaveLocation = (locationData) => {
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
        onAddClick={() => setPopupOpen(true)}
      />

      <LocationModal
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        onAdd={handleSaveLocation}
      />
    </Box>
  )
}

export default LocationManager
