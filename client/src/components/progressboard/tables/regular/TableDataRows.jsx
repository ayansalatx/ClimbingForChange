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
import React, { useEffect, useRef, useState } from 'react'

import theme from '../../../../styles/theme'

const CollapsibleRow = ({ team, index, columns, participants }) => {
  const [open, setOpen] = useState(false)
  const expandRef = useRef(null)
  const isEven = index % 2 === 0

  useEffect(() => {
    setOpen(false)
  }, [team?.id, index])

  // Scroll to expanded rows in team
  const handleCollapseEntered = () => {
    if (expandRef.current) {
      expandRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }

  return (
    <React.Fragment>
      <TableRow
        hover
        role="checkbox"
        tabIndex={-1}
        sx={{
          height: { sm: '2.95rem', md: '3.15rem', lg: '3.25rem', xl: '3.5rem' },
          p: 0,
          border: 'none',
          backgroundColor: open
            ? alpha(theme.palette.secondary.light, 0.5)
            : isEven
              ? alpha(theme.palette.background.paper, 0.3)
              : alpha(theme.palette.background.paper, 0.2),

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
            p: { sm: 0.5, md: 1, lg: 1.1, xl: 1.2 },
            pr: 0,
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
                  sm: '1.1rem',
                  md: '1.4rem',
                  lg: '1.5rem',
                  xl: '1.7rem',
                },
              },
            }}
            onClick={() => {
              if (participants.length > 0) {
                setOpen(!open)
              }
            }}
          >
            {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
          </IconButton>
        </TableCell>

        {/* Create a cell for each column in the row */}
        {columns.map((column, index) => {
          const columnAlign = index === 0 ? 'left' : 'center'
          const fontWeight = column.id === 'name' ? 'bold' : 'regular'

          let fontSize
          let letterSpacing
          let color
          switch (column.id) {
            case 'name':
              fontSize = {
                sm: '1.05rem',
                md: '1.2rem',
                lg: '1.3rem',
                xl: '1.4rem',
              }
              letterSpacing = '.01rem'
              color = 'primary.light'
              break
            case 'mountain':
              fontSize = {
                sm: '1rem',
                md: '1.2rem',
                lg: '1.3rem',
                xl: '1.4rem',
              }
              letterSpacing = 'auto'
              color = 'primary.main'
              break
            default:
              fontSize = {
                sm: '.9rem',
                md: '1.1rem',
                lg: '1.2rem',
                xl: '1.3rem',
              }
              letterSpacing = 'auto'
              color = 'primary.main'
          }

          const currentElevation = team.currentElevation ?? 0
          const totalElevation = team.totalElevation ?? 0
          const lapsCompleted = team.lapsCompleted ?? 0
          const lapsRequired = team.lapsRequired ?? 0

          // Small screen columns
          let value
          switch (column.id) {
            case 'elevation':
              value = `${currentElevation} / ${totalElevation}`
              break
            case 'laps':
              value = `${lapsCompleted} / ${lapsRequired}`
              break
            default:
              value = team[column.id] ?? '-'
          }

          return (
            <TableCell
              sx={{
                border: 'none',
                padding: '0',
                verticalAlign: 'middle',
                backgroundColor: 'inherit',
                color: color,
                textTransform: 'uppercase',
                letterSpacing: letterSpacing,
                fontWeight: fontWeight,
                fontSize: fontSize,
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
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            onEntered={handleCollapseEntered}
          >
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
                            sm: '.9rem',
                            md: '1.1rem',
                            lg: '1.2rem',
                            xl: '1.3rem',
                          },
                          textTransform: 'uppercase',
                          fontWeight: 'bold',
                          letterSpacing: '0.015rem',
                          color: 'primary.light',
                        }}
                      >
                        {participant.firstName} {participant.lastName}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Box ref={expandRef} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

const TableDataRows = ({ eventId, teams, columns, page, rowsPerPage }) => {
  return (
    <TableBody>
      {/* Slice the teams array to get only the teams for the current page. */}
      {teams
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((team, teamIndex) => {
          const index = page * rowsPerPage + teamIndex
          return (
            <CollapsibleRow
              key={`${eventId}-${team.id || index}`}
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
