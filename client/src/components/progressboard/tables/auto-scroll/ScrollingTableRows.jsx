import {
  alpha,
  TableBody,
  TableCell,
  TableRow,
  useMediaQuery,
} from '@mui/material'
import { Fragment } from 'react'

import theme from '../../../../styles/theme'

const ScrollingTableRow = ({ teams, columns }) => {
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'))

  const gradientBackground = `linear-gradient(to right, ${alpha(theme.palette.primary.main, 0.8)}, ${alpha(theme.palette.primary.main, 0.3)}, ${alpha(theme.palette.primary.main, 0.8)})`
  return (
    <TableBody className="marquee__content">
      {teams.map((team, index) => (
        <Fragment key={team.id || index}>
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
            key={team.id || index}
            sx={{ background: gradientBackground }}
          >
            {columns.map((column, colIndex) => {
              let value = team[column.id] ?? 0

              if (
                (team[column.id] === 0 &&
                  column.id === 'currentElevation' &&
                  isLarge) ||
                (team[column.id] === 0 &&
                  column.id === 'lapsCompleted' &&
                  isLarge) ||
                (team[column.id] === null && column.id === 'bestLap' && isLarge)
              ) {
                value = '-'
              }

              if (column.id === 'elevation') {
                value = `${team.currentElevation} / ${team.totalElevation}`
              } else if (column.id === 'laps') {
                value = `${team.lapsCompleted} / ${team.lapsRequired}`
              } else {
                value = team[column.id] ?? '-'
              }

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
                    px: { xxs: 0.5, md: 2 },
                    fontSize: {
                      xxs: '.65rem',
                      md: '.85rem',
                      lg: '1rem',
                      xl: '1.25rem',
                    },
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
