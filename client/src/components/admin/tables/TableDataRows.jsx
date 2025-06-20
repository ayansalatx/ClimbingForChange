import { Delete, Edit } from '@mui/icons-material'
import { TableBody, TableCell, TableRow } from '@mui/material'

const TableDataRows = ({ rows, columns, page, rowsPerPage, onAddClick }) => {
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
                backgroundColor: index % 2 === 0 ? 'background.paper' : 'grey.100',
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
              <TableCell key={row.id} align={'center'}>
                <Edit sx={{ color: 'var(--lt-purple)' }} fontSize="small" />
                <Delete color="error" fontSize="small" />
              </TableCell>
            </TableRow>
          )
        })}
    </TableBody>
  )
}

export default TableDataRows
