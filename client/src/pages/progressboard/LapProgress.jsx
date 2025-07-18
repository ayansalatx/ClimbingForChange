import { alpha, Box, CircularProgress, useMediaQuery } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import C4CHorizontalGreenLogo from '../../assets/C4C-branding/Climbing-For-Change-Full-Horizontal_Green.png'
import C4CHorizontalBlueLogo from '../../assets/C4C-branding/Climbing-For-Change-Horizontal_Green.png'
import WarningDialog from '../../components/admin/modals/WarningDialog'
import TeamHeader from '../../components/progressboard/cards/TeamHeader'
import LapTable from '../../components/progressboard/tables/laps/LapTable'
import { getLeaderboardTeam } from '../../services/leaderboardService'
import theme from '../../styles/theme'

const smColumns = [
  { id: 'lapNumber', label: 'Lap', width: '5%', align: 'center' },
  { id: 'startDateTime', label: 'Start', width: '35%', align: 'center' },
  { id: 'endDateTime', label: 'Finish', width: '35%', align: 'center' },
  { id: 'duration', label: 'Time', width: '15%', align: 'center' },
  { id: 'completed', label: 'Done', width: '10%', align: 'center' },
]

const xsColumns = [
  { id: 'lapNumber', label: 'Lap', width: '5%', align: 'center' },
  { id: 'startDateTime', label: 'Start', width: '35%', align: 'center' },
  { id: 'endDateTime', label: 'Finish', width: '35%', align: 'center' },
  { id: 'duration', label: 'Time', width: '15%', align: 'center' },
  { id: 'completed', label: '', width: '10%', align: 'center' },
]

const LapProgress = () => {
  const isXSmall = useMediaQuery(theme.breakpoints.down('sm'))

  const { teamId } = useParams()

  const [warningOpen, setWarningOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const [team, setTeam] = useState()

  const showWarning = () => {
    setWarningOpen(true)
  }

  // Load Team data from server
  useEffect(() => {
    async function loadData() {
      try {
        const teamForDisplay = await getLeaderboardTeam(teamId)
        setTeam(teamForDisplay)
      } catch {
        showWarning()
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [teamId])

  // Calc size to determine stat labels
  let columns
  if (isXSmall) {
    columns = xsColumns
  } else {
    columns = smColumns
  }

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
          component="img"
          src="/assets/mountain-range-illustration-2.jpeg"
          alt="Mountain background"
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
          overflowY: 'auto',
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
                component="img"
                src={isXSmall ? C4CHorizontalBlueLogo : C4CHorizontalGreenLogo}
                alt="Climbing for Change Logo"
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
              </Box>
            )}
          </Box>
          {loading ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                height: '100%',
                flexGrow: 1,
                backgroundColor: alpha(theme.palette.primary.main, 0.75),
                borderRadius: '4px',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CircularProgress color="secondary" />
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                flexGrow: 1,
                backgroundColor: alpha(theme.palette.primary.main, 0.75),
                borderRadius: '4px',
                p: { xxs: 1.5, xs: 2 },
                gap: { xxs: 1.25, xs: 2 },
                minHeight: 0,
              }}
            >
              {/* Team Header */}
              <TeamHeader teamName={team?.name} />

              {/* Laps Table */}
              <LapTable tableColumns={columns} laps={team?.laps} />
            </Box>
          )}
        </Box>
      </Box>
      <WarningDialog
        open={warningOpen}
        title={'Data Loading Error'}
        message={'Data for team laps is not loading.'}
        onCancel={() => setWarningOpen(false)}
      />
    </Box>
  )
}

export default LapProgress
