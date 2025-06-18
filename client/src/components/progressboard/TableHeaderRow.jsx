import { TableCell, TableHead, TableRow } from '@mui/material'

// Renders the header row of the table using provided column definitions
const TableHeaderRow = ({ columns }) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell sx={{ width: '0', bgcolor: 'background.paper' }}></TableCell>
        {columns.map((column, index) => (
          <TableCell
            key={column.id}
            align={
              index === 0
                ? 'left'
                : index === columns.length - 1
                  ? 'right'
                  : 'center'
            }
            sx={{
              bgcolor: 'background.paper',
              fontWeight: 'bold',
              fontSize: '1rem',
              textTransform: 'uppercase',
            }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default TableHeaderRow
