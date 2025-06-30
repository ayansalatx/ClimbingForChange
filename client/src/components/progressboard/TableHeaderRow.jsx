import {
  TableCell,
  TableHead,
  TableRow,
  alpha,
  IconButton,
} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

// Renders the header row of the table using provided column definitions
const TableHeaderRow = ({ columns }) => {
  return (
    <TableHead sx={{ background: 'transparent' }}>
      <TableRow>
        <TableCell
          sx={{
            width: '0',
            backgroundColor: 'info.main',
            border: 'none',
          }}
        >
          <IconButton
            size="small"
            disableRipple
            sx={{
              visibility: 'hidden',
              padding: 0,
              color: 'primary.main',
              '&:focus': {
                outline: 'none',
              },
            }}
          >
            <KeyboardArrowDownIcon />
          </IconButton>
        </TableCell>
        {columns.map((column, index) => (
          <TableCell
            key={column.id}
            align={index === 0 ? 'left' : 'center'}
            sx={{
              width: column.width,
              backgroundColor: 'info.main',
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
