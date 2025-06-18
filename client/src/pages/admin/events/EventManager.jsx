import { Box, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import React, { useEffect,useState } from 'react'

import EventsTable from '../../../components/admin/forms/eventforms/EventTable'
import SearchBar from '../../../components/admin/forms/eventforms/SearchBar'
import AddEventModal from '../../../components/admin/modals/EventModal.jsx'
import mockData from '../../../mock-data/event-data.json'
import { getAllEvents } from '../../../services/eventService.js'
import { getAllLocations } from '../../../services/locationService.js'
 
const EventManager = () => {
  const [openPopup, setOpenPopup] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [events, setEvents] = useState(mockData)
  const [locations, setLocations] = useState([])
  const handleOpenPopup = () => setOpenPopup(true)
  const handleClosePopup = () => setOpenPopup(false)
 
  const handleAddEvent = (eventData) => {
    setEvents(prevEvents => [...prevEvents, eventData])
    handleClosePopup()
  }
  useEffect(() => {
    const fetchLocations = async () => {
      const locations = await getAllLocations()
      setLocations(locations)
    }
 
    const fetchEvents = async () => {
      const events = await getAllEvents()
      setEvents(events)
    }
    fetchEvents()
   
    fetchLocations()
  }, [])
 
 
  return (
    <Box sx={{ px: 4, py: 3 }}>
      <Typography variant="h3" mb={2} sx={{ fontFamily: 'Gibson, sans-serif', textTransform: 'uppercase', color: '#CDDC29', letterSpacing: '0.05em' }}>Events</Typography>
 
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <SearchBar setSearchTerm={setSearchTerm} />
        <Button
          variant="contained"
          sx={{ backgroundColor: '#c9d82c', color: 'black', '&:hover': { backgroundColor: '#b3c623'}}}
          onClick={handleOpenPopup}
        >Add Event</Button>
      </div>
     
      <EventsTable searchTerm={searchTerm} events={events} />
 
      <AddEventModal
        open={openPopup}
        onClose={handleClosePopup}
        onAdd={handleAddEvent}
        onLocation={locations}
      />
 
    </Box>
  )
}
 
export default EventManager