import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import React from 'react'

import TableDataRows from './TableDataRows'
import TableHeaderRow from './TableHeaderRow'

const formatDateTime = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString([], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

const fullColumns = [
  { id: 'name', label: 'Team Name', minWidth: 170 },
  { id: 'isSoloTeam', label: 'Solo Team?', minWidth: 100 },
  { id: 'lapsRequired', label: 'Laps Req.', minWidth: 100 },
  { id: 'totalDistanceRequired', label: 'Distance Req.', minWidth: 130 },
  { id: 'startDateTime', label: 'Start Time', minWidth: 170 },
]

const TeamsTable = ({ searchTerm = '', teams = [], onTeamDelete, onTeamEdit }) => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const formattedTeams = teams.map((team) => ({
    id: team.id,
    name: team.name,
    isSoloTeam: team.isSoloTeam ? 'Yes' : 'No',
    lapsRequired: team.lapsRequired,
    totalDistanceRequired: team.totalDistanceRequired,
    startDateTime: formatDateTime(team.startDateTime),
  }))

  const filteredRows = formattedTeams.filter((row) => {
    const name = row?.name || ''
    return name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ width: 1400 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHeaderRow columns={fullColumns} />
          <TableDataRows
            onDelete={onTeamDelete}
            onEdit={onTeamEdit}
            rows={filteredRows}
            columns={fullColumns}
            page={page}
            rowsPerPage={rowsPerPage}
          />
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default TeamsTable
