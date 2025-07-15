import { alpha, Box, Typography, useMediaQuery } from '@mui/material'
import { useEffect, useState } from 'react'

import C4CHorizontalGreenLogo from '../../assets/C4C-branding/Climbing-For-Change-Full-Horizontal_Green.png'
import C4CHorizontalBlueLogo from '../../assets/C4C-branding/Climbing-For-Change-Horizontal_Green.png'
import ProgressList from '../../components/progressboard/cards/ProgressCardList'
import ProgressTable from '../../components/progressboard/tables/regular/ProgressTable'
import {
  getActiveUpcomingEvents,
  getDisplayEventTeams,
  getPastEvents,
} from '../../services/eventService'
import theme from '../../styles/theme'

// Define columns for full width screen
const lgColumns = [
  { id: 'name', label: 'Team', width: '25%' },
  { id: 'mountainName', label: 'Mountain', width: '12%' },
  { id: 'totalElevation', label: 'Total Elevation', width: '12%' },
  { id: 'currentElevation', label: 'Current Elevation', width: '12%' },
  { id: 'lapsRequired', label: 'Total Laps', width: '7%' },
  { id: 'lapsCompleted', label: 'Laps', width: '7%' },
  { id: 'lapsToGo', label: 'Laps To Go', width: '8%' },
  { id: 'bestLap', label: 'Best Lap', width: '7%' },
  { id: 'timeElapsed', label: 'Time Elapsed', width: '10%' },
]

const mdColumns = [
  { id: 'name', label: 'Team', width: '30%' },
  { id: 'mountainName', label: 'Mountain', width: '15%' },
  { id: 'elevation', label: 'Elevation', width: '20%' },
  { id: 'laps', label: 'Laps', width: '20%' },
  { id: 'lapsToGo', label: 'Laps To Go', width: '7%' },
  { id: 'bestLap', label: 'Best Lap', width: '8%' },
  { id: 'timeElapsed', label: 'Time Elapsed', width: '10%' },
]

const smColumns = [
  { id: 'name', label: 'Team', width: '28%' },
  { id: 'mountainName', label: 'Mount.', width: '13%' },
  { id: 'elevation', label: 'Elev.', width: '15%' },
  { id: 'laps', label: 'Laps', width: '13%' },
  { id: 'lapsToGo', label: 'To Go', width: '7%' },
  { id: 'bestLap', label: 'Best Lap', width: '9%' },
  { id: 'timeElapsed', label: 'Time', width: '27%' },
]

