import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material'
import React, { useState } from 'react'

const CollapsibleRow = ({ team, columns, participants }) => {
  const [open, setOpen] = useState(false)
  const teamName = team.name

  return (
    <React.Fragment>
      <TableRow hover role="checkbox" tabIndex={-1} key={teamName}>
        {/* Expand/Collapse toggle */}
        <TableCell>
          <IconButton
            aria-label="expand team"
            size="small"
            disableRipple
            sx={{
              padding: 0,
              '&:focus': {
                outline: 'none',
              },
            }}
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
          </IconButton>
        </TableCell>

        {/* For each column in the column definition, render a matching cell */}
        {columns.map((column, index) => {
          const value = team[column.id]
          const align =
            index === 0
              ? 'left'
              : index === columns.length - 1
                ? 'right'
                : 'center'
          return (
            <TableCell
              sx={{
                padding: '0.4rem',
                ...(index === columns.length - 1 && { pr: '1.75rem' }),
              }}
              key={column.id}
              align={align}
            >
              {column.format && typeof value === 'number'
                ? column.format(value)
                : value}
            </TableCell>
          )
        })}
      </TableRow>

      <TableRow>
        <TableCell
          sx={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={columns.length + 1}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table>
                <TableBody>
                  {participants.map((participant, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <IconButton
                          aria-label="expand team"
                          size="small"
                          color="#fff"
                          disableRipple
                          sx={{
                            padding: 0,
                            visibility: 'hidden',
                          }}
                        >
                          <KeyboardArrowRightIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell sx={{ padding: '0.4rem', textAlign: 'right' }}>
                        {participant.firstName} {participant.lastName}
                      </TableCell>

                      {/* Remaining cells: placeholder values */}
                      {columns.slice(1).map((column) => {
                        const laps = participant.laps || []
                        let value = '--'

                        switch (column.id) {
                          case 'currentElevation':
                            value = laps.length * 217
                            break
                          case 'lapsRequired':
                            value = team.lapsRequired ?? '-'
                            break
                          case 'lapsCompleted':
                            value = laps.length
                            break
                          case 'lapsToGo':
                            value = Math.max(
                              (team.lapsRequired || 0) - laps.length,
                              0
                            )
                            break
                          case 'bestLap':
                            if (laps.length) {
                              const bestLap = laps.reduce((best, lap) => {
                                const bestDuration =
                                  new Date(best.endDateTime) -
                                  new Date(best.startDateTime)
                                const currentDuration =
                                  new Date(lap.endDateTime) -
                                  new Date(lap.startDateTime)
                                return currentDuration < bestDuration
                                  ? lap
                                  : best
                              }, laps[0])
                              const minutes = Math.floor(
                                (new Date(bestLap.endDateTime) -
                                  new Date(bestLap.startDateTime)) /
                                  60000
                              )
                              const seconds =
                                Math.floor(
                                  (new Date(bestLap.endDateTime) -
                                    new Date(bestLap.startDateTime)) /
                                    1000
                                ) % 60
                              value = `${minutes}:${String(seconds).padStart(2, '0')}`
                            }
                            break
                          case 'timeElapsed':
                            if (laps.length) {
                              const first = new Date(laps[0].startDateTime)
                              const last = new Date(
                                laps[laps.length - 1].endDateTime
                              )
                              const minutes = Math.floor((last - first) / 60000)
                              const seconds =
                                Math.floor((last - first) / 1000) % 60
                              value = `${minutes}:${String(seconds).padStart(2, '0')}`
                            }
                            break
                          default:
                            value = participant[column.id] ?? '-'
                        }
                        const align = column.align || 'right'

                        return (
                          <TableCell
                            sx={{ padding: '0.4rem' }}
                            key={column.id}
                            align={'center'}
                            width={column.width}
                          >
                            {value}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

const TableDataRows = ({ teams, columns, page, rowsPerPage }) => {
  return (
    <TableBody>
      {/* Slice the teams array to get only the teams for the current page. */}
      {teams
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((team, teamIndex) => (
          <CollapsibleRow
            key={team._id || teamIndex}
            team={team}
            columns={columns}
            participants={team.participants}
          />
        ))}
    </TableBody>
  )
}

export default TableDataRows
