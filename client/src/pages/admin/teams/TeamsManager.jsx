import { Box, Typography } from '@mui/material'
// import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'

// import TeamsTable from '../../../components/admin/forms/teamforms/TeamsTable'
// import SearchBar from '../../../components/admin/forms/eventforms/SearchBar'
import { People } from '@mui/icons-material'
import DataTable from '../../../components/admin/tables/DataTable.jsx'
import ConfirmDeleteDialog from '../../../components/admin/modals/ConfirmDeleteDialog.jsx'
import AddTeamModal from '../../../components/admin/modals/TeamModal.jsx'
import { useAlert } from '../../../hooks/useAlert.js'
import {addTeam,deleteTeam,editTeam, getAllTeams} from '../../../services/teamService.js'
import { addEvent, deleteEvent, editEvent,getAllEvents } from '../../../services/eventService.js'
import { getAllMountains } from '../../../services/mountainService.js'

const fullColumns = [
  { id: 'name', label: 'Team Name', width: '50%', align: 'left' },
  { id: 'isSoloTeam', label: 'Solo Team?', width: '10%', align: 'left' },
  { id: 'lapsRequired', label: 'Laps Req.', width: '10%', align: 'left' },
  { id: 'totalDistanceRequired', label: 'Distance Req.', width: '10%', align: 'left' },
  { id: 'startDateTime', label: 'Start Time', width: '20%', align: 'left' },
]

// const fullColumns = [
//   { id: 'name', label: 'Team Name', minWidth: 170 },
//   { id: 'isSoloTeam', label: 'Solo Team?', minWidth: 100 },
//   { id: 'lapsRequired', label: 'Laps Req.', minWidth: 100 },
//   { id: 'totalDistanceRequired', label: 'Distance Req.', minWidth: 130 },
//   { id: 'startDateTime', label: 'Start Time', minWidth: 170 }
// ]

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
  // const [searchTerm, setSearchTerm] = useState('')
  const [teams, setTeams] = useState([])
  const [teamToEdit, setTeamToEdit] = useState(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [teamToDelete, setTeamToDelete] = useState(null)
  const [showInactive, setShowInactive] = useState(false)
  // const [mountains, setMountains] = useState([])
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)

  const displayAlert = useAlert()

  const handleOpenPopup = () => setOpenPopup(true)
  const handleClosePopup = () => setOpenPopup(false)

  const fetchTeams = async () => {
    try {
      const teams = await getAllTeams()
      const formattedTeams = teams.map((team) => ({
        id: team.id,
        name: team.name,
        isSoloTeam: team.isSoloTeam ? 'Yes' : 'No',
        lapsRequired: team.lapsRequired,
        totalDistanceRequired: team.totalDistanceRequired,
        startDateTime: formatDateTime(team.startDateTime),
      }))
      setTeams(formattedTeams)
      console.log(`Fetched teams: ${JSON.stringify(teams)}`)
      displayAlert('Loaded', `Loaded ${teams.length} teams from the backend.`, 'success')
    } catch (error) {
      displayAlert('Teams Error', `${error.message}`, 'error')
    }
  }

  const fetchEvents = async () => {
    try {
      const events = await getAllEvents()
      const formattedEvents = events.map((event) => {
    
        return {
          id: event.id,
          name: event.name || '',
        }
      })
      setEvents(formattedEvents)
      // displayAlert('Fresh backend data', `Loaded ${events.length} events from the backend.`, 'success')
      console.log('Fetched events:', events)
    } catch (error) {
      displayAlert('Events Error', `${error.message}`, 'error')
    }
  }

  // const fetchMountains = async () => {
  //   try {
  //     const mountainData = await getAllMountains()
  //     setMountains(mountainData)
  //   } catch (error) {
  //     displayAlert('Mountains Error', error.message, 'error')
  //   }
  // }

  useEffect(() => {
    fetchEvents()
    fetchTeams()
    // fetchMountains()
  }, [displayAlert])

  const handleAddTeam = async (teamData) => {
    try {
      const response = await addTeam(teamData)
      if (response.status === 201 || response.status === 200) {
        displayAlert('Team Created', 'The team has been successfully created.', 'success')
        fetchTeams()
        handleClosePopup()
      } else {
        throw new Error('Team was not created')
      }
    } catch (error) {
      displayAlert('Add Error', `Failed to add the team: ${error.message}`, 'error')
    }
  }

  // const requestEditTeam = (team) => {
  //   setTeamToEdit(team)
  //   setOpenPopup(true)
  // }

  const handleEditTeam = async (id, teamData) => {
    try {
      const response = await editTeam(id, teamData)
      if (response.status === 201 || response.status === 200) {
        displayAlert('Team Edited', 'The team has been successfully edited.', 'success')
        fetchTeams()
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
        fetchTeams()
        setDeleteConfirmOpen(false)
      } else {
        displayAlert('Delete Error', 'Failed to delete the team. Please try again.', 'error')
      }
    } catch (error) {
      displayAlert('Delete Error', `Failed to delete the team: ${error.message}`, 'error')
    }
  }

  const handleSelectEvent = async (eventId) => {
      setSelectedEvent(eventId)
  }

  const onAdd = () => {
    setTeamToEdit(null)
    handleOpenPopup()
  }

  const onEdit = (team) => {
    setTeamToEdit(team)
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
        tableTitle="Teams"
        tableIcon={People}
        tableColumns={fullColumns}
        tableData={teams}
        showInactive={true}
        setShowInactive={setShowInactive}
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
