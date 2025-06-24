import Button from '@mui/material/Button'
import { useState } from 'react'

import SearchBar from '../../../components/admin/forms/fields/SearchBar'
import LocationTable from '../../../components/admin/forms/locationforms/LocationTable'
import AddLocationModal from '../../../components/admin/modals/LocationModal'
import { useAlert } from '../../../hooks/useAlert'
import mockData from '../../../mock-data/location-data.json'

const LocationManager = () => {
  const [popupOpen, setPopupOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [locations, setLocation] = useState(mockData)

  const displayAlert = useAlert()

  const handleAddLocation = (eventData) => {
    setLocation([...locations, eventData])
    setPopupOpen(false)
    displayAlert('Saved', 'Saved location to the backend.', 'success')
  }

  return (

    <div>
      <h1 style={{ fontFamily: 'Gibson, sans-serif', textTransform: 'uppercase', color: '#CDDC29', letterSpacing: '0.05em' }}>Locations</h1>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <Button
          variant="contained"
          sx={{ backgroundColor: '#c9d82c', color: 'black', '&:hover': { backgroundColor: '#b3c623' } }}
          onClick={() => setPopupOpen(true)}
        >Add Location</Button>
      </div>

      <LocationTable searchTerm={searchTerm} location={locations} />

      <AddLocationModal
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        onAdd={handleAddLocation}
      />

    </div>
  )
}

export default LocationManager
