import { Delete, Edit } from '@mui/icons-material'
import { TableBody, TableCell, TableRow } from '@mui/material'

const getNestedValue = (obj, path) => 
  path.split('.').reduce((acc, part) => acc?.[part], obj);

const TableDataRows = ({ rows, columns, page, rowsPerPage }) => {
  return (
    <TableBody>
      {rows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row) => {
          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
              {columns.map((column) => {
                const value = getNestedValue(row, column.id);
                return (
                  <TableCell key={column.id} align={column.align}>
                    {column.format && typeof value === 'number'
                      ? column.format(value)
                      : value || (column.id === 'teamId.name' ? 'Solo' : '—')}
                  </TableCell>
                );
              })}

              <TableCell key={row.id} align={'right'}>
                <Edit/>
                <Delete/>
              </TableCell>
            </TableRow>
          )
        })}
    </TableBody>
  )
}

export default TableDataRows
