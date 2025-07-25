import { Event } from '@mui/icons-material'
import { Box } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'

import ConfirmActivateEvent from '../../../components/admin/modals/ConfirmActivateEvent'
import ConfirmDeleteDialog from '../../../components/admin/modals/ConfirmDeleteDialog.jsx'
import ConfirmInactiveEvent from '../../../components/admin/modals/ConfirmInactiveEvent'
import AddEventModal from '../../../components/admin/modals/EventModal.jsx'
import DataTable from '../../../components/admin/tables/DataTable.jsx'
import { useAlert } from '../../../hooks/useAlert.js'
import {
  addEvent,
  deleteEvent,
  editEvent,
  getAllEvents,
} from '../../../services/eventService.js'
import { getAllHills } from '../../../services/hillService.js'
import { getAllLocations } from '../../../services/locationService.js'
import { getAllMountains } from '../../../services/mountainService.js'
import { formatDateTimeShortNoSec } from '../../../utils/formatDateTime.js'

const fullColumns = [
  { id: 'eventName', label: 'Event', width: '30%', align: 'left' },
  { id: 'location', label: 'Location', width: '12%', align: 'center' },
  { id: 'start', label: 'Start-Time', width: '10%', align: 'center' },
  { id: 'end', label: 'End-Time', width: '10%', align: 'center' },
  { id: 'duration', label: 'Length (hrs)', width: '10%', align: 'center' },
  { id: 'hills', label: 'Hls', width: '9%', align: 'center' },
  { id: 'mountains', label: 'Mts', width: '9%', align: 'center' },
  { id: 'activeStatus', label: 'Active', width: '10%', align: 'center' },
]

