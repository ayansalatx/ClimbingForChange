import {
  alpha,
  Box,
  Typography,
  useMediaQuery,
  CircularProgress,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import C4CHorizontalGreenLogo from '../../assets/C4C-branding/Climbing-For-Change-Full-Horizontal_Green.png'
import C4CHorizontalBlueLogo from '../../assets/C4C-branding/Climbing-For-Change-Horizontal_Green.png'
import { getTeamForDisplay } from '../../services/teamService'
import theme from '../../styles/theme'

const TeamProgress = () => {
  // Get media queries to render appropriate content
  const isXLarge = useMediaQuery(theme.breakpoints.up('xl'))
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'))
  const isMedium = useMediaQuery(theme.breakpoints.up('md'))
  const isSmall = useMediaQuery(theme.breakpoints.up('sm'))
  const isXSmall = useMediaQuery(theme.breakpoints.down('sm'))

  const [team, setTeam] = useState()
  const [loading, setLoading] = useState(true)

  const { teamId } = useParams()

  // Load Participant data from server
  useEffect(() => {
    async function loadData() {
      try {
        const teamForDisplay = await getTeamForDisplay(teamId)
        setTeam(teamForDisplay)
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
          src='/assets/mountain-with-way-points-full.mp4'
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
              ></Box>
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              height: '100%',
              flexGrow: 1,
              backgroundColor: alpha(theme.palette.primary.main, 0.75),
              borderRadius: '4px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                height: '100%',
                height: '100%',
                flexGrow: 1,
                flexDirection: 'column',
                p: 2,
                gap: 2,
                borderRadius: '4px',
              }}
            >
              <Box
                sx={{
                  width: '50%',
                  height: '100%',
                  borderRadius: '3px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  backgroundColor: 'gray.light',
                }}
              >
                <Typography
                  variant='h1'
                  color='primary.light'
                  fontWeight='bold'
                  textTransform='uppercase'
                  letterSpacing='.05rem'
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
                  }}
                >
                  {team?.name}
                </Typography>
                {team?.participants.map((participant, index) => (
                  <Box sx={{ width: '100%' }}>
                    <Typography sx={{ color: 'primary.main' }}>
                      {participant.firstName} {participant.lastName}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                height: '100%',
                flexDirection: 'column',
                height: '100%',
                p: 2,
                gap: 2,
                borderRadius: '3px',
              }}
            >
              <Box
                sx={{
                  width: '9rem',
                  height: '9rem',
                  borderRadius: '3px',
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
                  width: '9rem',
                  height: '9rem',
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'background.paper',
                  borderRadius: '3px',
                }}
              >
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                  <CircularProgress
                    variant='determinate'
                    value={100}
                    sx={{
                      color: 'gray.light',
                      filter: 'drop-shadow(0 0 1px rgba(0, 0, 0, 0.3))',
                    }}
                    size={120}
                    thickness={5}
                  />
                  <CircularProgress
                    variant='determinate'
                    value={50}
                    sx={{
                      color: 'primary.main',
                      filter: 'drop-shadow(0 0 3px rgba(0, 0, 0, 0.3))',
                      position: 'absolute',
                      left: 0,
                      '& .MuiCircularProgress-circle': {
                        strokeLinecap: 'round',
                      },
                    }}
                    size={120}
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
                    variant='subtitle2'
                    sx={{ color: 'primary.main' }}
                  >
                    17,954 ft
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default TeamProgress
