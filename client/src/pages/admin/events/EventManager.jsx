import { Event } from '@mui/icons-material'
import { Box } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'

import ConfirmDeleteDialog from '../../../components/admin/modals/ConfirmDeleteDialog.jsx'
import ConfirmInactiveEvent from '../../../components/admin/modals/ConfirmInactiveEvent.jsx'
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
import { getAllMountains } from '../../../services/mountainService.js'

const fullColumns = [
  { id: 'eventName', label: 'Event', width: '34%', align: 'left' },
  { id: 'location', label: 'Location', width: '12%', align: 'left' },
  { id: 'start', label: 'Start-Time', width: '15%', align: 'left' },
  { id: 'end', label: 'End-Time', width: '15%', align: 'left' },
  { id: 'duration', label: 'Duration (hrs)', width: '12%', align: 'left' },
  { id: 'mountains', label: 'Mountains', width: '14%', align: 'left' },
  { id: 'activeStatus', label: 'Active', width: '12%', align: 'left' },
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
  const [mountains, setMountains] = useState({})
  const [mountainsList, setMountainsList] = useState([])
  const [confirmInactiveOpen, setConfirmInactiveOpen] = useState(false)
  const [eventToToggle, setEventToToggle] = useState(null)

  const handleOpenPopup = () => setOpenPopup(true)
  const handleClosePopup = () => setOpenPopup(false)

  const displayAlert = useAlert()

  const fetchLocations = useCallback(async () => {
    try {
      const locations = await getAllLocations()
      setLocations(locations)
    } catch (error) {
      displayAlert('Locations Error', `${error.message}`, 'error')
    }
  }, [displayAlert])

  const fetchEvents = useCallback(async () => {
    try {
      const events = await getAllEvents()
      const formattedEvents = events.map((event) => {
        const startTime = new Date(event.startDateTime)
        const endTime = new Date(event.endDateTime)
        const durationInHours = (endTime - startTime) / (1000 * 60 * 60)

        const isPast = endTime < new Date()
        const isActive = event.active && !isPast

        const mountainNames = (event.mountains || [])
          .map((m) => m.name)
          .filter((name) => name !== null && name !== undefined && name !== '')
        const mountainIds = (event.mountains || []).map((m) => m.id || m._id)

        return {
          id: event.id,
          ...event,
          start: formatDateTime(startTime),
          end: formatDateTime(endTime),
          eventName: event.name || '',
          location: event.location?.name || '',
          locationId: event.location?.id,
          duration: durationInHours.toFixed(1),
          mountains: mountainNames.length ? mountainNames.join(', ') : 'None',
          mountainIds,
          active: isActive,
          activeStatus: isActive ? 'Active' : 'Inactive', 
          canReactivate: !isActive && !isPast,
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
  }, [displayAlert])

  const fetchMountains = useCallback(async () => {
    try {
      const mountainsData = await getAllMountains()
      setMountainsList(mountainsData)
      const mountainMap = {}
      for (let i = 0; i < mountainsData.length; i++) {
        const mountain = mountainsData[i]
        mountainMap[mountain.id] = mountain.name
      }
      setMountains(mountainMap)
    } catch (error) {
      displayAlert('Mountains Error', error.message, 'error')
    }
  }, [displayAlert])

  useEffect(() => {
    fetchLocations()
    fetchMountains()
  }, [fetchLocations, fetchMountains])

  useEffect(() => {
    if (Object.keys(mountains).length > 0) {
      fetchEvents()
    }
  }, [mountains, fetchEvents])

  const handleAddEvent = async (eventData) => {
    try {
      const dataToSend = {
        ...eventData,
        mountains: eventData.mountains?.map((m) => typeof m === 'object' ? m.id || m._id : m) || [],
      }
      const response = await addEvent(dataToSend)
      if (response.status === 201 || response.status === 200) {
        displayAlert(
          'Event Created',
          'The event has been successfully created.',
          'success'
        )
        fetchEvents()
        handleClosePopup()
      } else {
        throw new Error('Event was not created')
      }
    } catch (error) {
      displayAlert(
        'Add Error',
        `Failed to add the event: ${error.message}`,
        'error'
      )
    }
  }

  const handleEditEvent = async (id, eventData) => {
    try {
      const dataToSend = {
        ...eventData,
        mountains: eventData.mountains?.map((m) => typeof m === 'object' ? m.id || m._id : m) || [],
      }
      const response = await editEvent(id, dataToSend)
      if (response.status === 201 || response.status === 200) {
        displayAlert(
          'Event Edited',
          'The event has been successfully edited.',
          'success'
        )
        fetchEvents()
        handleClosePopup()
      } else {
        throw new Error('Event was not edited')
      }
    } catch (error) {
      displayAlert(
        'Edit Error',
        `Failed to edit the event: ${error.message}`,
        'error'
      )
    }
  }

  const handleDeleteEvent = async () => {
    try {
      const success = await deleteEvent(eventToDelete.id)
      if (success) {
        displayAlert(
          'Event Deleted',
          'The event has been successfully deleted.',
          'success'
        )
        fetchEvents()
        setDeleteConfirmOpen(false)
      } else {
        displayAlert(
          'Delete Error',
          'Failed to delete the event. Please try again.',
          'error'
        )
      }
    } catch (error) {
      displayAlert(
        'Delete Error',
        `Failed to delete the event: ${error.message}`,
        'error'
      )
    }
  }

  const confirmToggleInactive = async () => {
    if (!eventToToggle) return

    try {
      const updated = {
        ...eventToToggle,
        active: !eventToToggle.active,
        mountains: eventToToggle.mountainIds || [],
        location: eventToToggle.locationId || eventToToggle.location?.id || null,
      }
      await editEvent(eventToToggle.id, updated)
      displayAlert(
        'Event Updated',
        `Event "${eventToToggle.name}" is now ${updated.active ? 'active' : 'inactive'}.`,
        'success'
      )
      fetchEvents()
    } catch (error) {
      displayAlert('Toggle Error', `Failed to update active status: ${error.message}`, 'error')
    } finally {
      setConfirmInactiveOpen(false)
      setEventToToggle(null)
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

  const requestToggleActive = (event) => {
    setEventToToggle(event)
    setConfirmInactiveOpen(true)
  }

  const cancelToggleInactive = () => {
    setConfirmInactiveOpen(false)
    setEventToToggle(null)
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
        tableTitle="Events"
        tableIcon={Event}
        tableColumns={fullColumns}
        tableData={events}
        showInactive={showInactive}
        setShowInactive={setShowInactive}
        activeOnChange={requestToggleActive}
        toggleDisabled={(row) => !row.active && !row.canReactivate}
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
        onMountains={mountainsList}
        eventToEdit={eventToEdit}
      />

      <ConfirmDeleteDialog
        open={deleteConfirmOpen}
        onCancel={cancelDelete}
        onConfirm={handleDeleteEvent}
      />
      <ConfirmInactiveEvent
        open={confirmInactiveOpen}
        onCancel={cancelToggleInactive}
        onConfirm={confirmToggleInactive}
      />
    </Box>
  )
}

export default EventManager
