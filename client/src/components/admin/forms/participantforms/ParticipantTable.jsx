import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import React from 'react'

import TableDataRows from './TableDataRows'
import TableHeaderRow from './TableHeaderRow'

const fullColumns = [
  { id: 'firstName', label: 'First Name', minWidth: 85 },
  { id: 'lastName', label: 'Last Name', minWidth: 85 },
  { id: 'teamId.name', label: 'Team Name', minWidth: 85 },
]

const ParticipantTable = ({ searchTerm, participant }) => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const filteredRows = participant.filter((row) =>
    Object.values(row)
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  )

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 500, width: 1200}}>
        <Table stickyHeader aria-label="sticky table" sx={{}}>
          <TableHeaderRow columns={fullColumns} />
          <TableDataRows
            rows={filteredRows}
            columns={fullColumns}
            page={page}
            rowsPerPage={rowsPerPage}
          />
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default ParticipantTable
