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
import LapTable from '../../components/progressboard/tables/laps/LapTable'
import { getTeamForDisplay } from '../../services/teamService'
import theme from '../../styles/theme'
import ParticipantCard from '../../components/progressboard/cards/ParticipantCard'
import InfoCard from '../../components/progressboard/cards/InfoCard'
import TeamHeader from '../../components/progressboard/cards/TeamHeader'

const columns = [
  { id: 'lapNumber', label: 'Lap', width: '5%', align: 'center' },
  { id: 'startDateTime', label: 'Start', width: '35%', align: 'center' },
  { id: 'endDateTime', label: 'Finish', width: '35%', align: 'center' },
  { id: 'duration', label: 'Time', width: '15%', align: 'center' },
  { id: 'completed', label: 'Done', width: '10%', align: 'center' },
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
        setTeam(teamForDisplay)
      } catch (e) {
        console.log('Failed to load progress data', e)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [teamId])

  const teamStats = [
    { label: 'Mountain:', value: team?.mountainName },
    {
      label: 'Elevation:',
      value: `${team?.totalElevation} ${team?.elevationUnit}`,
    },
    { label: 'Total Laps:', value: team?.totalLaps },
    { label: 'Lap Elevation:', value: `${team?.hillLap} ${team?.hillLapUnit}` },
    { label: 'Best Lap Time:', value: team?.bestLap },
    { label: 'Time Elapsed:', value: team?.timeElapsed },
  ]

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
                flexDirection: 'column',
                height: '100%',
                flexGrow: 1,
                backgroundColor: alpha(theme.palette.primary.main, 0.75),
                borderRadius: '4px',
                p: 2,
                gap: 2,
                minHeight: 0,
              }}
            >
              {/* Team Header */}
              <TeamHeader teamName={team?.name}/>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  height: '100%',
                  flexGrow: 1,
                  gap: 2,
                  minHeight: 0,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    height: '100%',
                    flex: 1,
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
                        backgroundColor: alpha(
                          theme.palette.background.paper,
                          0.75
                        ),
                        boxShadow: '0px 3px 0 rgba(0, 0, 0, 0.3)',
                        p: 2,
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          width: '100%',
                          gap: 2,
                        }}
                      >
                        {team?.participants.map((participant, index) => (
                          <ParticipantCard
                            key={index}
                            participant={participant}
                          />
                        ))}
                      </Box>
                    </Box>

                    {/* Team Stats */}
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        borderRadius: '4px',
                        backgroundColor: alpha(
                          theme.palette.background.paper,
                          0.75
                        ),
                        boxShadow: '0px 3px 0 rgba(0, 0, 0, 0.3)',
                        p: 2,
                        gap: 2,
                      }}
                    >
                      {/* Row 1 */}
                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          width: '100%',
                          gap: 2,
                        }}
                      >
                        <InfoCard
                          label={teamStats[0].label}
                          value={teamStats[0].value}
                        />
                        <InfoCard
                          label={teamStats[1].label}
                          value={teamStats[1].value}
                        />
                      </Box>

                      {/* Row 2 */}
                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          width: '100%',
                          gap: 2,
                        }}
                      >
                        <InfoCard
                          label={teamStats[2].label}
                          value={teamStats[2].value}
                        />
                        <InfoCard
                          label={teamStats[3].label}
                          value={teamStats[3].value}
                        />
                      </Box>

                      {/* Row 3 */}
                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          width: '100%',
                          gap: 2,
                        }}
                      >
                        <InfoCard
                          label={teamStats[4].label}
                          value={teamStats[4].value}
                        />
                        <InfoCard
                          label={teamStats[5].label}
                          value={teamStats[5].value}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    maxWidth: '18%',
                    gap: 2,
                    borderRadius: '4px',
                  }}
                >
                  {/* Laps Progress Indicator */}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '4px',
                      backgroundColor: alpha(
                        theme.palette.background.paper,
                        0.5
                      ),
                      boxShadow: '0px 3px 0 rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '4px',
                        p: 2,
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          flex: 1,
                          position: 'relative',
                          aspectRatio: '1',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <CircularProgress
                          variant="determinate"
                          value={100}
                          thickness={5}
                          size={'100%'}
                          sx={{
                            width: '100%',
                            height: '100%',
                            color: alpha(theme.palette.primary.main, 0.75),
                            filter: 'drop-shadow(0 0 4px rgba(0, 0, 0, 0.3))',
                          }}
                        />
                        <CircularProgress
                          variant="determinate"
                          value={team?.elevationProgress}
                          thickness={5}
                          size={'100%'}
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            color: 'secondary.main',
                            filter:
                              'drop-shadow(0 0 4px rgba(48, 51, 31, 0.3))',
                            '& .MuiCircularProgress-circle': {
                              strokeLinecap: 'round',
                            },
                          }}
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 'bold',
                              fontSize: '1.5rem',
                              letterSpacing: '0.1rem',
                              color: 'primary.main',
                              textTransform: 'uppercase',
                            }}
                          >
                            {team?.currentElevation} {team?.elevationUnit}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  {/* Elevation Progress Indicator */}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '4px',
                      backgroundColor: alpha(
                        theme.palette.background.paper,
                        0.5
                      ),
                      boxShadow: '0px 3px 0 rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '4px',
                        p: 2,
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          flex: 1,
                          aspectRatio: '1',
                          position: 'relative',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <CircularProgress
                          variant="determinate"
                          value={100}
                          thickness={5}
                          size={'100%'}
                          sx={{
                            width: '100%',
                            height: '100%',
                            color: alpha(theme.palette.primary.main, 0.75),
                            filter: 'drop-shadow(0 0 4px rgba(0, 0, 0, 0.3))',
                          }}
                        />
                        <CircularProgress
                          variant="determinate"
                          value={team?.lapProgress}
                          thickness={5}
                          size={'100%'}
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            color: 'info.main',
                            filter:
                              'drop-shadow(0 0 4px rgba(27, 50, 53, 0.3))',
                            '& .MuiCircularProgress-circle': {
                              strokeLinecap: 'round',
                            },
                          }}
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 'bold',
                              fontSize: '1.5rem',
                              letterSpacing: '0.1rem',
                              color: 'primary.main',
                              textTransform: 'uppercase',
                            }}
                          >
                            {team?.lapsCompleted} Laps
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                {/* Laps Table */}
                <Box
                  sx={{
                    display: 'flex',
                    flex: 1,
                    height: '100%',
                    flexDirection: 'column',
                    borderRadius: '4px',
                    gap: 2,
                    overflowY: 'hidden',
                    minHeight: 0,
                    boxShadow: '0px 3px 0 rgba(0, 0, 0, 0.3)',
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
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default TeamProgress
