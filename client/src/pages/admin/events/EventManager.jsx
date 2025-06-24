import { Box, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'

import EventsTable from '../../../components/admin/forms/eventforms/EventTable'
import SearchBar from '../../../components/admin/forms/eventforms/SearchBar'
import AddEventModal from '../../../components/admin/modals/EventModal.jsx'
import { useAlert } from '../../../hooks/useAlert.js'
import { addEvent, getAllEvents, deleteEvent, editEvent } from '../../../services/eventService.js'
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

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locations = await getAllLocations()
        setLocations(locations)
      } catch (error) {
        displayAlert('Locations Error', `${error.message}`, 'error')
      }
    }

    let fetchEvents = async () => {
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

  const handleAddEvent = async (eventData) => {
    try {
      const response = await addEvent(eventData)
      if (response.status === 201 || response.status === 200) {
        displayAlert('Event Created', 'The event has been successfully created.', 'success')
        const newAllEvents = await getAllEvents()
        setEvents(newAllEvents)
        handleClosePopup()
      } else {
        throw new Error('Event was not created')
      }
    } catch (error) {
      displayAlert('Add Error', `Failed to add the event: ${error.message}`, 'error')
    }
  }

  const requestEditEvent = (event) => {
    setEventToEdit(event)
    setOpenPopup(true)
  }

  const handleEditEvent = async (id, eventData) => {
    try {
      const response = await editEvent(id, eventData)
      if (response.status === 201 || response.status === 200) {
        displayAlert('Event has been successfully edited.', 'success')
        const newAllEvents = await getAllEvents()
        setEvents(newAllEvents)
        handleClosePopup()
      } else {
        throw new Error('Event was not edited')
      }
    } catch (error) {
      displayAlert('Add Error', `Failed to edit the event: ${error.message}`, 'error')
    }
  }

  const handleDeleteEvent = async (id) => {
    try {
      const success = await deleteEvent(id)
      if (success) {
        displayAlert('Event Deleted', 'The event has been successfully deleted.', 'success')
        const newAllEvents = await getAllEvents()
        setEvents(newAllEvents)
      } else {
        displayAlert('Delete Error', 'Failed to delete the event. Please try again.', 'error')
      }
    } catch (error) {
      displayAlert('Delete Error', `Failed to delete the event: ${error.message}`, 'error')
    }
  }

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
        onEventEdit={requestEditEvent}
      />

      <AddEventModal
        open={openPopup}
        onClose={() => {
          handleClosePopup()
          setEventToEdit(null)
        }}
        onAdd={handleAddEvent}
        onEdit={handleEditEvent}
        onLocation={locations}
        eventToEdit={eventToEdit}

      />
    </Box>
  )
}

export default EventManager