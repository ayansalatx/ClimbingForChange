import { Delete, Edit } from '@mui/icons-material'
import { Box,IconButton, TableBody, TableCell,TableRow } from '@mui/material'
import Switch from '@mui/material/Switch'
 
const TableDataRows = ({ rows, columns, page, rowsPerPage, onDelete }) => {
  return (
    <TableBody>
      {rows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, rowIndex) => {
          const rowKey = `${row.eventName}-${row.start}-${rowIndex}`
 
          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={rowKey}>
              {columns.map((column) => {
                const value = row[column.id]
                return (
                  <TableCell
                    key={`${rowKey}-${column.id}`}
                    align={column.align}
                  >
                    {column.format && typeof value === 'number'
                      ? column.format(value)
                      : typeof value === 'boolean'
                        ? <Switch disabled defaultChecked={value} />
                        : value}
                  </TableCell>
                )
              })}
              <TableCell key={`${rowKey}-actions`} align="right">
                <Box display="flex" gap={1} justifyContent="flex-end">
                  <IconButton size="small">
                    <Edit />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => onDelete(row.id)} 
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          )
        })}
    </TableBody>
  )
}
 
export default TableDataRows