import {
  alpha,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material'
import { Fragment } from 'react'

import theme from '../../../../styles/theme'

const ScrollingTableRow = ({ teams, columns, shouldScroll }) => {
  const gradientBackground = `linear-gradient(to right, ${alpha(theme.palette.primary.main, 0.8)}, ${alpha(theme.palette.primary.main, 0.3)}, ${alpha(theme.palette.primary.main, 0.8)})`
  return (
    <TableBody
      className="marquee__content"
      sx={{
        '--scroll-duration': `${shouldScroll ? teams.length * 0.8 : 0}s`,
        '--scroll-direction': 'scroll-vertical',
      }}
    >
      {teams.map((team, index) => (
        <Fragment key={index}>
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
          <TableRow key={index} sx={{ background: gradientBackground }}>
            {columns.map((column, colIndex) => {
              let value = team[column.id] ?? 0

              switch (column.id) {
                // case 'name': {
                //   const percent =
                //     team.progressPercentage !== undefined
                //       ? team.progressPercentage
                //       : 0
                //   value = (
                //     <Box sx={{ minWidth: 80 }}>
                //       <Box component="span">{team.name}</Box>
                //       <LinearProgress
                //         variant="determinate"
                //         value={percent}
                //         sx={{
                //           height: 6,
                //           borderRadius: 3,
                //           background: alpha(theme.palette.primary.main, 0.25),
                //           '& .MuiLinearProgress-bar': {
                //             backgroundColor: theme.palette.secondary.main,
                //             borderRadius: 3,
                //           },
                //           filter: 'drop-shadow(0 0 4px rgba(0, 0, 0, 0.3))',
                //         }}
                //       />
                //     </Box>
                //   )
                //   break
                // }
                case 'elevation':
                  value = `${team.currentElevation} / ${team.otalElevation}`
                  break
                case 'laps':
                  value = `${team.lapsCompleted} / ${team.lapsRequired}`
                  break
                default:
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
                      md: '1rem',
                      lg: '1.25rem',
                      xl: '1.5rem',
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
