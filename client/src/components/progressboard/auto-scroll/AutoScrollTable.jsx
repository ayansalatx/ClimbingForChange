import {
  Paper,
  Table,
  TableContainer,
  TablePagination,
} from '@mui/material'
import { useState } from 'react'

import ScrollingTableRow from './ScrollingTableRows'
import TableHeaderRow from './TableHeaderRow'

const AutoScrollTable = ({ teams, columns }) => {
  const [page, setPage] = useState(0)
  const rowsPerPage = 10

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  return (
    <Paper
      sx={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <TableHeaderRow columns={columns} />
      <TableContainer
        sx={{
          width: '100%',
          height: '100%',
          overflowY: 'hidden',
          background: 'transparent',
        }}
      >
        <Table aria-label="auto scrolling table" size="small">
          <ScrollingTableRow columns={columns} teams={teams} />
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={teams.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        sx={{ display: 'none' }}
      />
    </Paper>
  )
}

export default AutoScrollTable
