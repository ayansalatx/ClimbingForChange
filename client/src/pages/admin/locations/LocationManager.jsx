import Button from '@mui/material/Button'
import { useState } from 'react'

import LocationTable from '../../../components/admin/forms/locationforms/LocationTable'
import AddLocationModal from '../../../components/admin/modals/LocationModal.jsx'
import mockData from '../../../mock-data/location-data.json'
import { Box, Container } from '@mui/material'

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

      <LocationTable location={locations} />


      <AddLocationModal
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        onAdd={handleAddLocation}
      />
    </Container>
  )
}

export default LocationManager
