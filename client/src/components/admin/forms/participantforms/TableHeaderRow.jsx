import { TableCell, TableHead, TableRow } from '@mui/material'

const TableHeaderRow = ({ columns }) => {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align || 'left'}
            sx={{ minWidth: column.minWidth, fontWeight: 'bold' }}
          >
            {column.label}
          </TableCell>
        ))}
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  )
}

export default TableHeaderRow
