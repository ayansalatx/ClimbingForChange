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
          const isEven = index % 2 === 0
          return (
            <TableRow
              hover
              role='checkbox'
              tabIndex={-1}
              key={row.id || index}
              sx={{
                backgroundColor: isEven ? alpha(theme.palette.background.paper, 0.2)
              : alpha(theme.palette.background.paper, 0.1),
                '&:hover > *': {
                  backgroundColor: alpha(theme.palette.secondary.light, 0.9),
                  color: 'primary.main'
                },
              }}
            >
              {columns.map((column) => {
                const value = row[column.id] ?? ''

                return (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    sx={{
                      whiteSpace: 'nowrap',
                      fontSize: { sm: '1rem', md: '1.1rem', xl: '1.1rem' },
                      color: 'background.paper',
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