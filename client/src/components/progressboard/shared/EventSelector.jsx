import {
  alpha,
  FormControl,
  MenuItem,
  Select,
  ListSubheader,
} from '@mui/material'

import theme from '../../../styles/theme'

const EventSelector = ({
  activeEvents = [],
  pastEvents = [],
  selectedEvent,
  setSelectedEvent,
}) => {
  return (
    <FormControl
      sx={{
        width: {
          xxs: '100%',
          xs: '100%',
          sm: '100%',
          md: '45%',
          lg: '40%',
          xl: '35%',
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
        inputProps={{
          paper: { minHeight: { xxs: 'unset', xs: 'unset' } },
          sx: { borderRadius: '3px !important' },
        }}
        sx={{
          textAlign: 'left',
          backgroundColor: {
            xxs: 'gray.light',
            sm: alpha(theme.palette.background.paper, 0.4),
          },
          borderRadius: '3px',
          color: 'primary.light',
          '&:before, &:after': {
            borderBottom: 'none !important',
          },
          '&.Mui-focused': {
            backgroundColor: {
              xxs: 'background.paper',
              sm: alpha(theme.palette.background.paper, 0.4),
            },
          },
          '& .MuiSelect-filled.MuiSelect-select': {
            fontSize: {
              xxs: '1rem',
              xs: '1rem',
              sm: '1rem',
              md: '1.1rem',
            },
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
              xxs: '6px',
              md: '8px',
              lg: '8px',
              sxl: '8px',
            },
            opacity: '100%',
            fontSize: {
              xxs: '0.9rem',
              xs: '0.9rem',
              sm: '0.9rem',
              md: '1.1rem',
              xl: '1.15rem',
            },
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '.01rem',
          },
          '& .MuiSelect-select:hover': {
            backgroundColor: {
              xxs: 'info.main',
              sm: alpha(theme.palette.info.main, 0.5),
            },
          },
          '& .MuiSelect-select:focus': {
            backgroundColor: {
              xxs: 'gray.light',
              sm: alpha(theme.palette.background.paper, 0.4),
            },
          },
          '.MuiSvgIcon-root': {
            color: 'primary.light',
          },
        }}
      >
        <MenuItem
          value=""
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
            textTransform: 'uppercase',
            fontWeight: 'bold',
            letterSpacing: '0.01rem',
          }}
        >
          Select an Event
        </MenuItem>

        {activeEvents.length > 0 && [
          ...activeEvents.map((event) => (
            <MenuItem
              key={event.id}
              value={event.id}
              sx={{
                mx: 0.75,
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
                '&.Mui-selected:hover': {
                  backgroundColor: alpha(theme.palette.secondary.main, 0.7),
                },
                ...(selectedEvent !== event.id && {
                  '&:focus': {
                    borderRadius: '3px',
                    backgroundColor: alpha(theme.palette.secondary.main, 0.7),
                  },
                }),
              }}
            >
              {event.name}
            </MenuItem>
          )),
        ]}

        {pastEvents.length > 0 && [
          <MenuItem
            value=""
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
              textTransform: 'uppercase',
              fontWeight: 'bold',
              letterSpacing: '0.01rem',
            }}
          >
            Past Events
          </MenuItem>,
          ...pastEvents.map((event) => (
            <MenuItem
              key={event.id}
              value={event.id}
              sx={{
                mx: 0.75,
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
          )),
        ]}
      </Select>
    </FormControl>
  )
}

export default EventSelector
