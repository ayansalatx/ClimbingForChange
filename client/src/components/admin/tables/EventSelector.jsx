import { alpha, FormControl, MenuItem, Select } from '@mui/material'

import theme from '../../../styles/theme'

const EventSelector = ({ events = [], selectedEvent, setSelectedEvent }) => {
  return (
    <FormControl fullWidth sx={{ m: 0 }} size='small'>
      <Select
        variant='filled'
        id='event-select'
        value={selectedEvent ?? ''}
        onChange={(e) => setSelectedEvent(e.target.value)}
        displayEmpty
        required
        sx={{
          textAlign: 'left',
          bgcolor: 'info.light',
          color: 'primary.light',
          fontSize: {
            xxs: '0.9rem',
            xs: '0.9rem',
            sm: '0.9rem',
            md: '1.1rem',
          },
          textTransform: 'uppercase',
          fontWeight: 'bold',
          letterSpacing: '.005rem',
          '&:before, &:after': {
            borderBottom: 'none !important',
          },
          '& .MuiSelect-select': {
            paddingTop: '4px',
            paddingBottom: '6px',
            paddingLeft: '8px',
            paddingRight: '8px',
          },
        }}
      >
        <MenuItem
          value=''
          disabled
          sx={{
            minHeight: { xxs: 'unset' },
            fontSize: {
              xxs: '0.9rem',
              xs: '0.9rem',
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
              borderRadius: '3px',
              minHeight: { xxs: 'unset', xs: 'unset', sm: 0 },
              color: 'primary.main',
              fontSize: {
                xxs: '0.9rem',
                xs: '0.9rem',
                sm: '0.9rem',
                md: '1rem',
              },
              '&:hover': {
                borderRadius: '3px',
                background: alpha(theme.palette.secondary.main, 0.7),
              },
              '&:focus': {
                borderRadius: '3px',
                backgroundColor: alpha(theme.palette.secondary.main, 0.7),
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