const EventManager = () => {
  const [openPopup, setOpenPopup] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [confirmDialog, setConfirmDialog] = useState(null)

  const [events, setEvents] = useState([])
  const [locations, setLocations] = useState([])
  const [mountainsList, setMountainsList] = useState([])
  const [mountains, setMountains] = useState({})
  const [hillsList, setHillsList] = useState([])
  const [hills, setHills] = useState({})

  const [eventToDelete, setEventToDelete] = useState(null)
  const [eventToEdit, setEventToEdit] = useState(null)
  const [eventToToggle, setEventToToggle] = useState(null)

  const [showInactive, setShowInactive] = useState(false)
  const [hasLoadedEvents, setHasLoadedEvents] = useState(false)

  const displayAlert = useAlert()

  const fetchLocations = useCallback(async () => {
    try {
      const locations = await getAllLocations()
      setLocations(locations)
    }
    catch (error) {
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

        const mountainIds = (event.mountains || []).map((m) => typeof m === 'object' ? m.id : m)
        const mountainNames = mountainIds.map((id) => mountains[id]).filter((name) => name)
        const hillIds = (event.hills || []).map((h) => typeof h === 'object' ? h.id : h)
        const hillNames = hillIds.map((id) => hills[id]).filter((name) => name)

        return {
          id: event.id,
          ...event,
          start: formatDateTimeShortNoSec(startTime),
          end: formatDateTimeShortNoSec(endTime),
          eventName: event.name || '',
          location: event.location?.name || '',
          locationId: event.location?.id,
          duration: durationInHours.toFixed(1),
          mountains: mountainNames.length ? mountainNames.join(', ') : 'None',
          mountainIds,
          hills: hillNames.length ? hillNames.join(', ') : 'None',
          hillIds,
          active: isActive,
          activeStatus: isActive ? 'Active' : 'Inactive',
          canReactivate: !isActive && !isPast,
        }
      })

      setEvents(formattedEvents)

      if (!hasLoadedEvents) {
        displayAlert(
          'Fresh backend data',
          `Loaded ${events.length} events from the backend.`,
          'success'
        )
        setHasLoadedEvents(true)
      }
    }
    catch (error) {
      displayAlert('Events Error', `${error.message}`, 'error')
    }
  }, [displayAlert, hills, mountains, hasLoadedEvents])

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
    }
    catch (error) {
      displayAlert('Mountains Error', error.message, 'error')
    }
  }, [displayAlert])

  const fetchHills = useCallback(async () => {
    try {
      const hillsData = await getAllHills()
      setHillsList(hillsData)

      const hillMap = {}
      for (let i = 0; i < hillsData.length; i++) {
        const hill = hillsData[i]
        hillMap[hill.id] = hill.name
      }
      setHills(hillMap)
    }
    catch (error) {
      displayAlert('Hills Error', error.message, 'error')
    }
  }, [displayAlert])

  useEffect(() => {
    fetchLocations()
    fetchMountains()
    fetchHills()
  }, [fetchLocations, fetchMountains, fetchHills])

  useEffect(() => {
    if (Object.keys(mountains).length > 0 && Object.keys(hills).length > 0) {
      fetchEvents()
    }
  }, [mountains, hills, fetchEvents])

  function getIds(items) {
    if (!Array.isArray(items)) {
      return []
    }

    return items.map(function (item) {
      if (typeof item === 'object' && item !== null && 'id' in item) {
        return item.id
      }
      else {
        return item
      }
    })
  }

  const handleAddEvent = async (eventData) => {
    try {
      const dataToSend = {
        ...eventData,
        mountains: getIds(eventData.mountains),
        hills: getIds(eventData.hills),
      }
      const response = await addEvent(dataToSend)
      if (response.status === 201 || response.status === 200) {
        displayAlert(
          'Event Created',
          'The event has been successfully created.',
          'success'
        )
        fetchEvents()
        setOpenPopup(false)
      }
      else {
        throw new Error('Event was not created')
      }
    }
    catch (error) {
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
        mountains: getIds(eventData.mountains),
        hills: getIds(eventData.hills),
      }
      const response = await editEvent(id, dataToSend)
      if (response.status === 201 || response.status === 200) {
        displayAlert(
          'Event Edited',
          'The event has been successfully edited.',
          'success'
        )
        fetchEvents()
        setOpenPopup(false)
      }
      else {
        throw new Error('Event was not edited')
      }
    }
    catch (error) {
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
      }
      else {
        displayAlert(
          'Delete Error',
          'Failed to delete the event. Please try again.',
          'error'
        )
      }
    }
    catch (error) {
      displayAlert(
        'Delete Error',
        `Failed to delete the event: ${error.message}`,
        'error'
      )
    }
  }

  const confirmToggleActiveStatus = async () => {
    if (!eventToToggle) return

    try {
      const updated = {
        ...eventToToggle,
        active: !eventToToggle.active,
        mountains: eventToToggle.mountainIds || [],
        hills: eventToToggle.hillIds || [],
        location: eventToToggle.locationId || eventToToggle.location?.id || null,
      }

      await editEvent(eventToToggle.id, updated)

      displayAlert(
        'Event Updated',
        `Event "${eventToToggle.name}" is now ${updated.active ? 'active' : 'inactive'}.`,
        'success'
      )

      fetchEvents()
    }
    catch (error) {
      displayAlert('Toggle Error', `Failed to update active status: ${error.message}`, 'error')
    }
    finally {
      setConfirmDialog(null)
      setEventToToggle(null)
    }
  }

  const onAdd = () => {
    setEventToEdit(null)
    setOpenPopup(true)
  }

  const onEdit = (event) => {
    setEventToEdit(event)
    setOpenPopup(true)
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
    if (event.active) {
      setConfirmDialog('inactive')
    }
    else {
      setConfirmDialog('activate')
    }
  }

  const cancelConfirmDialog = () => {
    setConfirmDialog(null)
    setEventToToggle(null)
  }

  const filteredHills = eventToEdit?.locationId
    ? hillsList.filter((h) => h.location === eventToEdit.locationId)
    : hillsList

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
          setOpenPopup(false)
          setEventToEdit(null)
        }}
        onAdd={handleAddEvent}
        onEdit={handleEditEvent}
        onLocation={locations}
        onMountains={mountainsList}
        onHills={filteredHills}
        eventToEdit={eventToEdit}
      />

      <ConfirmDeleteDialog
        open={deleteConfirmOpen}
        onCancel={cancelDelete}
        onConfirm={handleDeleteEvent}
      />

      <ConfirmInactiveEvent
        open={confirmDialog === 'inactive'}
        onCancel={cancelConfirmDialog}
        onConfirm={confirmToggleActiveStatus}
      />

      <ConfirmActivateEvent
        open={confirmDialog === 'activate'}
        onCancel={cancelConfirmDialog}
        onConfirm={confirmToggleActiveStatus}
      />
    </Box>
  )
}

export default EventManager
