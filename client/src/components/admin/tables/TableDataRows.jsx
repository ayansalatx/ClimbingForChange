import { Delete, Edit } from '@mui/icons-material'
import { TableBody, TableCell, TableRow } from '@mui/material'

const TableDataRows = ({ rows, columns, page, rowsPerPage }) => {
  return (
    <TableBody>
      {rows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
          return (
            <TableRow
              hover
              role="checkbox"
              tabIndex={-1}
              key={index}
              sx={{
                backgroundColor:
                  index % 2 === 0 ? 'background.paper' : 'background.default',
              }}
            >
              {columns.map((column, index) => {
                const value = row[column.id]
                return (
                  <TableCell
                    key={column.id}
                    align={index < 2 ? 'left' : 'center'}
                    sx={{ fontSize: '1rem' }}
                  >
                    {column.format && typeof value === 'number'
                      ? column.format(value)
                      : value}
                  </TableCell>
                )
              })}
              <TableCell key={row.id} align={'center'} sx={{minWidth: '5rem'}} >
                <Edit sx={{ color: 'var(--dark-blue)' }} fontSize="small" />
                <Delete color="error" fontSize="small" />
              </TableCell>
            </TableRow>
          )
        })}
    </TableBody>
  )
}

export default TableDataRows
