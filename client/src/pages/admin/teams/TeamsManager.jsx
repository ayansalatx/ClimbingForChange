import { People } from '@mui/icons-material'
import { Box } from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react'

import ConfirmDeleteDialog from '../../../components/admin/modals/ConfirmDeleteDialog.jsx'
import AddTeamModal from '../../../components/admin/modals/TeamModal.jsx'
import DataTable from '../../../components/admin/tables/DataTable.jsx'
import { useAlert } from '../../../hooks/useAlert.js'
import { getAllEvents } from '../../../services/eventService.js'
import { addTeam, deleteTeam, editTeam, getAllTeams } from '../../../services/teamService.js'
import { getRfidTags } from '../../../services/rfidService.js'

const fullColumns = [
  { id: 'name', label: 'Team Name', width: '40%', align: 'left' },
  { id: 'mountain', label: 'Mountain', width: '20%', align: 'left' },
  { id: 'hill', label: 'Hill', width: '20%', align: 'left' },
  { id: 'rfidTag', label: 'RFID Tag', width: '20%', align: 'left' },
]

const TeamsManager = () => {
  const [openPopup, setOpenPopup] = useState(false)
  const [teams, setTeams] = useState([])
  const [teamToEdit, setTeamToEdit] = useState(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [teamToDelete, setTeamToDelete] = useState(null)
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [rfidTags, setrfidTags] = useState([])

  const displayAlert = useAlert()

  const teamsDataForDisplay = useMemo(() => {
    return teams.map((team) => ({
      id: team.id,
      name: team.name,
      mountain: team.mountain,
      mountainId: team.mountainId,
      hill: team.hill,
      hillId: team.hillId,
      eventId: team.event,
      rfidTag: team.rfidTag
    }))
  }, [teams])

  const getRfidTagList = async () => {
    const result = await getRfidTags()
    const formatted = result.map((tag) => ({
      id: tag.id,
      label: tag.serialNumber
    }))
    setrfidTags(formatted)
    return formatted
  }

  const getTeamFromId = (id) => {
    return teams.find((team) => team.id === id)
  }

  const getEventName = (events, id) => {
    const result = events.find((event) => event.id === id)
    return result ? result.name : 'N/A'
  }

  const handleOpenPopup = () => setOpenPopup(true)
  const handleClosePopup = () => setOpenPopup(false)

  const fetchEvents = useCallback(async () => {
    try {
      const result = await getAllEvents()
      const formattedEvents = result.map((event) => ({
        id: event.id,
        name: event.name || '',
      }))
      setEvents(formattedEvents)

      const rfidList = await getRfidTagList()
      await fetchTeams(formattedEvents, rfidList)

    } catch (error) {
      displayAlert('Events Error', `${error.message}`, 'error')
    }
  }, [displayAlert])

  const fetchTeams = async (formattedEvents, rfidList) => {
    try {
      const teams = await getAllTeams()
      //filter
      const usedRfidIds = teams
        .map(team => team.rfidTag?._id || team.rfidTag?.id || team.rfidTag)
        .filter(Boolean)
      //filter
      const availableRfidTags = rfidList.filter(tag => !usedRfidIds.includes(tag.id))
      setrfidTags(availableRfidTags)

      const formattedTeams = teams.map((team) => {
        return {
          id: team.id,
          name: team.name,
          mountainId: team.mountain.id,
          mountain: team.mountain.name,
          hillId: team.hill?.id,
          hill: team.hill?.name,
          event: team.event,
          eventName: getEventName(formattedEvents, team.event),
          rfidTag: (() => {
            const tagId = team.rfidTag?._id || team.rfidTag?.id || team.rfidTag
            const match = rfidList.find(tag => tag.id === tagId)
            return match?.label || ''
          })(),

        }
      })

      setTeams(formattedTeams)
      displayAlert('Loaded', `Loaded ${teams.length} teams from the backend.`, 'success')
    } catch (error) {
      displayAlert('Teams Error', `${error.message}`, 'error')
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  const handleAddTeam = async (teamData) => {
    try {
      const response = await addTeam(teamData)
      if (response.status === 201 || response.status === 200) {
        displayAlert('Team Created', 'The team has been successfully created.', 'success')
        const rfidList = await getRfidTagList()
        fetchTeams(events, rfidList)
        handleClosePopup()
      } else {
        throw new Error('Team was not created')
      }
    } catch (error) {
      displayAlert('Add Error', `Failed to add the team: ${error.message}`, 'error')
    }
  }

  const handleEditTeam = async (id, teamData) => {
    try {
      const response = await editTeam(id, teamData)
      if (response.status === 201 || response.status === 200) {
        displayAlert('Team Edited', 'The team has been successfully edited.', 'success')
        const rfidList = await getRfidTagList()
        fetchTeams(events, rfidList)
        handleClosePopup()
      } else {
        throw new Error('Team was not edited')
      }
    } catch (error) {
      displayAlert('Edit Error', `Failed to edit the team: ${error.message}`, 'error')
    }
  }

  const handleDeleteTeam = async () => {
    try {
      const success = await deleteTeam(teamToDelete.id)
      if (success) {
        displayAlert('Team Deleted', 'The team has been successfully deleted.', 'success')
        const rfidList = await getRfidTagList()
        fetchTeams(events, rfidList)
        setDeleteConfirmOpen(false)
      } else {
        displayAlert('Delete Error', 'Failed to delete the team. Please try again.', 'error')
      }
    } catch (error) {
      displayAlert('Delete Error', `Failed to delete the team: ${error.message}`, 'error')
    }
  }

  const onAdd = () => {
    setTeamToEdit(null)
    handleOpenPopup()
  }

  const onEdit = (team) => {
    const teamData = getTeamFromId(team.id)
    if (!teamData) {
      displayAlert('Edit Error', 'Team not found', 'error')
      return
    }
    setTeamToEdit(teamData)
    handleOpenPopup()
  }

  const onDelete = async (team) => {
    document.activeElement?.blur()
    setTeamToDelete(team)
    setDeleteConfirmOpen(true)
  }

  const cancelDelete = () => {
    setDeleteConfirmOpen(false)
    setTeamToDelete(null)
  }

  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      py: '4rem',
      px: '1.5rem',
    }}>
      <DataTable
        tableTitle='Teams'
        tableIcon={People}
        tableColumns={fullColumns}
        tableData={(selectedEvent === null || selectedEvent.toString() === '') ? [] : teamsDataForDisplay}
        showInactive={true}
        eventsForDropdown={events}
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
        onAddClick={onAdd}
        onEditClick={onEdit}
        onDeleteClick={onDelete}
      />

      <AddTeamModal
        open={openPopup}
        onClose={() => {
          handleClosePopup()
          setTeamToEdit(null)
        }}
        onAdd={handleAddTeam}
        onEdit={handleEditTeam}
        teamToEdit={teamToEdit}
        rfidTagList={rfidTags}
      />

      <ConfirmDeleteDialog
        open={deleteConfirmOpen}
        onCancel={cancelDelete}
        onConfirm={handleDeleteTeam}
      />
    </Box>
  )
}

export default TeamsManager
