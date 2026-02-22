import { People } from '@mui/icons-material'
import { Box } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import ConfirmDeleteDialog from '../../../components/admin/modals/ConfirmDeleteDialog.jsx'
import TeamModal from '../../../components/admin/modals/TeamModal.jsx'
import DataTable from '../../../components/admin/tables/DataTable.jsx'
import { useAlert } from '../../../hooks/useAlert.js'
import { getAllEvents } from '../../../services/eventService.js'
import { getRfidTags } from '../../../services/rfidService.js'
import { addTeam, deleteTeam, editTeam, getTeamsByEvent } from '../../../services/teamService.js'

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
  const [highlightedTeamId, setHighlightedTeamId] = useState(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [searchParams] = useSearchParams()

  const displayAlert = useAlert()

  const getTeamFromId = (id) => {
    return teams.find((team) => team.id === id)
  }

  const getEventName = (events, id) => {
    const result = events.find((event) => event.id === id)
    return result ? result.name : 'N/A'
  }

  const handleOpenPopup = () => setOpenPopup(true)
  const handleClosePopup = () => setOpenPopup(false)

  const fetchRfids = async () => {
    const rfidtags = await getRfidTags()
    return rfidtags
  }

  const fetchTeams = useCallback(async () => {
    try {
      if (!selectedEvent) return

      const teams = await getTeamsByEvent(selectedEvent)

      const formattedTeams = teams.map((team) => {
        return {
          id: team.id,
          name: team.name,
          mountainId: team.mountain.id,
          mountain: team.mountain.name,
          hillId: team.hill?.id,
          hill: team.hill?.name,
          eventId: team.event,
          eventName: getEventName(events, team.event),
          rfidTag: (() => {
            const tagId = team.rfidTag?._id || team.rfidTag?.id || team.rfidTag
            const match = rfidTags.find((tag) => tag.id === tagId)
            return match?.serialNumber || ''
          })(),
          active: true,
          isHighlighted: team.id === highlightedTeamId,
        }
      })
      setTeams(formattedTeams)
    }
    catch (error) {
      displayAlert('Teams Error', `${error.message}`, 'error')
    }
  }, [displayAlert, selectedEvent, events, rfidTags, highlightedTeamId])

  useEffect(() => {
    fetchTeams()
  }, [fetchTeams])

  // Handle pagination for highlighted teams
  useEffect(() => {
    if (highlightedTeamId && teams.length > 0) {
      const highlightedIndex = teams.findIndex((team) => team.id === highlightedTeamId)
      if (highlightedIndex !== -1) {
        const correctPage = Math.floor(highlightedIndex / rowsPerPage)
        setPage(correctPage)
      }
    }
  }, [highlightedTeamId, teams, rowsPerPage])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events = await getAllEvents()
        setEvents(events)

        const rfidList = await fetchRfids()
        setrfidTags(rfidList)

        // Check URL parameters and set selected event if provided
        const eventParam = searchParams.get('event')
        const teamParam = searchParams.get('team')
        if (eventParam && events.length > 0) {
          const eventExists = events.find((event) => event.id === eventParam)
          if (eventExists) {
            setSelectedEvent(eventParam)
          }
        }
        if (teamParam) {
          setHighlightedTeamId(teamParam)
          // Clear highlight after 5 seconds
          setTimeout(() => {
            setHighlightedTeamId(null)
          }, 2000)
        }
      }
      catch (error) {
        displayAlert('Events Error', `${error.message}`, 'error')
      }
    }
    fetchEvents()
  }, [displayAlert, searchParams])

  const handleAddTeam = async (teamData) => {
    try {
      const response = await addTeam(teamData)
      if (response.status === 201 || response.status === 200) {
        displayAlert('Team Created', 'The team has been successfully created.', 'success')
        fetchTeams()
        handleClosePopup()
      }
      else {
        throw new Error('Team was not created')
      }
    }
    catch (error) {
      displayAlert('Add Error', `Failed to add the team: ${error.message}`, 'error')
    }
  }

  const handleEditTeam = async (id, teamData) => {
    try {
      const response = await editTeam(id, teamData)
      if (response.status === 201 || response.status === 200) {
        displayAlert('Team Edited', 'The team has been successfully edited.', 'success')
        await fetchRfids()
        fetchTeams()
        handleClosePopup()
      }
      else {
        throw new Error('Team was not edited')
      }
    }
    catch (error) {
      displayAlert('Edit Error', `Failed to edit the team: ${error.message}`, 'error')
    }
  }

  const handleDeleteTeam = async () => {
    try {
      const success = await deleteTeam(teamToDelete.id)
      if (success) {
        displayAlert('Team Deleted', 'The team has been successfully deleted.', 'success')
        await fetchRfids()
        fetchTeams()
        setDeleteConfirmOpen(false)
      }
      else {
        displayAlert('Delete Error', 'Failed to delete the team. Please try again.', 'error')
      }
    }
    catch (error) {
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
    }}
    >

      <DataTable
        tableTitle="Teams"
        tableIcon={People}
        tableColumns={fullColumns}
        tableData={selectedEvent === null ? [] : teams}
        showInactive={true}
        eventsForDropdown={events}
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
        onAddClick={onAdd}
        onEditClick={onEdit}
        onDeleteClick={onDelete}
        externalPage={page}
        externalSetPage={setPage}
        externalRowsPerPage={rowsPerPage}
        externalSetRowsPerPage={setRowsPerPage}
      />

      <TeamModal
        open={openPopup}
        onClose={() => {
          handleClosePopup()
          setTeamToEdit(null)
        }}
        onAdd={handleAddTeam}
        onEdit={handleEditTeam}
        teamToEdit={teamToEdit}
        rfidTagList={rfidTags}
        preSelectedEvent={selectedEvent}
        eventsData={events}
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
