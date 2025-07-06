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
  { id: 'name', label: 'Name', align: 'left', width: '25%' },
  { id: 'daysToGo', label: 'Days To Go', align: 'center', width: '11%' },
  { id: 'startDate', label: 'Start Date', align: 'center', width: '11%' },
  { id: 'startTime', label: 'Start Time', align: 'center', width: '10%' },
  { id: 'endDate', label: 'End Date', align: 'center', width: '11%' },
  { id: 'endTime', label: 'End Time', align: 'center', width: '10%' },
  { id: 'teamsCount', label: 'Teams', align: 'center', width: '7%' },
  { id: 'participantsCount', label: 'Climbers', align: 'center', width: '10%' },
  { id: 'isLive', label: 'Live', align: 'center', width: '5%' },
]

const smColumns = [
  { id: 'name', label: 'Name', align: 'left', width: '30%' },
  { id: 'daysToGo', label: 'Days To Go', align: 'center', width: '10%' },
  { id: 'startDate', label: 'Start Date', align: 'center', width: '15%' },
  { id: 'startTime', label: 'Start Time', align: 'center', width: '12%' },
  { id: 'teamsCount', label: 'Teams', align: 'center', width: '10%' },
  { id: 'participantsCount', label: 'Climbers', align: 'center', width: '13%' },
  { id: 'isLive', label: 'Live', align: 'center', width: '10%' },
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
          color="secondary.main"
          sx={{ pl: 1.5, letterSpacing: {xxs: '0.05rem', xl: '.1rem'}, fontSize: '1.75rem' }}
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
                  letterSpacing: {xxs: '.05rem', xl: '.1rem'},
                  fontSize: {xxs: '1rem', xl: '1.1rem'},
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

                  if (column.id === 'isLive') {
                    value = event ? (event.isLive ? 'LIVE' : '-') : '-'
                  }

                  return (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      sx={{
                        width: column.width,
                        fontSize: {xxs: '0.9rem', xl: '1rem'},
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
