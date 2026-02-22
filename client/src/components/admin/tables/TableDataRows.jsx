import { alpha, Link, TableBody, TableCell, TableRow } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import theme from '../../../styles/theme'
import DeactivateToggle from '../buttons/DeactivateToggle'
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
  const navigate = useNavigate()
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
                'backgroundColor': row.isHighlighted
                  ? alpha(theme.palette.warning.main, 0.3)
                  : index % 2 === 0 ? 'background.paper' : 'background.default',
                '&:hover > *': {
                  backgroundColor: alpha(theme.palette.secondary.light, 0.9),
                },
                ...(row.isHighlighted && {
                  '&': {
                    animation: 'pulse 2s ease-in-out infinite',
                  },
                  '@keyframes pulse': {
                    '0%': {
                      backgroundColor: alpha(theme.palette.warning.main, 0.3),
                    },
                    '50%': {
                      backgroundColor: alpha(theme.palette.warning.main, 0.5),
                    },
                    '100%': {
                      backgroundColor: alpha(theme.palette.warning.main, 0.3),
                    },
                  },
                }),
              }}
            >
              {columns.map((column) => {
                const value = row[column.id] ?? ''

                if (column.id === 'activeStatus') {
                  return (
                    <TableCell key={column.id} align={column.align || 'left'}>
                      <DeactivateToggle
                        checked={row.active}
                        onChange={() => activeOnChange(row)}
                        disabled={toggleDisabled?.(row)}
                      />
                    </TableCell>
                  )
                }
                if (column.id === 'locationName') {
                  const handleLocationClick = () => {
                    const locationId = row.location || row.locationId
                    if (locationId) {
                      navigate(`/admin/locations?location=${locationId}`)
                    }
                    else {
                      navigate('/admin/locations')
                    }
                  }
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
                        component="button"
                        onClick={handleLocationClick}
                        underline="hover"
                        color="inherit"
                        sx={{
                          fontSize: '1rem',
                          cursor: 'pointer',
                          border: 'none',
                          background: 'none',
                          padding: 0,
                          textAlign: 'inherit',
                        }}
                      >
                        {value || 'N/A'}
                      </Link>
                    </TableCell>
                  )
                }

                if (column.id === 'mountain' || column.id === 'hill' || column.id === 'location' || column.id === 'teamName') {
                  let href = null
                  let handleClick = null

                  if (column.id === 'mountain') {
                    // For mountain names, use programmatic navigation with mountain parameter
                    handleClick = () => {
                      const mountainId = row.mountainId || row.mountain?.id || row.mountain?._id
                      if (mountainId) {
                        navigate(`/admin/mountains?mountain=${mountainId}`)
                      }
                      else {
                        navigate('/admin/mountains')
                      }
                    }
                  }
                  else if (column.id === 'hill') {
                    // For hill names, use programmatic navigation with hill parameter
                    handleClick = () => {
                      const hillId = row.hillId || row.hill?.id || row.hill?._id
                      if (hillId) {
                        navigate(`/admin/hills?hill=${hillId}`)
                      }
                      else {
                        navigate('/admin/hills')
                      }
                    }
                  }
                  else if (column.id === 'location') {
                    // For location names, use programmatic navigation with location parameter
                    handleClick = () => {
                      const locationId = row.locationId || row.location?.id || row.location?._id
                      if (locationId) {
                        navigate(`/admin/locations?location=${locationId}`)
                      }
                      else {
                        navigate('/admin/locations')
                      }
                    }
                  }
                  else if (column.id === 'teamName') {
                    // For team names, use programmatic navigation with parameters
                    handleClick = () => {
                      const eventId = row.eventId
                      const teamId = row.team?.id || row.team?._id || row.teamId || row.id
                      navigate(`/admin/teams?event=${eventId}&team=${teamId}`)
                    }
                  }

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
                        {...(handleClick ? { component: 'button', onClick: handleClick } : { href })}
                        underline="hover"
                        color="inherit"
                        sx={{
                          fontSize: '1rem',
                          cursor: 'pointer',
                          border: 'none',
                          background: 'none',
                          padding: 0,
                          textAlign: 'inherit',
                        }}
                      >
                        {value || 'N/A'}
                      </Link>
                    </TableCell>
                  )
                }

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
                align="center"
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
