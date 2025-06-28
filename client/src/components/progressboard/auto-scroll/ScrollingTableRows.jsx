import { alpha, TableBody, TableCell, TableRow } from '@mui/material'
import { Fragment } from 'react'

import theme from '../../../styles/theme'

const ScrollingTableRow = ({ teams, columns }) => {
  const gradientBackground = `linear-gradient(to right, ${alpha(theme.palette.primary.main, 0.8)}, ${alpha(theme.palette.primary.main, 0.3)}, ${alpha(theme.palette.primary.main, 0.8)})`
  return (
    <TableBody className="marquee__content" sx={{}}>
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
          <TableRow key={team.id} sx={{ background: gradientBackground }}>
            {columns.map((column, colIndex) => {
              const value = team[column.id] ?? '-'
              let align = 'center'
              if (colIndex === 0) align = 'left'
              const isEven = index % 2 === 0
              return (
                <TableCell
                  key={column.id}
                  align={align}
                  sx={{
                    border: 'none',
                    width: column.width,
                    fontSize: '1.25rem',
                    textTransform: 'uppercase',
                    letterSpacing: '.05rem',
                    color: isEven ? 'secondary.main' : 'info.main',
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
