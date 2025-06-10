import { Paper, Table, TableContainer } from '@mui/material'
import React from 'react'

import TableDataRows from './TableDataRows'
import TableHeaderRow from './TableHeaderRow'

const AutoScrollTable = ({ rows, columns }) => {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ height: '65vh' }}>
        <Table stickyHeader aria-label="team/participant progress table">
          <TableHeaderRow columns={columns} />
          <TableDataRows columns={columns} rows={rows} />
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default AutoScrollTable
