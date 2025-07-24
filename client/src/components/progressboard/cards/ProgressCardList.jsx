import HikingIcon from '@mui/icons-material/Hiking'
import { alpha, Box, CircularProgress, Typography } from '@mui/material'

import theme from '../../../styles/theme'
import EventSelector from '../shared/EventSelector'
import ProgressSearch from '../shared/ProgressSearch'
import ProgressCard from './ProgressCard'

const ProgressList = ({
  teams,
  activeEvents,
  pastEvents,
  selectedEvent,
  setSelectedEvent,
  searchString,
  setSearchString,
  teamsLength,
  loading,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        pt: 1,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          p: 1,
          backgroundColor: alpha(theme.palette.primary.main, 0.85),
          borderRadius: '4px',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, pb: 1 }}>
          <EventSelector
            activeEvents={activeEvents}
            pastEvents={pastEvents}
            selectedEvent={selectedEvent}
            setSelectedEvent={setSelectedEvent}
          />
          <ProgressSearch
            searchString={searchString}
            onChange={setSearchString}
            teamNames={[...new Set(teams.map((team) => team.name))]}
          />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyItems: 'flex-start',
            gap: 1,
          }}
        >
          {loading ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <CircularProgress color="secondary" />
            </Box>
          ) : teamsLength && !loading > 0 ? (
            teams.map((team, index) => (
              <Box key={index}>
                <ProgressCard team={team} />
              </Box>
            ))
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <HikingIcon
                sx={{
                  fontSize: '5rem',
                  color: 'secondary.main',
                }}
              />
              <Typography fontSize="1.5rem" color="background.paper">
                No teams climbing yet...
              </Typography>
              <Typography color="background.paper">
                Check back later!
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default ProgressList
