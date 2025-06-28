import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

const headerColumns = [
  { label: 'Name', align: 'left' },
  { label: 'Days To Go', align: 'center' },
  { label: 'Start Date', align: 'center' },
  { label: 'Start Time', align: 'center' },
  { label: 'Teams', align: 'center' },
  { label: 'Climbers', align: 'center' },
  { label: 'Live', align: 'center' },
]

const EventSummaryTable = ({ events = [] }) => {
  return (
    <TableContainer component={Paper} sx={{ bgcolor: 'primary.dark' }}>
      <Table size="small" aria-label="current and upcoming events summary">
        <TableHead sx={{ backgroundColor: 'primary.main' }}>
          <TableRow>
            {headerColumns.map(({ label, align }) => (
              <TableCell
                key={label}
                align={align}
                sx={{
                  color: 'background.paper',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  letterSpacing: '.05rem',
                  fontSize: '1rem',
                }}
              >
                {label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => {
            const event = events[index] || null
            const isEven = index % 2 === 0
            const bgColor = isEven ? 'primary.light' : 'primary.main'
            const textColor = event?.isLive
              ? 'secondary.main'
              : 'background.paper'

            return (
              <TableRow
                key={event?.id || `empty-${index}`}
                sx={{
                  backgroundColor: bgColor,
                  color: textColor,
                  border: '1px solid',
                  borderColor: 'primary.dark',
                }}
              >
                <TableCell
                  align="left"
                  sx={{
                    color: textColor,
                    borderBottom: '1px solid',
                    borderColor: 'primary.dark',
                  }}
                >
                  {event?.name || '-'}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: textColor,
                    borderBottom: '1px solid',
                    borderColor: 'primary.dark',
                  }}
                >
                  {event?.daysToGo ?? '-'}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: textColor,
                    borderBottom: '1px solid',
                    borderColor: 'primary.dark',
                  }}
                >
                  {event?.startDate || '-'}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: textColor,
                    borderBottom: '1px solid',
                    borderColor: 'primary.dark',
                  }}
                >
                  {event?.startTime || '-'}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: textColor,
                    borderBottom: '1px solid',
                    borderColor: 'primary.dark',
                  }}
                >
                  {event?.eventsCount ?? '-'}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: textColor,
                    borderBottom: '1px solid',
                    borderColor: 'primary.dark',
                  }}
                >
                  {event?.participantCount ?? '-'}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: textColor,
                    textTransform: 'uppercase',
                    borderBottom: '1px solid',
                    borderColor: 'primary.dark',
                  }}
                >
                  {event ? (event.isLive ? 'Live' : '') : '-'}
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
