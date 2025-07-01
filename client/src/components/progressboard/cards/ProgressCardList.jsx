import { Box } from '@mui/material'
import ProgressCard from './ProgressCard'
import ProgressSearch from '../shared/ProgressSearch'
import EventSelector from '../shared/EventSelector'

const ProgressList = ({
  teams,
  events,
  selectedEvent,
  setSelectedEvent,
  searchString,
  setSearchString,
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
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, pb: 1 }}>
        <EventSelector
          events={events}
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
          gap: 1,
        }}
      >
        {teams.map((team, index) => {
          return (
            <Box key={index} sx={{ flex: '1 1 300px' }}>
              <ProgressCard team={team} />
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default ProgressList
