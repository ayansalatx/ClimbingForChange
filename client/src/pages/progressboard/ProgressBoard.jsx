import { Box, Container } from '@mui/material'
import { useEffect, useState } from 'react'

import C4CHorizontalGreenLogo from '../../assets/C4C-branding/Climbing-For-Change-Full-Horizontal_Green.png'
import EventSelector from '../../components/progressboard/EventSelector'
import ProgressSearch from '../../components/progressboard/ProgressSearch'
import ProgressTable from '../../components/progressboard/ProgressTable'
import { getAllEvents, getDisplayEventTeams } from '../../services/eventService'

// Define columns for full width screen
const fullColumns = [
  { id: 'name', label: 'Team', minWidth: 200 },
  { id: 'mountainName', label: 'Mountain', minWidth: 115 },
  { id: 'elevation', label: 'Elevation', minWidth: 60 },
  { id: 'currentElevation', label: 'Current Elevation', minWidth: 60 },
  { id: 'lapsRequired', label: 'Total Laps', minWidth: 40 },
  { id: 'lapsCompleted', label: 'Laps Completed', minWidth: 70 },
  { id: 'lapsToGo', label: 'Laps To Go', minWidth: 40 },
  { id: 'bestLap', label: 'Best Lap', minWidth: 40 },
  { id: 'timeElapsed', label: 'Time Elapsed', minWidth: 60 },
]

// const medColumns = [
//   { id: 'teamName', label: 'Team', minWidth: 200 },
//   { id: 'mountain', label: 'Mountain', minWidth: 115 },
//   { id: 'elevation', label: 'Elevation', minWidth: 60 },
//   { id: 'current-elevation', label: 'Current Elevation', minWidth: 60 },
//   { id: 'total-laps', label: 'Total Laps', minWidth: 40 },
//   { id: 'laps-completed', label: 'Laps Completed', minWidth: 70 },
//   { id: 'laps-to-go', label: 'Laps To Go', minWidth: 40 },
//   { id: 'best-lap', label: 'Best Lap', minWidth: 40 },
//   { id: 'time-elapsed', label: 'Time Elapsed', minWidth: 60 },
// ]

const ProgressBoard = () => {
  // State for teams
  const [teams, setTeams] = useState([])
  // State for events
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)

  // State to store current search input string
  const [searchString, setSearchString] = useState('')
  // State for teams filtered by the search input
  const [filteredTeams, setFilteredTeams] = useState([])

  // Load Participant data from server
  useEffect(() => {
    async function loadData() {
      try {
        const eventList = await getAllEvents()
        setEvents(eventList)
      } catch (e) {
        console.log('Failed to load progress data', e)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    if (events.length > 0 && !selectedEvent) {
      const now = new Date()

      const sorted = [...events].sort(
        (a, b) => new Date(a.startDateTime) - new Date(b.startDateTime)
      )

      const currentOrUpcoming = sorted.find((ev) => {
        const start = new Date(ev.startDateTime)
        const end = new Date(ev.endDateTime)
        return (now >= start && now <= end) || now < start
      })

      if (currentOrUpcoming) {
        setSelectedEvent(currentOrUpcoming.id)
      }
    }
  }, [events, selectedEvent])

  useEffect(() => {
  }, [selectedEvent])


  useEffect(() => {
    const loadTeamsForEvent = async () => {
      if (!selectedEvent) return
      try {
        const teamsForEvent = await getDisplayEventTeams(selectedEvent)
        setTeams(teamsForEvent)
      } catch (e) {
        console.log('Failed to load event teams', e)
      }
    }

    loadTeamsForEvent()
  }, [selectedEvent])

  useEffect(() => {
    if (!searchString) {
      setFilteredTeams(teams)
      return
    }
    const filteredTeams = teams.filter((team) => {
      const search = searchString.toLowerCase()

      const teamMatch = team.name.toLowerCase().includes(search)

      const participantMatch = team.participants.some((participant) => {
        return (
          participant.firstName.toLowerCase().includes(search) ||
          participant.lastName.toLowerCase().includes(search)
        )
      })

      return teamMatch || participantMatch
    })
    setFilteredTeams(filteredTeams)
  }, [searchString, teams])

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        bgcolor: 'primary.main',
        flexDirection: 'column',
        alignContent: 'center',
      }}
    >
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          width: '95vw',
          height: '95vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: '1rem' }}>
          <a
            href="https://www.climbingforchange.ca/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={C4CHorizontalGreenLogo}
              alt="Climbing for Change Logo"
              style={{ maxWidth: '15.5rem', width: 'auto' }}
            />
          </a>
        </Box>

        <Box sx={{ mb: '1rem', maxWidth: '25vw' }}>
          <ProgressSearch
            searchString={searchString}
            onChange={setSearchString}
            teamNames={[...new Set(teams.map((team) => team.name))]}
          />
          <EventSelector
            events={events}
            selectedEvent={selectedEvent}
            setSelectedEvent={setSelectedEvent}
          />
        </Box>

        <Box sx={{ flexGrow: 1, width: '100%', overflowX: 'hidden' }}>
          <ProgressTable columns={fullColumns} teams={filteredTeams} eventId={selectedEvent} />
        </Box>
      </Container>
    </Box>
  )
}

export default ProgressBoard
