import { TableCell, TableHead, TableRow, alpha } from '@mui/material'
import theme from '../../../styles/theme'
// Renders the header row of the table using provided column definitions
const TableHeaderRow = ({ columns }) => {
  return (
    <TableHead>
      <TableRow sx={{background: `linear-gradient(to right, ${alpha(theme.palette.primary.main, 0.8)}, ${alpha(theme.palette.primary.main, 0.3)}, ${alpha(theme.palette.primary.main, 0.8)})`,}}>
        {columns.map((column, index) => (
          <TableCell
            key={column.id}
            width={column.width}
            align={index === 0 ? 'left' : 'center'}
            sx={{
              background: 'transparent',
              color: 'background.default',
              fontWeight: 'bold',
              fontSize: '1.5rem',
              textTransform: 'uppercase',
              letterSpacing: '.1rem',
              border: 'none',
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
