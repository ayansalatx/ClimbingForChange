import PersonIcon from '@mui/icons-material/Person'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'

import ConfirmDeleteDialog from '../../../components/admin/modals/ConfirmDeleteDialog.jsx'
import AddParticipantModal from '../../../components/admin/modals/ParticipantModal'
import DataTable from '../../../components/admin/tables/DataTable.jsx'
import { useAlert } from '../../../hooks/useAlert.js'
import { getAllEvents } from '../../../services/eventService.js'
import {
  addNewParticipant,
  deleteParticipant,
  editParticipant,
  getParticipantsByEvent,
} from '../../../services/participantService'
import { getTeamsByEvent } from '../../../services/teamService.js'

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
    async function loadEvents() {
      setLoading(true)
      try {
        const eventsList = await getAllEvents()
        setEvents(eventsList)

        displayAlert('Loaded Events', 'Successfully loaded event data.', 'success')
      } catch (error) {
        displayAlert('Error', `Failed to load events: ${error.message}`, 'error')
      } finally {
        setLoading(false)
      }
    }
    loadEvents()
  }, [displayAlert])

  useEffect(() => {
    if (!selectedEvent) {
      setParticipants([])
      setTeams([])
      return
    }

    async function loadParticipantsAndTeams() {
      setLoading(true)
      try {

        const participantsList = await getParticipantsByEvent(selectedEvent)
        setParticipants(participantsList)

        const filteredTeams = await getTeamsByEvent(selectedEvent)
        setTeams(filteredTeams)
        displayAlert(
          'Data Loaded',
          `Loaded ${participantsList.length} participants and ${filteredTeams.length} teams for selected event.`,
          'success'
        )
        
      } catch (error) {
        displayAlert('Error', `Failed to load participants or teams: ${error.message}`, 'error')
      } finally {
        setLoading(false)
      }
    }

    loadParticipantsAndTeams()
  }, [selectedEvent, displayAlert])

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

      const updatedList = await getParticipantsByEvent(selectedEvent)
      setParticipants(updatedList)

      setDeleteConfirmOpen(false)
      displayAlert(
        'Participant Deleted',
        `Deleted ${deletedParticipant.firstName} ${deletedParticipant.lastName}.`,
        'success'
      )
    } catch (error) {
      displayAlert('Error', `Failed to delete participant: ${error.message}`, 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (participantData) => {
    if (!participantData) return
    setLoading(true)
    try {
      participantData.eventId = selectedEvent
      if (participantData.team) {
        participantData.teamId = participantData.team.id
        delete participantData.team
      }
      if (participantData.id) {
        await editParticipant(participantData.id, participantData)
        displayAlert('Edited Participant', `Edited ${participantData.firstName} ${participantData.lastName}.`, 'success')
      } else {
        await addNewParticipant(participantData)
        displayAlert('New Participant Added', `Added ${participantData.firstName} ${participantData.lastName}.`, 'success')
      }
      const updatedList = await getParticipantsByEvent(selectedEvent)
      setParticipants(updatedList)
    } catch (error) {
      displayAlert('Error', `Failed to save participant: ${error.message}`, 'error')
    } finally {
      setLoading(false)
      setPopupOpen(false)
    }

  }

  const filteredParticipants = selectedEvent ? participants : []
  const currentTeamId = selectedParticipant?.team?.id

  const filteredTeams = teams.filter(
    (team) =>
      String(team.event) === String(selectedEvent) || String(team._id || team.id) === String(currentTeamId)
  )

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
        tableTitle='Participants'
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
        teamNames={filteredTeams}
        selectedEvent={selectedEvent} 
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