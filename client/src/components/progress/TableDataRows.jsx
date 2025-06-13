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
            <TableCell sx={{ padding: '0.4rem' }} key={column.id} align={align}>
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
                      <TableCell
                        sx={{ padding: '0.4rem', fontWeight: 'bold' }}
                        align="right"
                      >
                        {participant.firstName} {participant.lastName}
                      </TableCell>

                      {/* Remaining cells: placeholder values */}
                      {columns.slice(1).map((column) => {
                        const value = '--'
                        const align = column.align || 'right'

                        return (
                          <TableCell
                            sx={{ padding: '0.4rem' }}
                            key={column.id}
                            align={align}
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
