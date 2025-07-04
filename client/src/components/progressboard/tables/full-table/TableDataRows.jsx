import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import {
  alpha,
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material'
import React, { useState } from 'react'

import theme from '../../../../styles/theme'

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
          height: { sm: '3.5rem' } ,
          backgroundColor: isEven
            ? alpha(theme.palette.background.paper, 0.6)
            : alpha(theme.palette.background.paper, 0.5),
          '&:focus': {
            backgroundColor: isEven
              ? alpha(theme.palette.background.paper, 0.6)
              : alpha(theme.palette.background.paper, 0.5),
          },
          '&:hover > *': {
            backgroundColor: alpha(theme.palette.secondary.light, 0.9),
          },
        }}
      >
        {/* Expand/Collapse toggle */}
        <TableCell
          sx={{
            border: 'none',
            backgroundColor: 'inherit',
            width: {
              sm: '2rem',
              md: '3rem',
              lg: '3.5rem',
              xl: '4rem',
            },
            py: { sm: 1, md: 1.5, lg: 1.75, xl: 2 },
            px: { sm: 0.5, md: 1.5, lg: 1.75, xl: 2 },
          }}
        >
          <IconButton
            disableRipple
            sx={{
              padding: 0,
              color: 'primary.main',
              '&:focus': {
                outline: 'none',
              },
              '& svg': {
                fontSize: {
                  sm: '1rem',
                  md: '1.5rem',
                  lg: '1.6rem',
                  xl: '1.75rem',
                },
              },
            }}
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
          </IconButton>
        </TableCell>

        {/* Create a cell for each column in the row */}
        {columns.map((column, index) => {
          const columnAlign = index === 0 ? 'left' : 'center'

          // Small screen columns
          let value
          switch (column.id) {
            case 'elevation':
              value = `${team.currentElevation} / ${team.totalElevation}`
              break
            case 'laps':
              value = `${team.lapsCompleted} / ${team.lapsRequired}`
              break
            default:
              value = team[column.id] ?? '-'
          }

          return (
            <TableCell
              sx={{
                border: 'none',
                padding: '0.4rem',
                fontSize: {
                  sm: '.9rem',
                  md: '1rem',
                  lg: '1.1rem',
                  xl: '1.2rem',
                },
                color: 'primary.main',
                backgroundColor: 'inherit',
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

      <TableRow
        sx={{ backgroundColor: alpha(theme.palette.background.paper, 0.6) }}
      >
        <TableCell sx={{ p: 0 }} colSpan={columns.length + 1}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ py: '.25rem' }}>
              <Table>
                <TableBody sx={{ px: 0 }}>
                  {(participants || []).map((participant, index) => (
                    <TableRow key={participant.id || index}>
                      <TableCell
                        sx={{
                          border: 'none',
                          width: {
                            sm: '2.3rem',
                            md: '3rem',
                            lg: '3.5rem',
                            xl: '4rem',
                          },
                          px: { sm: 2.2, md: 3, lg: 3.25, xl: 3.5 },
                          py: 0,
                        }}
                      >
                        <IconButton
                          size="small"
                          disableRipple
                          sx={{
                            visibility: 'hidden',
                            padding: 0,
                            color: 'primary.main',
                            '&:focus': {
                              outline: 'none',
                            },
                            '& svg': {
                              fontSize: {
                                sm: '.8rem',
                                md: '1rem',
                                lg: '1.1rem',
                                xl: '1.25rem',
                              },
                            },
                          }}
                        >
                          <KeyboardArrowDownIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell
                        sx={{
                          py: {
                            sm: '.18rem',
                            m: '.20rem',
                            lg: '.23rem',
                            xl: '.25rem',
                          },
                          px: 0,
                          border: 'none',
                          textAlign: 'left',
                          fontSize: {
                            sm: '.8rem',
                            md: '.9rem',
                            lg: '1rem',
                            xl: '1.1rem',
                          },
                          textTransform: 'uppercase',
                          color: 'primary.main',
                        }}
                      >
                        {participant.firstName} {participant.lastName}
                      </TableCell>
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
