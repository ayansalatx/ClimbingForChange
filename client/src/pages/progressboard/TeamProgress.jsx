import TimeIcon from '@mui/icons-material/AccessTimeFilled'
import TerrainIcon from '@mui/icons-material/Terrain'
import { alpha, Box, CircularProgress, useMediaQuery } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import C4CHorizontalGreenLogo from '../../assets/C4C-branding/Climbing-For-Change-Full-Horizontal_Green.png'
import C4CHorizontalBlueLogo from '../../assets/C4C-branding/Climbing-For-Change-Horizontal_Green.png'
import WarningDialog from '../../components/admin/modals/WarningDialog'
import InfoCard from '../../components/progressboard/cards/InfoCard'
import ParticipantCard from '../../components/progressboard/cards/ParticipantCard'
import ProgressIndicator from '../../components/progressboard/cards/ProgressIndicator'
import TeamHeader from '../../components/progressboard/cards/TeamHeader'
import LapsViewButton from '../../components/progressboard/shared/LapsViewButton'
import ExitButton from '../../components/progressboard/tables/laps/ExitButton'
import LapTable from '../../components/progressboard/tables/laps/LapTable'
import { getLeaderboardTeam } from '../../services/leaderboardService'
import theme from '../../styles/theme'

const columns = [
  { id: 'lapNumber', label: 'Lap', width: '5%', align: 'center' },
  { id: 'startDateTime', label: 'Start', width: '35%', align: 'center' },
  { id: 'endDateTime', label: 'Finish', width: '35%', align: 'center' },
  { id: 'duration', label: 'Time', width: '15%', align: 'center' },
  { id: 'completed', label: 'Done', width: '10%', align: 'center' },
]

