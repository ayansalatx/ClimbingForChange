import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { IconButton, TableCell, TableHead, TableRow } from '@mui/material'

// Renders the header row of the table using provided column definitions
const TableHeaderRow = ({ columns }) => {
  return (
    <TableHead sx={{ background: 'transparent' }}>
      <TableRow>
        <TableCell
          sx={{
            backgroundColor: 'info.main',
            border: 'none',
            p: { sm: 0.5, md: 1, lg: 1.25, xl: 1.5 },
            pr: 0,
          }}
        >
          <IconButton
            size="small"
            disableRipple
            sx={{
              'visibility': 'hidden',
              'padding': 0,
              'color': 'background.paper',
              '&:focus': {
                outline: 'none',
              },
              '& svg': {
                fontSize: {
                  sm: '1rem',
                  md: '1.5rem',
                  lg: '1.6rem',
                  xl: '1.75rem',
                },
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
              px: {
                xs: 0.5,
                sm: 0.75,
                md: 1,
                lg: 1.25,
                xl: 1.5,
              },
              py: {
                xs: 0.4,
                sm: 0.5,
                md: 0.6,
                lg: 0.7,
                xl: 0.75,
              },
              backgroundColor: 'info.main',
              border: 'none',
              lineHeight: {
                sm: 1,
                md: 1.1,
                lg: 1.2,
                xl: 1.3,
              },
              textTransform: 'uppercase',
              letterSpacing: '0.075em',
              fontSize: {
                xs: '1rem',
                sm: '1.1rem',
                md: '1.2rem',
                lg: '1.3rem',
                xl: '1.4rem',
              },
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
