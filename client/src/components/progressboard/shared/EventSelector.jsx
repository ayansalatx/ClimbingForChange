import { alpha, FormControl, MenuItem, Select } from '@mui/material'

import theme from '../../../styles/theme'

const EventSelector = ({ events = [], selectedEvent, setSelectedEvent }) => {
  return (
    <FormControl
      sx={{
        width: {
          xs: '100%',
          sm: '100%',
          md: '50%',
          lg: '42%',
          xl: '42%',
        },
        borderRadius: '3px',
      }}
    >
      <Select
        variant="filled"
        id="event-select"
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
            py: {
              xs: '2px',
              sm: '3px',
              md: '4px',
              lg: '4px',
              xl: '4px',
            },
            px: {
              xs: '6px',
              sm: '6px',
              md: '8px',
              lg: '8px',
              sxl: '8px',
            },
            background: alpha(theme.palette.background.paper, 0.25),
            opacity: '100%',
            fontSize: {
              xs: '.85rem',
              sm: '0.85rem',
              md: '0.9rem',
              lg: '1rem',
              xl: '1.05rem',
            },
          },
          '& .MuiSelect-select:hover': {
            background: alpha(theme.palette.background.paper, 0.1),
          },
        }}
      >
        <MenuItem
          value=""
          disabled
          sx={{
            fontSize: {
              xs: '0.8rem',
              sm: '0.9rem',
              md: '1rem',
            },
            py: 0,
            color: 'primary.light',
          }}
        >
          Select an Event
        </MenuItem>
        {events.map((event) => (
          <MenuItem
            value={event.id}
            key={event.id}
            sx={{
              py: { xs: 0.35, sm: 0.35, md: 0.4, lg: 0.45, xl: 0.5 },
              borderRadius: '3px',
              color: 'primary.main',
              fontSize: {
                xs: '0.8rem',
                sm: '0.9rem',
                md: '1rem',
              },
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
