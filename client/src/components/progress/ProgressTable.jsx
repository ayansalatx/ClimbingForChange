import {
  Box,
  Paper,
  Table,
  TableContainer,
  TablePagination,
} from '@mui/material'
import React, { useState } from 'react'

import FullscreenToggleButton from './FullscreenToggleButton'
import TableDataRows from './TableDataRows'
import TableHeaderRow from './TableHeaderRow'

const ProgressTable = ({ columns, teams = [] }) => {
  // State for current page number
  const [page, setPage] = useState(0)
  // State for number of rows per page
  const defaultRowsPerPage =
    teams.length > 100 ? 100 : teams.length > 25 ? 25 : 15

  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage)

  // Handle page change via pagination controls
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
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
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
        <FullscreenToggleButton sx={{ ml: '.25rem' }} />

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
