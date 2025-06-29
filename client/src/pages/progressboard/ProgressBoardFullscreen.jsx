import { alpha, Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import C4CFavicon from '../../assets/C4C-branding/Favicon.png'
import AutoScrollTable from '../../components/progressboard/auto-scroll/AutoScrollTable'
import { getTeamsForDisplay } from '../../services/teamService'
import theme from '../../styles/theme'

// Define columns for full width screen
const columns = [
  { id: 'name', label: 'Team', width: '25%' },
  { id: 'mountainName', label: 'Mountain', width: '12%' },
  { id: 'elevation', label: 'Total Elevation', width: '12%' },
  { id: 'currentElevation', label: 'Elevation', width: '12%' },
  { id: 'lapsRequired', label: 'Total Laps', width: '7%' },
  { id: 'lapsCompleted', label: 'Laps', width: '7%' },
  { id: 'lapsToGo', label: 'Laps To Go', width: '8%' },
  { id: 'bestLap', label: 'Best Lap', width: '7%' },
  { id: 'timeElapsed', label: 'Time Elapsed', width: '10%' },
]

const ProgressBoardFullscreen = () => {
  // State for teams
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        navigate('/progress')
      }
    }

    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [navigate])

  // Load Participant data from server
  useEffect(() => {
    async function loadData() {
      try {
        const teamList = await getTeamsForDisplay()

        setTeams(teamList)
      } catch (e) {
        console.log('Failed to load progress data', e)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

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
        src="/assets/mountain-with-way-points.mp4"
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
              mb: '1rem',
            }}
          >
            <img
              src={C4CFavicon}
              alt="Climbing for Change Logo"
              style={{ maxWidth: '7rem', width: 'auto' }}
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
                sx={{ fontSize: '5rem', fontStyle: 'italic' }}
              >
                Climbing For Change 2025
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
              teams={teams}
              loading={loading}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ProgressBoardFullscreen
