import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import React from 'react'

import TableDataRows from './TableDataRows'
import TableHeaderRow from './TableHeaderRow'

const fullColumns = [
  { id: 'locationName', label: 'Location', minWidth: 270 },
  { id: 'address', label: 'Address', minWidth: 85 },
  { id: 'city', label: 'City', minWidth: 85 },
  { id: 'province', label: 'Province', minWidth: 85 },
  { id: 'country', label: 'Country', minWidth: 85 },
  { id: 'lap', label: 'Laps', minWidth: 85 },
]

const LocationTable = ({ searchTerm, location }) => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const filteredRows = location.filter((row) =>
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

export default LocationTable