const ProgressBoard = () => {
  // Get media queries to render appropriate content
  const isXLarge = useMediaQuery(theme.breakpoints.up('xl'))
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'))
  const isMedium = useMediaQuery(theme.breakpoints.up('md'))
  const isSmall = useMediaQuery(theme.breakpoints.up('sm'))
  const isXSmall = useMediaQuery(theme.breakpoints.down('sm'))

  // Calc size to determine columns
  let columns
  if (isLarge || isXLarge) {
    columns = lgColumns
  } else if (isMedium) {
    columns = mdColumns
  } else if (isSmall) {
    columns = smColumns
  } else {
    columns = [] // no columns for mobile
  }

  // State for teams
  const [teams, setTeams] = useState([])
  const [teamsLength, setTeamsLength] = useState()
  // State for events
  const [activeEvents, setActiveEvents] = useState([])
  const [pastEvents, setPastEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)

  // State to store current search input string
  const [searchString, setSearchString] = useState('')
  // State for teams filtered by the search input
  const [filteredTeams, setFilteredTeams] = useState([])

  const [loading, setLoading] = useState(true)

  // Load Participant data from server
  useEffect(() => {
    async function loadEventData() {
      try {
        const upcomingEventList = await getActiveUpcomingEvents()
        const pastEventList = await getPastEvents()
        setActiveEvents(upcomingEventList)
        setPastEvents(pastEventList)
      } catch (e) {
        console.log('Failed to load progress data', e)
      }
    }

    loadEventData()
  }, [])

  // Set default event as the event that is ongoing or upcoming
  // If no upcoming then set to last event
  // If no events then null
  useEffect(() => {
    if (activeEvents.length > 0 && !selectedEvent) {
      setSelectedEvent(activeEvents[0].id)
    } else if (pastEvents.length > 0 && !selectedEvent) {
      setSelectedEvent(pastEvents[0].id)
    } else if (activeEvents.length === 0 && pastEvents.length === 0) {
      setSelectedEvent(null)
    }
  }, [activeEvents, pastEvents, selectedEvent])

  useEffect(() => {}, [selectedEvent])

  useEffect(() => {
    const loadTeamsForEvent = async () => {
      if (!selectedEvent) return
      try {
        const teamsForEvent = await getDisplayEventTeams(selectedEvent)

        setTeamsLength(teamsForEvent.length)
        setTeams(teamsForEvent)
      } catch (e) {
        console.log('Failed to load event teams', e)
      } finally {
        setLoading(false)
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
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* https://pixabay.com/videos/search/terrain%20blue%20gray%20mountain/ */}

      {isXSmall ? (
        <Box
          component='img'
          src='/assets/mountain-range-illustration-2.jpeg'
          alt='Mountain background'
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        />
      ) : (
        <video
          src='/assets/progress-board-background.mp4'
          autoPlay
          loop
          muted
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        />
      )}

      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: isXSmall
            ? `linear-gradient(to bottom, ${alpha(theme.palette.primary.main, 0.8)}, ${alpha(theme.palette.primary.main, 0.3)}, ${alpha(theme.palette.primary.main, 0.8)})`
            : alpha(theme.palette.primary.main, 0.6),
        }}
      >
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            p: { xxs: 2, xs: 2, sm: 2, md: 2, lg: 3, xl: 3 },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              mb: {
                sm: 1.25,
                md: 1.5,
              },
            }}
          >
            {/* Logo */}
            <Box sx={{ mb: { sm: 0.5 } }}>
              <Box
                component='img'
                src={isXSmall ? C4CHorizontalBlueLogo : C4CHorizontalGreenLogo}
                alt='Climbing for Change Logo'
                sx={{
                  maxWidth: {
                    xxs: '11rem',
                    xs: '13rem',
                    sm: '8rem',
                    md: '12rem',
                    lg: '14rem',
                    xl: '15.5rem',
                  },
                  height: 'auto',
                  display: 'block',
                  ml: { xxs: 0.5, xs: 1 },
                }}
              />
            </Box>

            {/* Title */}
            {!isXSmall && (
              <Box
                sx={{
                  display: 'flex',
                  flexGrow: 1,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  mt: {
                    xxs: 0,
                    xs: 0,
                    sm: 0,
                    md: 0,
                  },
                }}
              >
                <Typography
                  variant='h1'
                  color='secondary.main'
                  fontWeight='bold'
                  textTransform='uppercase'
                  letterSpacing='.05rem'
                  sx={{
                    fontStyle: 'italic',
                    mr: {
                      xxs: 0,
                      xs: 2,
                      sm: 17,
                      md: 26,
                      lg: 32,
                      xl: 34,
                    },
                    fontSize: {
                      xxs: '1.8rem',
                      xs: '2.2rem',
                      sm: '2.1rem',
                      md: '3.25rem',
                      lg: '4rem',
                      xl: '4.5rem',
                    },
                    lineHeight: 1.1,
                    textAlign: 'center',
                  }}
                >
                  Climb Progress
                </Typography>
              </Box>
            )}
          </Box>

          {isXSmall ? (
            <ProgressList
              teams={filteredTeams}
              activeEvents={activeEvents}
              pastEvents={pastEvents}
              selectedEvent={selectedEvent}
              setSelectedEvent={setSelectedEvent}
              searchString={searchString}
              setSearchString={setSearchString}
              loading={loading}
            />
          ) : (
            <Box sx={{ flexGrow: 1, width: '100%', overflowX: 'hidden' }}>
              <ProgressTable
                columns={columns}
                teams={filteredTeams}
                activeEvents={activeEvents}
                pastEvents={pastEvents}
                selectedEvent={selectedEvent}
                setSelectedEvent={setSelectedEvent}
                searchString={searchString}
                setSearchString={setSearchString}
                teamsLength={teamsLength}
                loading={loading}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default ProgressBoard
