import { alpha, MenuItem, Select, TableBody, TableCell, TableRow } from '@mui/material'

import theme from '../../../../styles/theme'

const TableDataRows = ({
  rows = [],
  columns = [],
  rfidTags = [],
  onRfidChange,
  usedRfidIds = [],
}) => {
  return (
    <TableBody>
      {rows.map((row, index) => (
        <TableRow
          hover
          role="checkbox"
          tabIndex={-1}
          key={row.id || index}
          sx={{
            backgroundColor: row.isEdited
              ? alpha(theme.palette.gray.main, 0.5)
              : index % 2 === 0
                ? 'background.paper'
                : 'background.default',
            '&:hover > *': {
              backgroundColor: alpha(theme.palette.secondary.light, 0.9),
            },
            transition: 'background-color 0.3s ease',
          }}
        >
          {columns.map((column) => {
            const value = row[column.id] ?? ''

            if (column.id === 'rfidTag') {
              return (
                <TableCell
                  key={column.id}
                  align={column.align || 'left'}
                  sx={{
                    fontSize: { sm: '1rem', md: '1.1rem', xl: '1.2rem' },
                    color: row.active ? 'primary.main' : 'gray.main',
                    minWidth: 240,
                  }}
                >
                  <Select
                    value={row.rfidTag || ''}
                    onChange={(e) => onRfidChange(row.id, e.target.value)}
                    displayEmpty
                    size="small"
                    sx={{ width: '100%' }}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 200,
                        },
                      },
                    }}
                  >
                    <MenuItem value="">
                      <em>Select</em>
                    </MenuItem>
                    {rfidTags
                      .filter((tag) => !usedRfidIds.includes(tag.id) || tag.id === row.rfidTag)
                      .map((tag) => (
                        <MenuItem key={tag.id} value={tag.id}>
                          {tag.serialNumber || tag.label || tag.id}
                        </MenuItem>
                      ))}
                  </Select>
                </TableCell>
              )
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
                {column.format && typeof value === 'number'
                  ? column.format(value)
                  : value}
              </TableCell>
            )
          })}
        </TableRow>
      ))}
    </TableBody>
  )
}

export default TableDataRows
