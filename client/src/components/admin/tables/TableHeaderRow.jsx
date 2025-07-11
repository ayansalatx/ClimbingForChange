import { TableCell, TableHead, TableRow } from '@mui/material'

import AddButton from '../buttons/AddButton'

const TableHeaderRow = ({ columns, onAddClick, disabled }) => {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            sx={{
              width: column.width,
              textTransform: 'uppercase',
              letterSpacing: '0.075em',
              fontSize: { xxs: '1.1rem', md: '1.2rem', lg: '1.25rem', xl: '1.4rem' },
              fontWeight: 'bold',
              bgcolor: 'info.main',
              color: 'background.paper',
            }}
          >
            {column.label}
          </TableCell>
        ))}
        <TableCell
          sx={{ bgcolor: 'info.main', padding: 0, px: 2, textAlign: 'center' }}
        >
          <AddButton onAddClick={onAddClick} disabled={disabled} />
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

export default TableHeaderRow
