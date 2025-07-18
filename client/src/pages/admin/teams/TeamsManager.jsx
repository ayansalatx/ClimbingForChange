import { People } from '@mui/icons-material'
import { Box } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'

import ConfirmDeleteDialog from '../../../components/admin/modals/ConfirmDeleteDialog.jsx'
import AddTeamModal from '../../../components/admin/modals/TeamModal.jsx'
import DataTable from '../../../components/admin/tables/DataTable.jsx'
import { useAlert } from '../../../hooks/useAlert.js'
import { getAllEvents } from '../../../services/eventService.js'
import {
  addTeam,
  deleteTeam,
  editTeam,
  getAllTeams,
} from '../../../services/teamService.js'

const fullColumns = [
  { id: 'name', label: 'Team Name', width: '50%', align: 'left' },
  { id: 'mountain', label: 'Mountain', width: '10%', align: 'left' },
  { id: 'hill', label: 'Hill', width: '10%', align: 'left' },
  { id: 'eventName', label: 'Event', width: '10%', align: 'left' },
  { id: 'isSoloTeam', label: 'Solo Team?', width: '10%', align: 'left' },
  { id: 'lapsRequired', label: 'Laps Req.', width: '10%', align: 'left' },
  {
    id: 'totalDistanceRequired',
    label: 'Distance Req.',
    width: '10%',
    align: 'left',
  },
  { id: 'startDateTime', label: 'Start Time', width: '20%', align: 'left' },
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

const TeamsManager = () => {
  const [openPopup, setOpenPopup] = useState(false)
  const [teams, setTeams] = useState([])
  const [teamToEdit, setTeamToEdit] = useState(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [teamToDelete, setTeamToDelete] = useState(null)
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)

  const displayAlert = useAlert()

  const teamsDataForDisplay = useMemo(() => {
    return teams.map((team) => ({
      id: team.id,
      name: team.name,
      isSoloTeam: team.isSoloTeam ? 'Yes' : 'No',
      lapsRequired: team.lapsRequired,
      totalDistanceRequired: team.totalDistanceRequired,
      startDateTime: formatDateTime(team.startDateTime),
      mountain: team.mountain,
      mountainId: team.mountainId,
      hill: team.hill,
      hillId: team.hillId,
      event: team.event,
      eventName: team.eventName,
    }))
  }, [teams])

  const getTeamFromId = (id) => {
    return teams.find((team) => team.id === id)
  }

  const getEventName = (events, id) => {
    var result = events.find((event) => event.id == id)
    if (result == undefined) return 'N/A'
    return result.name
  }

  const handleOpenPopup = () => setOpenPopup(true)
  const handleClosePopup = () => setOpenPopup(false)

  const fetchEvents = async () => {
    try {
      const result = await getAllEvents()
      const formattedEvents = result.map((event) => {
        return {
          id: event.id,
          name: event.name || '',
        }
      })
      setEvents(formattedEvents)
      fetchTeams(formattedEvents)
    } catch (error) {
      displayAlert('Events Error', `${error.message}`, 'error')
    }
  }

  const fetchTeams = async (formattedEvents) => {
    try {
      const teams = await getAllTeams()
      const formattedTeams = teams.map((team) => ({
        id: team.id,
        name: team.name,
        isSoloTeam: team.isSoloTeam,
        lapsRequired: team.hill.lapElevationGain,
        totalDistanceRequired: team.hill.lapDistance,
        startDateTime: team.startDateTime,
        mountainId: team.mountain.id,
        mountain: team.mountain.name,
        hillId: team.hill?.id,
        hill: team.hill?.name,
        event: team.event,
        eventName: getEventName(formattedEvents, team.event),
      }))
      setTeams(formattedTeams)
      displayAlert(
        'Loaded',
        `Loaded ${teams.length} teams from the backend.`,
        'success'
      )
    } catch (error) {
      displayAlert('Teams Error', `${error.message}`, 'error')
    }
  }

  useEffect(() => {
    fetchEvents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAddTeam = async (teamData) => {
    try {
      const response = await addTeam(teamData)
      if (response.status === 201 || response.status === 200) {
        displayAlert(
          'Team Created',
          'The team has been successfully created.',
          'success'
        )
        fetchTeams(events)
        handleClosePopup()
      } else {
        throw new Error('Team was not created')
      }
    } catch (error) {
      displayAlert(
        'Add Error',
        `Failed to add the team: ${error.message}`,
        'error'
      )
    }
  }

  const handleEditTeam = async (id, teamData) => {
    try {
      const response = await editTeam(id, teamData)
      if (response.status === 201 || response.status === 200) {
        displayAlert(
          'Team Edited',
          'The team has been successfully edited.',
          'success'
        )
        fetchTeams(events)
        handleClosePopup()
      } else {
        throw new Error('Team was not edited')
      }
    } catch (error) {
      displayAlert(
        'Edit Error',
        `Failed to edit the team: ${error.message}`,
        'error'
      )
    }
  }

  const handleDeleteTeam = async () => {
    try {
      const success = await deleteTeam(teamToDelete.id)
      if (success) {
        displayAlert(
          'Team Deleted',
          'The team has been successfully deleted.',
          'success'
        )
        fetchTeams(events)
        setDeleteConfirmOpen(false)
      } else {
        displayAlert(
          'Delete Error',
          'Failed to delete the team. Please try again.',
          'error'
        )
      }
    } catch (error) {
      displayAlert(
        'Delete Error',
        `Failed to delete the team: ${error.message}`,
        'error'
      )
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
    // setTeamToEdit(team)
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
        tableTitle="Teams"
        tableIcon={People}
        tableColumns={fullColumns}
        tableData={
          selectedEvent === null || selectedEvent.toString() === ''
            ? []
            : teamsDataForDisplay
        }
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
