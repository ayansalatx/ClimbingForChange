import PersonIcon from '@mui/icons-material/Person'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'

import ConfirmDeleteDialog from '../../../components/admin/modals/ConfirmDeleteDialog.jsx'
import AddParticipantModal from '../../../components/admin/modals/ParticipantModal'
import DataTable from '../../../components/admin/tables/DataTable.jsx'
import { useAlert } from '../../../hooks/useAlert.js'
import {
  addNewParticipant,
  deleteParticipant,
  editParticipant,
  getAllParticipants,
} from '../../../services/participantService'
import { getAllTeams } from '../../../services/teamService.js'
import { getAllEvents } from '../../../services/eventService.js'

const fullColumns = [
  { id: 'firstName', label: 'First Name', align: 'left', width: '30%' },
  { id: 'lastName', label: 'Last Name', align: 'left', width: '30%' },
  { id: 'teamName', label: 'Team Name', align: 'center', width: '40%' },
]

const ParticipantManager = () => {
  const [participants, setParticipants] = useState([])
  const [popupOpen, setPopupOpen] = useState(false)
  const [teams, setTeams] = useState([])
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [selectedParticipant, setSelectedParticipant] = useState(null)
  const [deletedParticipant, setDeletedParticipant] = useState(null)
  const [loading, setLoading] = useState(false)
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)

  const displayAlert = useAlert()

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      try {
        const participantListRaw = await getAllParticipants()
        const participantList = participantListRaw.map((p) => ({
          ...p,
          teamName: p.teamId?.name || '—',
        }))
        setParticipants(participantList)

        const teamsList = await getAllTeams()
        setTeams(teamsList)

        const eventsList = await getAllEvents()
        setEvents(eventsList)

        displayAlert(
          'Participants Loaded',
          `Loaded ${participantList.length} participants from the backend.`,
          'success'
        )
      } catch (error) {
        displayAlert(
          'Error',
          `Failed to Load Participants: ${error.message}`,
          'error'
        )
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [displayAlert])

  const onAdd = () => {
    if (loading) return
    setSelectedParticipant(null)
    setPopupOpen(true)
  }

  const onEdit = (participant) => {
    if (loading) return
    setSelectedParticipant(participant)
    setPopupOpen(true)
  }

  const onDelete = (participant) => {
    if (loading) return
    document.activeElement?.blur()
    setDeletedParticipant(participant)
    setDeleteConfirmOpen(true)
  }

  const cancelDelete = () => {
    setDeleteConfirmOpen(false)
    setDeletedParticipant(null)
  }

  const confirmedDelete = async () => {
    if (!deletedParticipant) return
    setLoading(true)
    try {
      await deleteParticipant(deletedParticipant.id)

      const newParticipantList = await getAllParticipants()
      const formattedList = newParticipantList.map((p) => ({
        ...p,
        teamName: p.teamId?.name || '—',
      }))
      setParticipants(formattedList)
      setDeleteConfirmOpen(false)
      displayAlert(
        'Participant Deleted',
        `Deleted ${deletedParticipant.firstName} ${deletedParticipant.lastName}.`,
        'success'
      )
    } catch (error) {
      displayAlert(
        'Error',
        `Failed to delete ${deletedParticipant.firstName} ${deletedParticipant.lastName}: ${error.message}`,
        'error'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (participantData) => {
    if (!participantData) return
    setLoading(true)
    try {
      if (participantData.id) {
        await editParticipant(participantData.id, participantData)
        displayAlert(
          'Edited Participant',
          `Edited ${participantData.firstName} ${participantData.lastName}.`,
          'success'
        )
      } else {
        await addNewParticipant(participantData)
        displayAlert(
          'New Participant Added',
          `Added ${participantData.firstName} ${participantData.lastName}.`,
          'success'
        )
      }
      const newParticipantList = await getAllParticipants()
      const formattedList = newParticipantList.map((p) => ({
        ...p,
        teamName: p.teamId?.name || '—',
      }))
      setParticipants(formattedList)
    } catch (error) {
      displayAlert(
        'Error',
        `Failed to save participant: ${error.message}`,
        'error'
      )
    } finally {
      setLoading(false)
    }
    setPopupOpen(false)
  }
  console.log('selectedEvent:', selectedEvent)
  
  const filteredParticipants = selectedEvent
    ? participants.filter((p) => p.eventId === selectedEvent.id)
    : participants
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
        tableTitle="Participants"
        tableIcon={PersonIcon}
        tableColumns={fullColumns}
        tableData={filteredParticipants}
        loading={loading}
        selectedEvent={selectedEvent}
        eventsForDropdown={events}
        setSelectedEvent={setSelectedEvent}
        onAddClick={onAdd}
        onEditClick={onEdit}
        onDeleteClick={onDelete}
      />
      <AddParticipantModal
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        onAdd={handleSave}
        participantData={selectedParticipant}
        teamNames={teams}
      />
      <ConfirmDeleteDialog
        open={deleteConfirmOpen}
        onCancel={cancelDelete}
        onConfirm={confirmedDelete}
      />
    </Box>
  )
}

export default ParticipantManager