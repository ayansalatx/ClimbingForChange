import { Delete, Edit } from '@mui/icons-material'
import { TableBody, TableCell, TableRow } from '@mui/material'

const TableDataRows = ({ rows, columns, page, rowsPerPage }) => {
  return (
    <TableBody>
      {rows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row) => (
          <TableRow hover role="checkbox" tabIndex={-1} key={row.id || row.code}>
            {columns.map((column) => {
              const value = row[column.id]
              return (
                <TableCell key={column.id} align={column.align}>
                  {column.format && typeof value === 'number'
                    ? column.format(value)
                    : value}
                </TableCell>
              )
            })}
            <TableCell align="right">
              <Edit />
              <Delete />
            </TableCell>
          </TableRow>
        ))}
    </TableBody>
  )
}

export default TableDataRows
