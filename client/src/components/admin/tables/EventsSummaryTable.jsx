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
    <TableContainer component={Paper} sx={{ ml: 2, bgcolor: 'primary.dark' }}>
      <Table size="small" aria-label="current and upcoming events summary">
        <TableHead
          sx={{
            backgroundColor: 'primary.main',
          }}
        >
          <TableRow>
            <TableCell
              align="left"
              sx={{
                color: 'background.paper',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                letterSpacing: '.05rem',
                fontSize: '1rem',
              }}
            >
              Name
            </TableCell>
            <TableCell
              align="center"
              sx={{
                color: 'background.paper',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                letterSpacing: '.05rem',
                fontSize: '1rem',
              }}
            >
              Days To Go
            </TableCell>
            <TableCell
              align="center"
              sx={{
                color: 'background.paper',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                letterSpacing: '.05rem',
                fontSize: '1rem',
              }}
            >
              Start Date
            </TableCell>
            <TableCell
              align="center"
              sx={{
                color: 'background.paper',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                letterSpacing: '.05rem',
                fontSize: '1rem',
              }}
            >
              Start Time
            </TableCell>
            <TableCell
              align="center"
              sx={{
                color: 'background.paper',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                letterSpacing: '.05rem',
                fontSize: '1rem',
              }}
            >
              Teams
            </TableCell>
            <TableCell
              align="center"
              sx={{
                color: 'background.paper',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                letterSpacing: '.05rem',
                fontSize: '1rem',
              }}
            >
              Participants
            </TableCell>
            <TableCell
              align="center"
              sx={{
                color: 'background.paper',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                letterSpacing: '.05rem',
                fontSize: '1rem',
              }}
            >
              Live
            </TableCell>
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
