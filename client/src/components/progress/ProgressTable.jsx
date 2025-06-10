import {
  Box,
  Paper,
  Table,
  TableContainer,
  TablePagination,
} from '@mui/material'
import React, { useEffect, useState } from 'react'

import { fetchParticipants } from '../../services/progressService'
import FullscreenToggleButton from './FullscreenToggleButton'
import TableDataRows from './TableDataRows'
import TableHeaderRow from './TableHeaderRow'

const ProgressTable = ({ rows, columns }) => {
  // State for current page number
  const [page, setPage] = useState(0)
  // State for participants
  const [participants, setParticipants] = useState([])
  // State for number of rows per page
  const [rowsPerPage, setRowsPerPage] = useState(
    rows.length > 100 ? 100 : rows.length > 25 ? 25 : 15
  )

  // Load Participant data from server
  useEffect(() => {
    async function loadParticipants() {
      try {
        const res = await fetchParticipants()

        const groupedParticipants = res.data.reduce((teams, participant) => {
          const { firstName, lastName, teamName } = participant

          const fullName = firstName + ' ' + lastName

          // Group by fullName if not part of a team
          const teamKey = teamName?.trim() ? teamName.trim() : fullName
          if (!teams[teamKey]) {
            teams[teamKey] = []
          }

          teams[teamKey].push({ fullName })

          return teams
        }, {})

        setParticipants(groupedParticipants)
      } catch (e) {
        console.log('Failed to load participant data', e)
      }
    }
    loadParticipants()
  }, [])

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
            rows={rows}
            participants={participants}
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
          count={rows.length}
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
