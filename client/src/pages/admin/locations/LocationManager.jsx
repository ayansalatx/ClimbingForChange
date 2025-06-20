import { useState } from 'react'

import DataTable from '../../../components/admin/tables/DataTable.jsx'
import AddLocationModal from '../../../components/admin/modals/LocationModal.jsx'
import mockData from '../../../mock-data/location-data.json'
import { Container } from '@mui/material'

const fullColumns = [
  { id: 'locationName', label: 'Location', minWidth: 270, align: 'left' },
  { id: 'address', label: 'Address', minWidth: 85, align: 'left' },
  { id: 'city', label: 'City', minWidth: 85, align: 'center' },
  { id: 'province', label: 'Province', minWidth: 85, align: 'center' },
  { id: 'country', label: 'Country', minWidth: 85, align: 'center' },
]

const LocationManager = () => {
  const [locations, setLocation] = useState(mockData)
  const [popupOpen, setPopupOpen] = useState(false)

  const handleAddLocation = (eventData) => {
    setLocation([...locations, eventData])
    setPopupOpen(false)
  }

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        width: '80vw',
        height: '85vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyItems: 'center',
        paddingTop: '5rem',
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
    </Container>
  )
}

export default LocationManager
