import { Box } from '@mui/material'
import { useState } from 'react'

import AddLocationModal from '../../../components/admin/modals/LocationModal.jsx'
import DataTable from '../../../components/admin/tables/DataTable.jsx'
import { useAlert } from '../../../hooks/useAlert.js'
import mockData from '../../../mock-data/location-data.json'

const fullColumns = [
  { id: 'locationName', label: 'Location', width: '30%', align: 'left' },
  { id: 'address', label: 'Address', width: '20%', align: 'left' },
  { id: 'city', label: 'City', width: '15%', align: 'center' },
  { id: 'province', label: 'Province', width: '15%', align: 'center' },
  { id: 'country', label: 'Country', width: '13%', align: 'center' },
]

const LocationManager = () => {
  const [locations, setLocation] = useState(mockData)
  const [popupOpen, setPopupOpen] = useState(false)
  const displayAlert = useAlert()

  const handleAddLocation = (eventData) => {
    setLocation([...locations, eventData])
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

      <AddLocationModal
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        onAdd={handleAddLocation}
      />
    </Box>
  )
}

export default LocationManager
