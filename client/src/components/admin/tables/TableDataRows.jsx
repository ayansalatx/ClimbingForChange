import { alpha, Link, Switch, TableBody, TableCell, TableRow } from '@mui/material'
import theme from '../../../styles/theme'
import RowActions from '../buttons/RowActions'

const TableDataRows = ({
  rows = [],
  columns = [],
  page,
  rowsPerPage,
  activeOnChange,
  onEditClick,
  onDeleteClick,
  toggleDisabled,
}) => {
  const mountainsHref = '/admin/mountains'
  const hillsHref = '/admin/hills'
  const locationsHref = '/admin/locations'
  const teamsHref = '/admin/teams'
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
                '&:hover > *': {
                  backgroundColor: alpha(theme.palette.secondary.light, 0.9),
                },
              }}
            >
              {columns.map((column) => {
                if (column.id === 'activeStatus') {
                  return (
                    <TableCell key={column.id} align="center">
                      <Switch
                        checked={row.active}
                        onChange={() => activeOnChange(row)}
                        color="success"
                        size="small"
                        disabled={toggleDisabled?.(row)}
                      />
                    </TableCell>
                  )
                }

                if (column.id === 'locationName') {
                  return (
                    <TableCell
                      key={column.id}
                      align={column.align || 'left'}
                      sx={{
                        fontSize: '1rem',
                        color: row.active ? 'primary.main' : 'gray.main',
                      }}
                    >
                      <Link
                        href={locationsHref}
                        underline='hover'
                        color='inherit'
                        sx={{ fontSize: '1rem' }}
                      >
                        {value || 'N/A'}
                      </Link>
                    </TableCell>
                  )
                }

                if (column.id === 'mountain' || column.id === 'hill' || column.id === 'location' || column.id === 'teamName') {
                  let href = null
                  if (column.id === 'mountain') {
                    href = mountainsHref
                  } else if (column.id === 'hill') {
                    href = hillsHref
                  }
                  else if (column.id === 'location') {
                    href = locationsHref
                  } else if (column.id === 'teamName') {
                    href = teamsHref
                  }

                  return (
                    <TableCell
                      key={column.id}
                      align={column.align || 'left'}
                      sx={{
                        fontSize: { sm: '1rem', md: '1.1rem', xl: '1.2rem' },
                        color: row.active ? 'primary.main' : 'gray.main',
                      }}
                    >
                      <Link
                        href={href}
                        underline='hover'
                        color='inherit'
                        sx={{ fontSize: '1rem' }}
                      >
                        {value || 'N/A'}
                      </Link>
                    </TableCell>
                  )
                }

                const value = row[column.id] ?? ''
                return (
                  <TableCell
                    key={column.id}
                    align={column.align || 'left'}
                    sx={{
                      fontSize: '1rem',
                      color: row.active ? 'primary.main' : 'gray.main',
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
