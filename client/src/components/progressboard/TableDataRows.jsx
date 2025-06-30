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
  alpha,
} from '@mui/material'
import React, { useState } from 'react'
import theme from '../../styles/theme'

const CollapsibleRow = ({ team, index, columns, participants }) => {
  const [open, setOpen] = useState(false)
  const isEven = index % 2 === 0

  return (
    <React.Fragment>
      <TableRow
        hover
        role="checkbox"
        tabIndex={-1}
        sx={{
          backgroundColor: isEven
            ? alpha(theme.palette.background.paper, 0.6)
            : alpha(theme.palette.background.paper, 0.5),
        }}
      >
        {/* Expand/Collapse toggle */}
        <TableCell sx={{ border: 'none' }}>
          <IconButton
            size="small"
            disableRipple
            sx={{
              padding: 0,
              color: 'primary.main',
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
          const columnAlign = index === 0 ? 'left' : 'center'
          return (
            <TableCell
              sx={{
                border: 'none',
                padding: '0.4rem',
                fontSize: '1.1rem',
                color: 'primary.main',
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
                  {(participants || []).map((participant, index) => (
                    <TableRow key={participant.id || index}>
                      <TableCell sx={{ width: '4.2rem' }}></TableCell>
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
                          ></TableCell>
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
        .map((team, teamIndex) => {
          const index = page * rowsPerPage + teamIndex
          return (
            <CollapsibleRow
              key={team.id || index}
              team={team}
              index={index}
              columns={columns}
              participants={team.participants}
            />
          )
        })}
    </TableBody>
  )
}

export default TableDataRows
