import { alpha, FormControl, MenuItem, Select } from '@mui/material'

import theme from '../../../styles/theme'

const EventSelector = ({ events = [], selectedEvent, setSelectedEvent }) => {
  return (
    <FormControl
      sx={{
        width: {
          xxs: '100%',
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
          background: alpha(theme.palette.background.paper, 0.4),
          borderRadius: '3px',
          color: 'primary.main',
          '&:before, &:after': {
            borderBottom: 'none !important',
          },
          '&.Mui-focused': {
            background: alpha(theme.palette.background.paper, 0.4),
          },
          '& .MuiSelect-select': {
            py: {
              xxs: '2px',
              xs: '2px',
              sm: '3px',
              md: '4px',
              lg: '4px',
              xl: '4px',
            },
            px: {
              xxs: '8px',
              xs: '8px',
              sm: '6px',
              md: '8px',
              lg: '8px',
              sxl: '8px',
            },
            opacity: '100%',
            fontSize: {
              xxs: '.85rem',
              xs: '.85rem',
              sm: '0.85rem',
              md: '0.9rem',
              lg: '1rem',
              xl: '1.05rem',
            },
          },
          '& .MuiSelect-select:hover': {
            background: alpha(theme.palette.info.main, 0.5),
          },
          '& .MuiSelect-select:focus': {
            background: alpha(theme.palette.background.paper, 0.4),
          },
        }}
      >
        <MenuItem
          value=""
          disabled
          sx={{
            fontSize: {
              xxs: '.85rem',
              xs: '.85rem',
              sm: '0.85rem',
              md: '0.9rem',
              lg: '1rem',
              xl: '1.05rem',
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
              py: { xxs: 0.35, xs: 0.35, sm: 0.35, md: 0.4, lg: 0.45, xl: 0.5 },
              borderRadius: '3px',
              color: 'primary.main',
              fontSize: {
                xxs: '0.8rem',
                xs: '0.8rem',
                sm: '0.9rem',
                md: '1rem',
              },
              '&:hover': {
                borderRadius: '3px',
                background: alpha(theme.palette.secondary.main, 0.7),
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
