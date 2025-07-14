import { alpha, TableBody, TableCell, TableRow } from '@mui/material'

import theme from '../../../../styles/theme'

const LapDataRows = ({
  rows = [],
  columns = [],
  page,
  rowsPerPage,
}) => {
  return (
    <TableBody>
      {rows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
          return (
            <TableRow
              hover
              role='checkbox'
              tabIndex={-1}
              key={row.id || index}
              sx={{
                backgroundColor:
                  index % 2 === 0 ? 'background.paper' : 'background.default',
                '&:hover > *': {
                  backgroundColor: alpha(theme.palette.secondary.light, 0.9),
                },
              }}
            >
              {columns.map((column) => {
                const value = row[column.id] ?? ''

                return (
                  <TableCell
                    key={column.id}
                    align={column.align || 'left'}
                    sx={{
                      fontSize: { sm: '1rem', md: '1.1rem', xl: '1.2rem' },
                      color: row.active ? 'primary.main' : 'gray.main',
                    }}
                  >
                    {column.format && typeof value === 'number'
                      ? column.format(value)
                      : value}
                  </TableCell>
                )
              })}
            </TableRow>
          )
        })}
    </TableBody>
  )
}

export default LapDataRows