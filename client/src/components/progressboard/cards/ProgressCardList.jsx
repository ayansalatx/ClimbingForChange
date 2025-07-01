import { Box } from '@mui/material'
import ProgressCard from './ProgressCard'
import ProgressSearch from '../shared/ProgressSearch'
import EventSelector from '../shared/EventSelector'

const ProgressList = ({ teams, events, selectedEvent, setSelectedEvent, searchString, setSearchString }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box>
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
      {teams.map((team, index) => {
        return <ProgressCard key={index} team={team} />
      })}
    </Box>
  )
}

export default ProgressList