const TeamProgress = () => {
  const navigate = useNavigate()
  const isSmall = useMediaQuery(theme.breakpoints.down('md'))
  const isXSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const isXXSmall = useMediaQuery(theme.breakpoints.down('xs'))

  const [team, setTeam] = useState()
  const [warningOpen, setWarningOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const { teamId } = useParams()

  const showWarning = () => {
    setWarningOpen(true)
  }

  // Load Team data from server
  useEffect(() => {
    async function loadData() {
      try {
        const teamForDisplay = await getLeaderboardTeam(teamId)
        setTeam(teamForDisplay)
      }
      catch {
        showWarning()
      }
      finally {
        setLoading(false)
      }
    }

    loadData()
  }, [teamId])

  const lgTeamStats = [
    { label: 'Mountain:', value: team?.mountainName },
    {
      label: 'Elevation:',
      value: `${team?.totalElevation} ${team?.elevationUnit}`,
    },
    { label: 'Total Laps:', value: team?.lapsRequired },
    { label: 'Lap Elevation:', value: `${team?.hillLap} ${team?.hillLapUnit}` },
    { label: 'Best Lap Time:', value: team?.bestLap },
    { label: 'Time Elapsed:', value: team?.timeElapsed },
  ]

  const smTeamStats = [
    { label: 'Mount:', value: team?.mountainName },
    {
      label: 'Elev:',
      value: `${team?.totalElevation} ${team?.elevationUnit}`,
    },
    { label: 'Total Laps:', value: team?.totalLaps },
    { label: 'Lap Elev:', value: `${team?.hillLap} ${team?.hillLapUnit}` },
    { label: 'Best Lap:', value: team?.bestLap },
    { label: 'Time:', value: team?.timeElapsed },
  ]

  const xSmTeamStats = [
    {
      icon: <TerrainIcon sx={{ color: 'primary.main' }} />,
      value: team?.mountainName,
    },
    {
      icon: <TerrainIcon sx={{ color: 'primary.main' }} />,
      value: `${team?.totalElevation} ${team?.elevationUnit}`,
    },
    {
      label: 'Laps:',
      icon: <TerrainIcon sx={{ color: 'primary.main' }} />,
      value: team?.totalLaps,
    },
    {
      label: 'Lap:',
      icon: <TerrainIcon sx={{ color: 'primary.main' }} />,
      value: `${team?.hillLap} ${team?.hillLapUnit}`,
    },
    { label: 'Best Lap:', value: team?.bestLap },
    {
      icon: <TimeIcon sx={{ color: 'primary.main' }} />,
      value: team?.timeElapsed,
    },
  ]

  // Calc size to determine stat labels
  let teamStats
  if (isXXSmall) {
    teamStats = xSmTeamStats
  }
  else if (isXSmall) {
    teamStats = smTeamStats
  }
  else {
    teamStats = lgTeamStats
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
            <Box sx={{ mb: { xxs: 0.5 } }}>
              <Box
                component="img"
                src={isXSmall ? C4CHorizontalBlueLogo : C4CHorizontalGreenLogo}
                alt="Climbing for Change Logo"
                sx={{
                  maxWidth: {
                    xxs: '11rem',
                    xs: '12rem',
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

            {isXSmall && (
              <Box
                sx={{
                  display: 'flex',
                  flexGrow: 1,
                  justifyContent: 'right',
                  alignItems: 'flex-end',
                  height: '100%',
                  mt: {
                    xxs: 0,
                    xs: 0,
                    sm: 0,
                    md: 0,
                  },
                }}
              >
                <ExitButton color={'background.paper'} />
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

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xxs: 'column', md: 'row' },
                  height: '100%',
                  flexGrow: 1,
                  gap: { xxs: 1.25, xs: 2 },
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
                      gap: { xxs: 1.25, xs: 2 },
                    }}
                  >
                    {/* Participants */}
                    <Box
                      sx={{
                        borderRadius: '4px',
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        overflowY: 'hidden',
                        backgroundColor: alpha(
                          theme.palette.background.paper,
                          0.75
                        ),
                        boxShadow: '0px 3px 0 rgba(0, 0, 0, 0.3)',
                        p: { xxs: 0.5, xs: 1, sm: 0.5, md: 0.1, lg: 1 },
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          width: '100%',
                          p: { xxs: 0.55, sm: 1 },
                          gap: { xxs: 1, xs: 1.5, sm: 1.5, md: 1.1, lg: 2 },
                          overflowY: 'auto',
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
                        p: { xxs: 1, xs: 1.5, md: 1.1, lg: 2 },
                        gap: { xxs: 1, xs: 1.5, md: 1.1, lg: 2 },
                        overflowY: 'auto',
                      }}
                    >
                      {/* Row 1 */}
                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          width: '100%',
                          gap: { xxs: 1, xs: 1.5, md: 1.1, lg: 2 },
                        }}
                      >
                        <InfoCard
                          label={teamStats[0].label}
                          value={teamStats[0].value}
                          icon={teamStats[0].icon}
                        />
                        <InfoCard
                          label={teamStats[1].label}
                          value={teamStats[1].value}
                          icon={teamStats[1].icon}
                        />
                      </Box>

                      {/* Row 2 */}
                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          width: '100%',
                          gap: { xxs: 1, xs: 1.5, md: 1.1, lg: 2 },
                        }}
                      >
                        <InfoCard
                          label={teamStats[2].label}
                          value={teamStats[2].value}
                          icon={teamStats[2].icon}
                        />
                        <InfoCard
                          label={teamStats[3].label}
                          value={teamStats[3].value}
                          icon={teamStats[3].icon}
                        />
                      </Box>

                      {/* Row 3 */}
                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          width: '100%',
                          gap: { xxs: 1, xs: 1.5, md: 1.1, lg: 2 },
                        }}
                      >
                        <InfoCard
                          label={teamStats[4].label}
                          value={teamStats[4].value}
                          icon={teamStats[4].icon}
                        />
                        <InfoCard
                          label={teamStats[5].label}
                          value={teamStats[5].value}
                          icon={teamStats[5].icon}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { md: 'column' },
                    flexGrow: 1,
                    maxWidth: { md: '19%', lg: '18%' },
                    maxHeight: { xxs: '27%', xs: '30%', md: 'none' },
                    minHeight: { xxs: '20%', md: 'none' },
                    gap: { xxs: 1.25, xs: 2 },
                    borderRadius: '4px',
                  }}
                >
                  {/* Laps Progress Indicator */}
                  <ProgressIndicator
                    progress={team?.lapProgress}
                    label={`${team?.lapsCompleted} Laps`}
                    color={'secondary.main'}
                    shadow={'drop-shadow(0 0 4px rgba(48, 51, 31, 0.3))'}
                  />

                  {/* Elevation Progress Indicator */}
                  <ProgressIndicator
                    progress={team?.elevationProgress}
                    label={`${team?.currentElevation} ${team?.elevationUnit}`}
                    color={'info.main'}
                    shadow={'drop-shadow(0 0 4px rgba(31, 47, 51, 0.3))'}
                  />
                </Box>

                {/* Laps Table */}
                {!isSmall ? (
                  <Box
                    sx={{
                      display: 'flex',
                      flex: 1,
                      height: '100%',
                      minWidth: '40%',
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
                      <LapTable tableColumns={columns} laps={team?.laps} />
                    </Box>
                  </Box>
                ) : (
                  <LapsViewButton
                    label={'View Team\'s Laps Table'}
                    onClick={() => {
                      if (teamId) {
                        navigate(`/progress/team/${team.id}/laps`)
                      }
                    }}
                  />
                )}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      <WarningDialog
        open={warningOpen}
        title={'Data Loading Error'}
        message={'Data for event is not loading.'}
        onCancel={() => setWarningOpen(false)}
      />
    </Box>
  )
}

export default TeamProgress
