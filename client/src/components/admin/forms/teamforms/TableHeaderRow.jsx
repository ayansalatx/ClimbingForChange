import { TableCell, TableHead, TableRow } from '@mui/material'

const TableHeaderRow = ({ columns }) => {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align || 'left'}
            style={{ minWidth: column.minWidth }}
          >
            {column.label}
          </TableCell>
        ))}
        <TableCell align='right' style={{ minWidth: 100 }}>
          Actions
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

export default TableHeaderRow
