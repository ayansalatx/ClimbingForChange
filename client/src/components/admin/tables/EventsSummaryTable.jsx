import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from '@mui/material'

import AlarmIcon from '@mui/icons-material/Alarm'
import theme from '../../../styles/theme'

const lgColumns = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'daysToGo', label: 'Days To Go', align: 'center' },
  { id: 'startDate', label: 'Start Date', align: 'center' },
  { id: 'startTime', label: 'Start Time', align: 'center' },
  { id: 'endDate', label: 'End Date', align: 'center' },
  { id: 'endTime', label: 'End Time', align: 'center' },
  { id: 'teamsCount', label: 'Teams', align: 'center' },
  { id: 'participantsCount', label: 'Climbers', align: 'center' },
  { id: 'isLive', label: 'Live', align: 'center' },
]

const smColumns = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'daysToGo', label: 'Days To Go', align: 'center' },
  { id: 'startDate', label: 'Start Date', align: 'center' },
  { id: 'startTime', label: 'Start Time', align: 'center' },
  { id: 'teamsCount', label: 'Teams', align: 'center' },
  { id: 'participantsCount', label: 'Climbers', align: 'center' },
  { id: 'isLive', label: 'Live', align: 'center' },
]

const EventSummaryTable = ({ events = [] }) => {
  const isLg = useMediaQuery(theme.breakpoints.up('lg'))
  const totalRows = isLg ? 5 : 3
  const headerColumns = isLg ? lgColumns : smColumns
  return (
    <TableContainer component={Paper} sx={{ bgcolor: 'primary.main' }}>
      <Box
        sx={{ display: 'flex', alignItems: 'center', pt: '.5rem', pl: '1rem' }}
      >
        <AlarmIcon sx={{ color: 'secondary.main' }} />
        <Typography
          variant="h5"
          align="left"
          textTransform="uppercase"
          fontWeight="bold"
          letterSpacing="0.05rem"
          color="secondary.main"
          sx={{ pl: 1.5 }}
        >
          Upcoming Events
        </Typography>
      </Box>
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
          {Array.from({ length: totalRows }).map((_, index) => {
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
                {headerColumns.map((column) => {
                  let value = event?.[column.id] ?? '-'

                  // If this is the isLive column, transform the value
                  if (column.id === 'isLive') {
                    value = event ? (event.isLive ? 'LIVE' : '-') : '-'
                  }

                  return (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      sx={{
                        color: textColor,
                        textTransform:
                          column.id === 'isLive' ? 'uppercase' : undefined,
                        borderBottom: '1px solid',
                        borderColor: 'primary.dark',
                      }}
                    >
                      {value}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default EventSummaryTable
