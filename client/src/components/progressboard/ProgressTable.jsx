import {
  Box,
  Paper,
  Table,
  TableContainer,
  TablePagination,
} from '@mui/material'
import { useState } from 'react'

import FullscreenToggleButton from './FullscreenToggleButton'
import EventSelector from './EventSelector'
import ProgressSearch from './ProgressSearch'
import TableDataRows from './TableDataRows'
import TableHeaderRow from './TableHeaderRow'

const ProgressTable = ({
  columns,
  teams = [],
  events,
  selectedEvent,
  setSelectedEvent,
  searchString,
  setSearchString,
}) => {
  // State for current page number
  const [page, setPage] = useState(0)
  // State for number of rows per page
  const defaultRowsPerPage =
    teams.length > 100 ? 100 : teams.length > 25 ? 25 : 15

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

  return (
    <Paper
      elevation={3}
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: 'primary.main',
          padding: '.5rem',
        }}
      >
        <ProgressSearch
          searchString={searchString}
          onChange={setSearchString}
          teamNames={[...new Set(teams.map((team) => team.name))]}
        />
        <EventSelector
          events={events}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
        />
      </Box>
      <TableContainer
        sx={{
          flexGrow: 1,
          overflowX: 'hidden',
        }}
      >
        <Table stickyHeader aria-label="team/participant progress table">
          <TableHeaderRow columns={columns} />
          <TableDataRows
            columns={columns}
            teams={teams}
            page={page}
            rowsPerPage={rowsPerPage}
          />
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <FullscreenToggleButton eventId={selectedEvent} />

        <TablePagination
          rowsPerPageOptions={[15, 25, 100]}
          component="div"
          count={teams.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Paper>
  )
}

export default ProgressTable
