import { TableCell, TableHead, TableRow } from '@mui/material'

const LapHeaderRow = ({ columns }) => {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            sx={{
              width: column.width,
              border: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.075em',
              fontSize: {
                xxs: '1.1rem',
                md: '1.2rem',
                lg: '1.25rem',
                xl: '1.4rem',
              },
              fontWeight: 'bold',
              bgcolor: 'info.main',
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

export default LapHeaderRow
