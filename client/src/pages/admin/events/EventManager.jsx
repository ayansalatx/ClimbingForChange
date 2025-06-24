import { Box, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'

import EventsTable from '../../../components/admin/forms/eventforms/EventTable'
import SearchBar from '../../../components/admin/forms/eventforms/SearchBar'
import AddEventModal from '../../../components/admin/modals/EventModal.jsx'
import { useAlert } from '../../../hooks/useAlert.js'
import { addEvent, getAllEvents, deleteEvent } from '../../../services/eventService.js'
import { getAllLocations } from '../../../services/locationService.js'

const EventManager = () => {
  const [openPopup, setOpenPopup] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [events, setEvents] = useState([])
  const [locations, setLocations] = useState([])
  const handleOpenPopup = () => setOpenPopup(true)
  const handleClosePopup = () => setOpenPopup(false)
  const [eventToEdit, setEventToEdit] = useState(null)

  const displayAlert = useAlert()

  const handleAddEvent = (eventData) => {
    setEvents([...events, eventData])
    addEvent(eventData)
    handleClosePopup()
  }

  const handleEditEvent = (event) => {
    setEventToEdit(event)
    setOpenPopup(true)
  }

  const handleDeleteEvent = async (id) => {
    try {
      const success = await deleteEvent(id)
      if (success) {
        fetchEvents()
        displayAlert('Event Deleted', 'The event has been successfully deleted.', 'success')
      } else {
        displayAlert('Delete Error', 'Failed to delete the event. Please try again.', 'error')
      }
    } catch (error) {
      console.error('Error deleting event:', error)
      displayAlert('Delete Error', `Failed to delete the event: ${error.message}`, 'error')
    }
  }

  const fetchLocations = async () => {
    const locations = await getAllLocations()
    setLocations(locations)
  }

  const fetchEvents = async () => {
    console.log("Fetching events")
    const events = await getAllEvents()
    setEvents(events)
  }

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locations = await getAllLocations()
        setLocations(locations)
      } catch (error) {
        displayAlert('Locations Error', `${error.message}`, 'error')
      }
    }

    const fetchEvents = async () => {
      try {
        const events = await getAllEvents()
        setEvents(events)
        displayAlert('Fresh backend data', `Loaded ${events.length} events from the backend.`, 'success')
      } catch (error) {
        displayAlert('Events Error', `${error.message}`, 'error')
      }
    }

    fetchEvents()
    fetchLocations()
  }, [displayAlert])

  return (
    <Box sx={{ px: 4, py: 3 }}>
      <Typography variant="h3" mb={2} sx={{ fontFamily: 'Gibson, sans-serif', textTransform: 'uppercase', color: '#CDDC29', letterSpacing: '0.05em' }}>Events</Typography>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <SearchBar setSearchTerm={setSearchTerm} />
        <Button
          variant="contained"
          sx={{ backgroundColor: '#c9d82c', color: 'black', '&:hover': { backgroundColor: '#b3c623' } }}
          onClick={handleOpenPopup}
        >Add Event</Button>
      </div>

      <EventsTable
        searchTerm={searchTerm}
        events={events}
        onEventDelete={handleDeleteEvent}
        onEventEdit={handleEditEvent}
      />

      <AddEventModal
        open={openPopup}
        onClose={() => {
          handleClosePopup()
          setEventToEdit(null)
        }}
        onAdd={handleAddEvent}
        onLocation={locations}
        eventToEdit={eventToEdit}

      />
    </Box>
  )
}

export default EventManager