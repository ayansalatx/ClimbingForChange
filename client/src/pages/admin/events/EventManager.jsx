import { Event } from '@mui/icons-material'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'

import ConfirmDeleteDialog from '../../../components/admin/modals/ConfirmDeleteDialog.jsx'
import AddEventModal from '../../../components/admin/modals/EventModal.jsx'
import DataTable from '../../../components/admin/tables/DataTable.jsx'
import { useAlert } from '../../../hooks/useAlert.js'
import {
  addEvent,
  deleteEvent,
  editEvent,
  getAllEvents,
} from '../../../services/eventService.js'
import { getAllLocations } from '../../../services/locationService.js'

const fullColumns = [
  { id: 'eventName', label: 'Event', width: '34%', align: 'left' },
  { id: 'location', label: 'Location', width: '12%', align: 'left' },
  { id: 'start', label: 'Start-Time', width: '15%', align: 'left' },
  { id: 'end', label: 'End-Time', width: '15%', align: 'left' },
  { id: 'duration', label: 'Duration', width: '12%', align: 'left' },
  { id: 'active', label: 'Active', width: '12%', align: 'left' },
]

const formatDateTime = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString([], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

const EventManager = () => {
  const [openPopup, setOpenPopup] = useState(false)
  const [events, setEvents] = useState([])
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [eventToDelete, setEventToDelete] = useState(null)
  const [showInactive, setShowInactive] = useState(false)
  const [locations, setLocations] = useState([])
  const [eventToEdit, setEventToEdit] = useState(null)

  const handleOpenPopup = () => setOpenPopup(true)
  const handleClosePopup = () => setOpenPopup(false)

  const displayAlert = useAlert()

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
      const formattedEvents = events.map((event) => {
        const startTime = event.startDateTime
        const endTime = event.endDateTime
        const startDate = new Date(startTime)
        const endDate = new Date(endTime)
        const durationTime = (endDate - startDate) / (1000 * 60)

        return {
          id: event.id,
          ...event,
          start: formatDateTime(startTime),
          end: formatDateTime(endTime),
          eventName: event.name || '',
          location: event.location?.name || '',
          locationId: event.location?.id,
          duration: durationTime,
          active: `${event.active}`,
        }
      })

      setEvents(formattedEvents)
      displayAlert(
        'Fresh backend data',
        `Loaded ${events.length} events from the backend.`,
        'success'
      )
    } catch (error) {
      displayAlert('Events Error', `${error.message}`, 'error')
    }
  }
   
  useEffect(() => {
    fetchEvents()
    fetchLocations()
  }, [displayAlert])

  const handleAddEvent = async (eventData) => {
    try {
      const response = await addEvent(eventData)
      if (response.status === 201 || response.status === 200) {
        displayAlert('Event Created', 'The event has been successfully created.', 'success')
        fetchEvents()
        handleClosePopup()
      } else {
        throw new Error('Event was not created')
      }
    } catch (error) {
      displayAlert('Add Error', `Failed to add the event: ${error.message}`, 'error')
    }
  }

  const handleEditEvent = async (id, eventData) => {
    try {
      const response = await editEvent(id, eventData)
      if (response.status === 201 || response.status === 200) {
        displayAlert('Event has been successfully edited.', 'success')
        fetchEvents()
        handleClosePopup()
      } else {
        throw new Error('Event was not edited')
      }
    } catch (error) {
      displayAlert('Add Error', `Failed to edit the event: ${error.message}`, 'error')
    }
  }

  const handleDeleteEvent = async () => {
    try {
      const success = await deleteEvent(eventToDelete.id)
      if (success) {
        displayAlert('Event Deleted', 'The event has been successfully deleted.', 'success')
        fetchEvents()
        setDeleteConfirmOpen(false)
      } else {
        displayAlert('Delete Error', 'Failed to delete the event. Please try again.', 'error')
      }
    } catch (error) {
      displayAlert('Delete Error', `Failed to delete the event: ${error.message}`, 'error')
    }
  }

  const onAdd = () => {
    setEventToEdit(null)
    handleOpenPopup()
  }

  const onEdit = (event) => {
    setEventToEdit(event)
    handleOpenPopup()
  }

  const onDelete = (event) => {
    document.activeElement?.blur()
    setEventToDelete(event)
    setDeleteConfirmOpen(true)
  }

  const cancelDelete = () => {
    setDeleteConfirmOpen(false)
    setEventToDelete(null)
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: '4rem',
        px: '1.5rem',
      }}
    >
      <DataTable
        tableTitle='Events'
        tableIcon={Event}
        tableColumns={fullColumns}
        tableData={events}
        showInactive={showInactive}
        setShowInactive={setShowInactive}
        eventsForDropdown={[]}
        onAddClick={onAdd}
        onEditClick={onEdit}
        onDeleteClick={onDelete}
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

      <ConfirmDeleteDialog
        open={deleteConfirmOpen}
        onCancel={cancelDelete}
        onConfirm={handleDeleteEvent}
      />
    </Box>
  )
}

export default EventManager
