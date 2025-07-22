import { alpha, MenuItem, TableBody, TableCell, TableRow, Autocomplete, TextField } from '@mui/material'

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
              const selectedTag = rfidTags.find(tag => tag.id === row.rfidTag) || null
              const availableTags = rfidTags.filter(
                (tag) => !usedRfidIds.includes(tag.id) || tag.id === row.rfidTag
              )

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
                  <Autocomplete
                    options={availableTags}
                    getOptionLabel={(option) => option.serialNumber || option.label || option.id}
                    value={selectedTag}
                    onChange={(_, newValue) => onRfidChange(row.id, newValue ? newValue.id : '')}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    size="small"
                    disableClearable={false}
                    renderInput={(params) => <TextField {...params} />}
                    sx={{ width: '100%' }}
                    ListboxProps={{
                      style: { maxHeight: 200 },
                    }}
                  />
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
