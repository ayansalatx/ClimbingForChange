import {
  alpha,
  TableBody,
  TableCell,
  TableRow,
  useMediaQuery,
} from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'
import { Fragment } from 'react'

import theme from '../../../../styles/theme'
import { formatDurationTimeHours, formatDurationTimeMinutes } from '../../../../utils/formatDurationTime'

const ScrollingTableRow = ({ teams, columns, shouldScroll }) => {
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'))

  const gradientBackground = `linear-gradient(to right, ${alpha(theme.palette.primary.main, 0.8)}, ${alpha(theme.palette.primary.main, 0.3)}, ${alpha(theme.palette.primary.main, 0.8)})`
  return (
    <TableBody className="marquee__content" sx={{ '--scroll-duration': `${shouldScroll ? teams.length * 0.8 : 0}s` }}>
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
          <TableRow
            key={index}
            sx={{ background: gradientBackground }}
          >
            {columns.map((column, colIndex) => {
              let value = team[column.id] ?? 0

              if (
                (team[column.id] === 0
                  && column.id === 'currentElevation'
                  && isLarge)
                || (team[column.id] === 0
                  && column.id === 'lapsCompleted'
                  && isLarge)
                || (team[column.id] === null && column.id === 'bestLap' && isLarge)
              ) {
                value = '-'
              }

              if (column.id === 'elevation' || column.id === 'currentElevation') {
                const percent = team.progressPercent !== undefined ? team.progressPercent : (team.totalElevation ? Math.round((team.currentElevation / team.totalElevation) * 1000) / 10 : 0)
                value = (
                  <div>
                    <span>{team.currentElevation}</span>
                    {team.totalElevation > 0 && Number.isFinite(percent) && team.lapsCompleted > 1 && (
                      <>
                        <span style={{ color: 'inherit', fontWeight: 'bold', marginLeft: 4 }}>{`(${percent}%)`}</span>
                        <LinearProgress
                          variant="determinate"
                          value={Math.min(percent, 100)}
                          sx={{ 'height': 6, 'borderRadius': 3, 'mt': 0.5, 'background': alpha(theme.palette.primary.main, 0.15), '& .MuiLinearProgress-bar': { backgroundColor: theme.palette.secondary.main } }}
                        />
                      </>
                    )}
                  </div>
                )
              }
              else if (column.id === 'laps') {
                value = `${team.lapsCompleted} / ${team.lapsRequired}`
              }
              else if (column.id === 'bestLap') {
                value = team.bestLap && team.bestLap > 0 ? formatDurationTimeMinutes(team.bestLap) : '-'
              }
              else if (column.id === 'timeElapsed') {
                value = team.timeElapsed && team.timeElapsed > 0 ? formatDurationTimeHours(team.timeElapsed) : '-'
              }
              else {
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
