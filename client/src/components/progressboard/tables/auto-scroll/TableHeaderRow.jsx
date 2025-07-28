import { alpha, Table, TableCell, TableHead, TableRow } from '@mui/material'

import theme from '../../../../styles/theme'
// Renders the header row of the table using provided column definitions
const TableHeaderRow = ({ columns }) => {
  return (
    <Table size="small" sx={{ tableLayout: 'fixed' }}>
      <TableHead>
        <TableRow
          sx={{
            mb: '3px',
            background: `linear-gradient(to right, ${alpha(theme.palette.primary.main, 0.8)}, ${alpha(theme.palette.primary.main, 0.3)}, ${alpha(theme.palette.primary.main, 0.8)})`,
          }}
        >
          {columns.map((column, index) => (
            <TableCell
              key={column.id}
              width={column.width}
              align={index === 0 ? 'left' : 'center'}
              sx={{
                position: 'sticky',
                width: column.width,
                px: { xxs: 0.5, md: 2 },
                background: 'transparent',
                color: 'background.default',
                fontWeight: 'bold',
                // fontStyle: 'italic',
                fontSize: {
                  xxs: '.5rem',
                  xs: '.6rem',
                  sm: '.75rem',
                  md: '1.2rem',
                  lg: '1.3rem',
                  xl: '1.45rem',
                },
                lineHeight: {
                  xxs: '.5rem',
                  xs: '.6rem',
                  sm: '.85rem',
                  md: '1.25rem',
                  lg: '1.35rem',
                },
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
    </Table>
  )
}

export default TableHeaderRow
