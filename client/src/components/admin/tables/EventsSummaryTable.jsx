import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

const EventSummaryTable = ({ events = [] }) => {
  return (
    <TableContainer component={Paper} sx={{ ml: 2 }}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="center">Days To Go</TableCell>
            <TableCell align="center">Start Date</TableCell>
            <TableCell align="center">Start Time</TableCell>
            <TableCell align="center">Teams</TableCell>
            <TableCell align="center">Participants</TableCell>
            <TableCell align="center">Live</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => {
            const event = events[index] || null

            return (
              <TableRow hover={!!event} key={event?.id || `empty-${index}`}>
                <TableCell
                  align="left"
                  sx={{ color: event ? 'primary.main' : 'background.paper' }}
                >
                  {event?.name || '-'}
                </TableCell>
                <TableCell align="center">{event?.daysToGo ?? '-'}</TableCell>
                <TableCell align="center">{event?.startDate || '-'}</TableCell>
                <TableCell align="center">{event?.startTime || '-'}</TableCell>
                <TableCell align="center">
                  {event?.eventsCount ?? '-'}
                </TableCell>
                <TableCell align="center">
                  {event?.participantCount ?? '-'}
                </TableCell>
                <TableCell align="center">
                  {event ? (event.isLive ? 'Yes' : '') : '-'}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default EventSummaryTable
