import { alpha,FormControl, MenuItem, Select } from '@mui/material'

import theme from '../../styles/theme'

const EventSelector = ({ events = [], selectedEvent, setSelectedEvent }) => {
  return (
    <FormControl sx={{ width: '42%', borderRadius: '3px' }}>
      <Select
        variant='filled'
        id='event-select'
        value={selectedEvent ?? ''}
        onChange={(e) => setSelectedEvent(e.target.value)}
        displayEmpty
        required
        inputProps={{ sx: { borderRadius: '3px !important' } }}
        sx={{
          textAlign: 'left',
          background: alpha(theme.palette.background.paper, 0.25),
          color: 'primary.main',
          '&:before, &:after': {
            borderBottom: 'none !important',
          },
          '&:hover': {
            background: alpha(theme.palette.background.paper, 0.1),
          },
          '& .MuiSelect-select': {
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
        <MenuItem value='' disabled sx={{ py: 0, color: 'primary.light' }}>
          Select an Event
        </MenuItem>
        {events.map((event) => (
          <MenuItem
            value={event.id}
            key={event.id}
            sx={{
              py: 0.5,
              borderRadius: '3px',
              color: 'primary.main',
              '&:hover': {
                borderRadius: '3px',
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
