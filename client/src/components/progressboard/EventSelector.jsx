import { FormControl, MenuItem, Select, alpha } from '@mui/material'

import theme from '../../styles/theme'

const EventSelector = ({ events = [], selectedEvent, setSelectedEvent }) => {
  return (
    <FormControl sx={{ width: '42%'}}>
      <Select
        variant="filled"
        id="event-select"
        value={selectedEvent ?? ''}
        onChange={(e) => setSelectedEvent(e.target.value)}
        displayEmpty
        required
        sx={{
          textAlign: 'left',
          background: alpha(theme.palette.background.paper, 0.25),
          color: 'primary.main',
          borderRadius: '3px',
          '&:before, &:after': {
            borderBottom: 'none !important',
          },
          '&:hover': {
            background: alpha(theme.palette.background.paper, 0.1),
          },
          '& .MuiSelect-select': {
            borderRadius: '3px',
            py: '4px',
            px: '8px',
            background: alpha(theme.palette.background.paper, 0.25),
            opacity: '100%',
          },
          '& .MuiSelect-select:hover': {
            background: alpha(theme.palette.background.paper, 0.1),
          },
        }}
      >
        <MenuItem value="" disabled sx={{ py: 0, color: 'primary.light'}}>
          Select an Event
        </MenuItem>
        {events.map((event) => (
          <MenuItem
            value={event.id}
            key={event.id}
            sx={{
              py: .5,
              color: 'primary.main',
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.2),
              },

            }}
          >
            {event.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default EventSelector
