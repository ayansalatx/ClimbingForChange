import HikingIcon from '@mui/icons-material/Hiking'
import {
  alpha,
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { useEffect, useState } from 'react'

import theme from '../../../../styles/theme'
import EventSelector from '../../shared/EventSelector'
import ProgressSearch from '../../shared/ProgressSearch'
import FullscreenToggleButton from './FullscreenToggleButton'
import TableDataRows from './TableDataRows'
import TableHeaderRow from './TableHeaderRow'
import { runSimulatedPassings } from '../../../../services/leaderboardService'

const ProgressTable = ({
  columns,
  teams = [],
  activeEvents,
  pastEvents,
  selectedEvent,
  setSelectedEvent,
  searchString,
  setSearchString,
  teamsLength,
  loading,
}) => {
  // Get media queries to render appropriate content
  const isSmall = useMediaQuery(theme.breakpoints.down('md'))

  // State for current page number
  const [page, setPage] = useState(0)
  useEffect(() => {
    setPage(0)
  }, [isSmall])
  // State for number of rows per page
  const defaultRowsPerPage
    = teamsLength > 100 ? 100 : teamsLength > 25 ? 25 : 10

  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage)

  // Handle page change via pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  // Handle changing how many rows to show per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0) // reset to first page
  }

  // Show all rows at once on small screen
  const displayedRowsPerPage = isSmall ? teams.length : rowsPerPage

  // Hide the rows per page selector on small screen
  const rowsPerPageOptions = isSmall ? [] : [10, 25, 100]

  const handleSimulatePassings = async () => {
    console.log('Simulate Passings for event:', selectedEvent)
    const passings = await runSimulatedPassings(selectedEvent)
    console.log('Passings:', passings)
  }

  return (
    <Paper
      elevation={3}
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        background: 'transparent',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          rowGap: 2,
          justifyContent: 'space-between',
          background: `linear-gradient(to right, ${alpha(theme.palette.primary.main, 0.8)}, ${alpha(theme.palette.primary.main, 0.3)}, ${alpha(theme.palette.primary.main, 0.8)})`,
          padding: 2,
        }}
      >
        <EventSelector
          activeEvents={activeEvents}
          pastEvents={pastEvents}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
        />
        <ProgressSearch
          searchString={searchString}
          onChange={setSearchString}
          teamNames={[...new Set(teams.map((team) => team.name))]}
        />
      </Box>
      <TableContainer
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          height: '100%',
          overflowX: 'hidden',
          scrollbarWidth: 'thin',
          backgroundColor: alpha(theme.palette.background.paper, 0.2),
          scrollbarColor: `${alpha(theme.palette.background.paper, 0.7)} ${alpha(theme.palette.primary.main, 0.3)}`,
        }}
      >
        {loading
          ? (
            <Table stickyHeader sx={{ height: '100%' }}>
              <TableHeaderRow columns={columns} />
              <TableBody
                sx={{
                  height: '100%',
                  background: `linear-gradient(to right, ${alpha(theme.palette.background.paper, 0.6)}, ${alpha(theme.palette.background.paper, 0.2)}, ${alpha(theme.palette.background.paper, 0.6)})`,
                }}
              >
                <TableRow>
                  <TableCell
                    colSpan={columns.length + 1}
                    align="center"
                    sx={{ border: 'none' }}
                  >
                    <CircularProgress color="primary" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )
          : teamsLength > 0
            ? (
              <Table
                stickyHeader
                aria-label="team/participant progress table"
                sx={{
                  '& td, & th': {
                    border: 'none',
                  },
                }}
              >
                <TableHeaderRow columns={columns} />
                <TableDataRows
                  eventId={selectedEvent}
                  columns={columns}
                  teams={teams}
                  page={page}
                  rowsPerPage={displayedRowsPerPage}
                />
              </Table>
            )
            : (
              <Table stickyHeader sx={{ height: '100%' }}>
                <TableHeaderRow columns={columns} />
                <TableBody
                  sx={{
                    height: '100%',
                    background: `linear-gradient(to right, ${alpha(theme.palette.background.paper, 0.6)}, ${alpha(theme.palette.background.paper, 0.2)}, ${alpha(theme.palette.background.paper, 0.6)})`,
                  }}
                >
                  <TableRow>
                    <TableCell
                      colSpan={columns.length + 1}
                      align="center"
                      sx={{ border: 'none' }}
                    >
                      <HikingIcon
                        sx={{
                          fontSize: '6rem',
                          color: 'secondary.main',
                        }}
                      />
                      <Typography fontSize="2rem" color="background.paper">
                        No teams climbing yet...
                      </Typography>
                      <Typography
                        fontSize="1.4rem"
                        lineHeight="1.5rem"
                        color="background.paper"
                      >
                        Check back later!
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            )}
      </TableContainer>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: `linear-gradient(to right, ${alpha(theme.palette.primary.main, 0.8)}, ${alpha(theme.palette.primary.main, 0.3)}, ${alpha(theme.palette.primary.main, 0.8)})`,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FullscreenToggleButton eventId={selectedEvent} />
          <Button variant="contained" color="primary" onClick={handleSimulatePassings} disabled={!selectedEvent}>Simulate Passings</Button>
        </Box>

        {/* Only show pagination controls on non-small screens */}
        {!isSmall && (
          <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={teams.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              'minHeight': {
                sm: '2.5rem',
                md: '2.75rem',
                lg: '3rem',
                xl: '3.25rem',
              },
              'background': 'transparent',
              'color': 'background.paper',
              '& .MuiSvgIcon-root': {
                fontSize: {
                  sm: '1rem',
                  md: '1.1rem',
                  lg: '1.2rem',
                  xl: '1.25rem',
                },
                color: 'background.paper',
              },
              '& .MuiTablePagination-toolbar': {
                minHeight: 'inherit',
                paddingLeft: '0.5rem',
                paddingRight: '0.5rem',
              },
              '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows':
                {
                  fontSize: {
                    sm: '0.75rem',
                    md: '0.85rem',
                    lg: '1rem',
                    xl: '1.2rem',
                  },
                  lineHeight: {
                    sm: 1.2,
                    md: 1.3,
                    lg: 1.4,
                    xl: 1.5,
                  },
                  color: 'background.paper',
                },
              '& .MuiTablePagination-select': {
                fontSize: {
                  sm: '0.75rem',
                  md: '0.85rem',
                  lg: '1rem',
                  xl: '1.2rem',
                },
                lineHeight: {
                  sm: 1.2,
                  md: 1.3,
                  lg: 1.4,
                  xl: 1.5,
                },
                color: 'background.paper',
              },
            }}
          />
        )}
      </Box>
    </Paper>
  )
}

export default ProgressTable
