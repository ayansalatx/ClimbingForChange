import { TableCell, TableHead, TableRow } from '@mui/material'

const LapHeaderRow = ({ columns }) => {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align="center"
            sx={{
              width: column.width,
              border: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.075em',
              fontSize: {
                xxs: '1.1rem',
                md: '1rem',
                lg: '1.25rem',
                xl: '1.4rem',
              },
              fontWeight: 'bold',
              bgcolor: 'info.main',
              color: 'background.paper',
              boxShadow: '0px 3px 0 rgba(0, 0, 0, 0.3)',
              px: { md: 1, lg: 1.75, xl: 2 },
              py: { md: 1, lg: 1.25, xl: 1.75 },
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
