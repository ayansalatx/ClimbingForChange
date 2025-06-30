import {
  FormControl,
  MenuItem,
  Select,
} from '@mui/material'

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
          '&:before, &:after': {
            borderBottom: 'none !important',
          },
          '& .MuiSelect-select': {
            paddingTop: '4px',
            paddingBottom: '4px',
            paddingLeft: '8px',
            paddingRight: '8px',
          },
        }}
      >
        <MenuItem value='' disabled>
          Select an Event
        </MenuItem>
        {events.map((event) => (
          <MenuItem value={event.id} key={event.id}>
            {event.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default EventSelector
