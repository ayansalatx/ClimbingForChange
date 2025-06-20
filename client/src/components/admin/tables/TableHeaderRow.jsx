import { TableCell, TableHead, TableRow } from '@mui/material'
import AddButton from '../buttons/AddButton'

const TableHeaderRow = ({ columns, onAddClick }) => {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            sx={{
              minWidth: column.minWidth,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              bgcolor: 'info.main',
              color: 'white',
            }}
          >
            {column.label}
          </TableCell>
        ))}
        <TableCell
          sx={{ bgcolor: 'info.main', padding: '0', textAlign: 'center' }}
        >
          <AddButton onAddClick={onAddClick} />
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

export default TableHeaderRow
