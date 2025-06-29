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

  return (
    <React.Fragment>
      <TableRow hover role="checkbox" tabIndex={-1} key={team._id}>
        {/* Expand/Collapse toggle */}
        <TableCell>
          <IconButton
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

        {/* Create a cell for each column in the row */}
        {columns.map((column, index) => {
          const value = team[column.id] ?? '-'
          const columnAlign =
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
              align={columnAlign}
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
                  {(participants || []).map((participant) => (
                    <TableRow key={participant.id}>
                      <TableCell sx={{ width: '4.2rem' }}>
                        {/* <IconButton
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
                        </IconButton> */}
                      </TableCell>
                      <TableCell sx={{ padding: '0.4rem', textAlign: 'right' }}>
                        {participant.firstName} {participant.lastName}
                      </TableCell>

                      {/* Remaining cells*/}
                      {columns.slice(1).map((column) => {
                        return (
                          <TableCell
                            sx={{
                              padding: '0.4rem',
                              minWidth: column.minWidth || 100,
                              maxWidth: column.maxWidth || 'auto',
                              overflowWrap: 'break-word',
                              textAlign: 'center',
                            }}
                            key={column.id}
                          >
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
