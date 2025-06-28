import { Box, TableBody, TableCell, TableRow, alpha } from '@mui/material'
import theme from '../../../styles/theme'
import { Fragment } from 'react'

const ScrollingTableRow = ({ teams, columns }) => {
  return (
    <TableBody >
      {teams.map((team, index) => (
        <Fragment key={team.id}>
          <TableRow>
            <TableCell
              colSpan={columns.length}
              sx={{
                p: 0,
                border: 'none',
                height: '3px',
                background: 'transparent',
              }}
            />
          </TableRow>
          <TableRow
            key={team.id}
            sx={{
              background: `linear-gradient(to right, ${alpha(theme.palette.primary.main, 0.8)}, ${alpha(theme.palette.primary.main, 0.3)}, ${alpha(theme.palette.primary.main, 0.8)})`,
            }}
          >
            {columns.map((column, colIndex) => {
              const value = team[column.id] ?? '-'
              let align = 'center'
              if (colIndex === 0) align = 'left'
              if (colIndex === columns.length - 1) align = 'right'
              const isEven = index % 2 === 0
              return (
                <TableCell
                  key={column.id}
                  align={align}
                  sx={{
                    border: 'none',
                    fontSize: '1.25rem',
                    textTransform: 'uppercase',
                    letterSpacing: '.05rem',
                    color: isEven ? 'secondary.main' : 'info.main'
                  }}
                >
                  {value}
                </TableCell>
              )
            })}
          </TableRow>
        </Fragment>
      ))}
    </TableBody>
  )
}

export default ScrollingTableRow
