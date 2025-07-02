import { TableBody, TableCell, TableRow } from '@mui/material'

import RowActions from '../buttons/RowActions'

const TableDataRows = ({
  rows = [],
  columns = [],
  page,
  rowsPerPage,
  onEditClick,
  onDeleteClick,
}) => {
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
              key={row.id || index}
              sx={{
                backgroundColor:
                  index % 2 === 0 ? 'background.paper' : 'background.default',
              }}
            >
              {columns.map((column) => {
                const value = row[column.id]
                return (
                  <TableCell
                    key={column.id}
                     align={column.align || 'left'}
                      sx={{
                          fontSize: '1rem',
                          color:
                            row.hasOwnProperty('active')
                              ? row.active
                                ? 'primary.main'
                                : 'gray.main'
                              : 'text.primary',
                        }}
                  >
                    {column.format && typeof value === 'number'
                      ? column.format(value)
                      : value}
                  </TableCell>
                )
              })}
              <TableCell
                key={row.id}
                align={'center'}
                sx={{ py: 0, minWidth: '5rem' }}
              >
                <RowActions
                  row={row}
                  onEditClick={() => onEditClick(row)}
                  onDeleteClick={() => onDeleteClick(row)}
                  active={row.active}
                />
              </TableCell>
            </TableRow>
          )
        })}
    </TableBody>
  )
}

export default TableDataRows
