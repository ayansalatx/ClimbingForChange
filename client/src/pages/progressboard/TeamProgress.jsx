import {
  alpha,
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import C4CHorizontalGreenLogo from '../../assets/C4C-branding/Climbing-For-Change-Full-Horizontal_Green.png'
import C4CHorizontalBlueLogo from '../../assets/C4C-branding/Climbing-For-Change-Horizontal_Green.png'
import { getTeamForDisplay } from '../../services/teamService'
import LapTable from '../../components/progressboard/tables/laps/LapTable'
import theme from '../../styles/theme'

const columns = [
  { id: 'lapNumber', label: 'Lap', width: '5%', align: 'center' },
  { id: 'startDateTime', label: 'Start', width: '37%', align: 'left' },
  { id: 'endDateTime', label: 'Finish', width: '37%', align: 'left' },
  { id: 'duration', label: 'Time', width: '20%', align: 'left' },
  { id: 'completed', label: '', width: '3%', align: 'center' },
]

const TeamProgress = () => {
  // Get media queries to render appropriate content
  // const isXLarge = useMediaQuery(theme.breakpoints.up('xl'))
  // const isLarge = useMediaQuery(theme.breakpoints.up('lg'))
  // const isMedium = useMediaQuery(theme.breakpoints.up('md'))
  // const isSmall = useMediaQuery(theme.breakpoints.up('sm'))
  const isXSmall = useMediaQuery(theme.breakpoints.down('sm'))

  const [team, setTeam] = useState()
  const [loading, setLoading] = useState(true)

  const { teamId } = useParams()

  // Load Participant data from server
  useEffect(() => {
    async function loadData() {
      try {
        const teamForDisplay = await getTeamForDisplay(teamId)
        console.log(teamForDisplay)
        setTeam(teamForDisplay)
      } catch (e) {
        console.log('Failed to load progress data', e)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [teamId])

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
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
              ></Box>
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
                flexDirection: 'row',
                height: '100%',
                flexGrow: 1,
                backgroundColor: alpha(theme.palette.primary.main, 0.75),
                borderRadius: '4px',
                p: 2,
                gap: 2,
                minHeight: 0,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  height: '100%',
                  flexGrow: 1,
                  flexDirection: 'column',
                  borderRadius: '4px',
                }}
              >
                <Box
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      height: '100%',
                      borderRadius: '4px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      backgroundColor: 'gray.light',
                      pb: 2,
                    }}
                  >
                    <Typography
                      variant="h1"
                      color="primary.light"
                      fontWeight="bold"
                      textTransform="uppercase"
                      letterSpacing=".05rem"
                      sx={{
                        fontStyle: 'italic',
                        fontSize: {
                          xxs: '1.8rem',
                          xs: '2.2rem',
                          sm: '2.1rem',
                          md: '3rem',
                          lg: '3.5rem',
                          xl: '4rem',
                        },
                        textAlign: 'left',
                        pb: 2,
                      }}
                    >
                      {team?.name}
                    </Typography>
                    <Box
                      sx={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}
                    >
                      {team?.participants.map((participant, index) => (
                        <Box key={index} sx={{ width: '50%', px: 2 }}>
                          <Typography
                            sx={{
                              fontSize: {
                                xxs: '1rem',
                                xs: '1rem',
                                sm: '1.25rem',
                                md: '1.5rem',
                                lg: '1.5rem',
                                xl: '2rem',
                              },
                              color: 'primary.main',
                            }}
                          >
                            {participant.firstName} {participant.lastName}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      height: '100%',
                      borderRadius: '4px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      backgroundColor: 'gray.light',
                      p: 2,
                    }}
                  >
                    <Box
                      sx={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}
                    >
                      <Box
                        sx={{ display: 'flex', flexWrap: 'wrap', width: '50%' }}
                      >
                        <Box sx={{ width: '50%', px: 2 }}>
                          <Typography
                            variant="h6"
                            color="primary.main"
                            sx={{ textAlign: 'left' }}
                          >
                            Mountain:
                          </Typography>
                        </Box>
                        <Box sx={{ width: '50%', px: 2 }}>
                          <Typography
                            variant="h6"
                            color="primary.main"
                            sx={{ textAlign: 'right' }}
                          >
                            {team?.mountainName}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{ display: 'flex', flexWrap: 'wrap', width: '50%' }}
                      >
                        <Box sx={{ width: '50%', px: 2 }}>
                          <Typography
                            variant="h6"
                            color="primary.main"
                            sx={{ textAlign: 'left' }}
                          >
                            Elevation:
                          </Typography>
                        </Box>
                        <Box sx={{ width: '50%', px: 2 }}>
                          <Typography
                            variant="h6"
                            color="primary.main"
                            sx={{ textAlign: 'right' }}
                          >
                            {team?.totalElevation} {team?.elevationUnit}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      sx={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}
                    >
                      <Box
                        sx={{ display: 'flex', flexWrap: 'wrap', width: '50%' }}
                      >
                        <Box sx={{ width: '50%', px: 2 }}>
                          <Typography
                            variant="h6"
                            color="primary.main"
                            sx={{ textAlign: 'left' }}
                          >
                            Total Laps:
                          </Typography>
                        </Box>
                        <Box sx={{ width: '50%', px: 2 }}>
                          <Typography
                            variant="h6"
                            color="primary.main"
                            sx={{ textAlign: 'right' }}
                          >
                            {team?.totalLaps}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{ display: 'flex', flexWrap: 'wrap', width: '50%' }}
                      >
                        <Box sx={{ width: '50%', px: 2 }}>
                          <Typography
                            variant="h6"
                            color="primary.main"
                            sx={{ textAlign: 'left' }}
                          >
                            Lap Elevation:
                          </Typography>
                        </Box>
                        <Box sx={{ width: '50%', px: 2 }}>
                          <Typography
                            variant="h6"
                            color="primary.main"
                            sx={{ textAlign: 'right' }}
                          >
                            {team?.hillLap} {team?.hillLapUnit}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  height: '100%',
                  flexDirection: 'column',
                  borderRadius: '4px',
                  gap: 2,
                  overflowY: 'hidden',
                  minHeight: 0,
                }}
              >
                <Box
                  sx={{
                    height: '100%',
                    borderRadius: '4px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    overflowY: 'hidden',
                  }}
                >
                  <LapTable tableColumns={columns} laps={team.laps} />
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  height: '100%',
                  flexDirection: 'column',
                  borderRadius: '4px',
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'gray.light',
                  }}
                >
                  <Typography sx={{ color: 'primary.main' }}>Laps</Typography>
                </Box>

                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'background.paper',
                    borderRadius: '4px',
                    p: 2,
                  }}
                >
                  <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                    <CircularProgress
                      variant="determinate"
                      value={100}
                      sx={{
                        color: 'gray.main',
                        filter: 'drop-shadow(0 0 1px rgba(0, 0, 0, 0.3))',
                      }}
                      size={200}
                      thickness={5}
                    />
                    <CircularProgress
                      variant="determinate"
                      value={team?.elevationProgress}
                      sx={{
                        color: 'secondary.main',
                        filter: 'drop-shadow(0 0 4px rgba(118, 163, 46, 0.3))',
                        position: 'absolute',
                        left: 0,
                        '& .MuiCircularProgress-circle': {
                          strokeLinecap: 'round',
                        },
                      }}
                      size={200}
                      thickness={5}
                    />
                  </Box>
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ color: 'primary.main' }}
                    >
                      {team?.currentElevation} ft
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default TeamProgress
