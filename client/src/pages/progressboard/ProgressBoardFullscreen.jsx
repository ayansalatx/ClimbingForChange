import { alpha, Box, Typography, useMediaQuery } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import C4CFavicon from '../../assets/C4C-branding/Favicon.png'
import WarningDialog from '../../components/admin/modals/WarningDialog'
import AutoScrollTable from '../../components/progressboard/tables/auto-scroll/AutoScrollTable'
import { getLeaderboard } from '../../services/leaderboardService'
import theme from '../../styles/theme'

// Define columns for full width screen
const xlColumns = [
  { id: 'name', label: 'Team', width: '25%' },
  { id: 'mountainName', label: 'Mountain', width: '12%' },
  { id: 'totalElevation', label: 'Total Elevation', width: '12%' },
  { id: 'currentElevation', label: 'Current Elevation', width: '12%' },
  { id: 'lapsRequired', label: 'Total Laps', width: '8%' },
  { id: 'lapsCompleted', label: 'Laps', width: '7%' },
  { id: 'lapsToGo', label: 'Laps To Go', width: '7%' },
  { id: 'bestLap', label: 'Best Lap', width: '7%' },
  { id: 'timeElapsed', label: 'Time Elapsed', width: '10%' },
]

const lgColumns = [
  { id: 'name', label: 'Team', width: '25%' },
  { id: 'mountainName', label: 'Mountain', width: '12%' },
  { id: 'totalElevation', label: 'Total Elev.', width: '12%' },
  { id: 'currentElevation', label: 'Elev.', width: '9%' },
  { id: 'lapsRequired', label: 'Total Laps', width: '9%' },
  { id: 'lapsCompleted', label: 'Laps', width: '7%' },
  { id: 'lapsToGo', label: 'To Go', width: '5%' },
  { id: 'bestLap', label: 'Best Lap', width: '10%' },
  { id: 'timeElapsed', label: 'Time', width: '10%' },
]

const mdColumns = [
  { id: 'name', label: 'Team', width: '29%' },
  { id: 'mountainName', label: 'Mount.', width: '12%' },
  { id: 'elevation', label: 'Elev.', width: '18%' },
  { id: 'laps', label: 'Laps', width: '12%' },
  { id: 'lapsToGo', label: 'To Go', width: '7%' },
  { id: 'bestLap', label: 'Best Lap', width: '10%' },
  { id: 'timeElapsed', label: 'Time', width: '12%' },
]

const smColumns = [
  { id: 'name', label: 'Team', width: '33%' },
  { id: 'mountainName', label: 'Mount.', width: '14%' },
  { id: 'elevation', label: 'Elevation', width: '20%' },
  { id: 'laps', label: 'Laps', width: '13%' },
  { id: 'lapsToGo', label: 'To Go', width: '10%' },
  { id: 'timeElapsed', label: 'Time', width: '10%' },
]

const xsmColumns = [
  { id: 'name', label: 'Team', width: '33%' },
  { id: 'mountainName', label: 'Mount.', width: '14%' },
  { id: 'elevation', label: 'Elev.', width: '20%' },
  { id: 'laps', label: 'Laps', width: '13%' },
  { id: 'lapsToGo', label: 'To Go', width: '10%' },
  { id: 'timeElapsed', label: 'Time', width: '10%' },
]

const ProgressBoardFullscreen = () => {
  // Get media queries to render appropriate content
  const isXLarge = useMediaQuery(theme.breakpoints.up('xl'))
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'))
  const isMedium = useMediaQuery(theme.breakpoints.up('md'))
  const isSmall = useMediaQuery(theme.breakpoints.up('sm'))

  // Calc size to determine columns
  let columns
  if (isXLarge) {
    columns = xlColumns
  } else if (isLarge) {
    columns = lgColumns
  } else if (isMedium) {
    columns = mdColumns
  } else if (isSmall) {
    columns = smColumns
  } else {
    columns = xsmColumns
  }

  const { eventId } = useParams()
  const navigate = useNavigate()

  // State for teams
  const [teams, setTeams] = useState([])
  const [warningOpen, setWarningOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const showWarning = () => {
    setWarningOpen(true)
  }

  useEffect(() => {
    const handleSpace = (event) => {
      if (event.code === 'Space') {
        navigate('/progress', { replace: true })
      }
    }

    window.addEventListener('keydown', handleSpace)
    return () => window.removeEventListener('keydown', handleSpace)
  }, [navigate])

  // Load Team data from server
  useEffect(() => {
    const loadLeaderboard = async () => {
      if (!eventId) return
      try {
        const leaderboard = await getLeaderboard(eventId)
        const teamsForDisplay = leaderboard.teams

        setTeams(teamsForDisplay)
      } catch {
        showWarning()
      } finally {
        setLoading(false)
      }
    }

    loadLeaderboard()

    const intervalId = setInterval(loadLeaderboard, 2000)

    return () => {
      clearInterval(intervalId)
    }
  }, [eventId])

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
      <video
        src="/assets/progress-board-background.mp4"
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

      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: alpha(theme.palette.primary.main, 0.7),
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
            p: 3,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              mb: { xxs: 1, xs: 1, sm: 2, md: 2.5, lg: 3, xl: 3 },
            }}
          >
            <Box
              component="img"
              src={C4CFavicon}
              alt="Climbing for Change Logo"
              sx={{
                width: 'auto',
                maxHeight: {
                  xxs: '1rem',
                  xs: '1.75rem',
                  sm: '2.2rem',
                  md: '3.8rem',
                  lg: '5rem',
                  xl: '5rem',
                },
                maxWidth: {
                  xxs: '3rem',
                  xs: '4rem',
                  sm: '5rem',
                  md: '6rem',
                  lg: '7rem',
                  xl: '8rem',
                },
                ml: { xxs: 0.25, xs: 0.25, sm: 0.5, lg: 1 },
              }}
            />
            <Box
              sx={{
                display: 'flex',
                flexGrow: 1,
                justifyContent: 'center',
                alignContent: 'center',
              }}
            >
              <Typography
                variant="h1"
                color="secondary.main"
                fontWeight={'bold'}
                textTransform={'uppercase'}
                sx={{
                  fontSize: {
                    xxs: '1.3rem',
                    xs: '1.45rem',
                    sm: '2.1rem',
                    md: '3.4rem',
                    lg: '5rem',
                    xl: '5rem',
                  },
                  lineHeight: {
                    xxs: '1.3rem',
                    xs: '1.5rem',
                    sm: '2.25rem',
                    md: '3.4rem',
                    lg: '5rem',
                    xl: '5rem',
                  },
                  fontStyle: 'italic',
                }}
              >
                Climb Progress
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              width: '100%',
              minHeight: 0,
              overflowY: 'hidden',
            }}
          >
            <AutoScrollTable
              columns={columns}
              teams={[...teams, ...teams]}
              loading={loading}
            />
          </Box>
        </Box>
      </Box>
      <WarningDialog
        open={warningOpen}
        title={'Data Loading Error'}
        message={'Data for event is not loading.'}
        onCancel={() => {
          setWarningOpen(false)
          navigate('/progress', { replace: true })
        }}
      />
    </Box>
  )
}

export default ProgressBoardFullscreen
