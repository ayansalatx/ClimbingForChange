import { TableCell, TableHead, TableRow, alpha } from '@mui/material'
import theme from '../../styles/theme'
// Renders the header row of the table using provided column definitions
const TableHeaderRow = ({ columns }) => {
  return (
    <TableHead sx={{ background: 'transparent' }}>
      <TableRow sx={{background: alpha(theme.palette.info.main, 0.7)}}>
        <TableCell
          sx={{
            width: '0',
            background: 'transparent',
            border: 'none',
          }}
        ></TableCell>
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
              width: column.width,
              background: 'transparent',
              border: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.075em',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              color: 'background.paper',
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
