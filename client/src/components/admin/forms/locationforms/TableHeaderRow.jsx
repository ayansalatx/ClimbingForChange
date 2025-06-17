import { TableCell,TableHead, TableRow } from '@mui/material'
import React from 'react'

const TableHeaderRow = ({ columns }) => {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align || 'left'}
            style={{ minWidth: column.minWidth, fontWeight: 'bold'}}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default TableHeaderRow
