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

// Mock participant data
const mockParticipants = {
  // 'Alberta SPCA': ['Aimee Winegarden', 'Justine Pelletier'],
  // 'Andrew McDaniel': ['Andrew McDaniel'],
  // BIMbros: ['Jason Laser', 'Katherine Simunkovic', 'Linda de Jong'],
  // 'Glenrose Human Ability': ['Blake Schafer'],
  // 'HIBCO Generals': ['Amira Aissiou', 'Blair Anthony', 'Cherry Pagtalunan'],
  // 'Hill Billies': ['Booker Zaytsoff', 'Lisa Zaytsoff'],
  // STARS: ['Adam Perry', 'Angela Mazzolini'],
  // fallback
  default: ['Participant A', 'Participant B'],
}

const CollapsibleRow = ({ row, participants, columns }) => {
  const [open, setOpen] = useState(false)
  const teamName = row['teamName']

  return (
    <React.Fragment>
      <TableRow hover role='checkbox' tabIndex={-1} key={teamName}>
        {/* Expand/Collapse toggle */}
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
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
          const value = row[column.id]
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
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table>
                <TableBody>
                  {participants.map((participant, i) => (
                    <TableRow key={i}>
                      <TableCell
                        sx={{ padding: '0.4rem', fontWeight: 'bold' }}
                        align='right' // Changed to align right as you requested
                      >
                        {participant.fullName}
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

const TableDataRows = ({ rows, participants, columns, page, rowsPerPage }) => {
  return (
    <TableBody>
      {/* Slice the rows array to get only the rows for the current page. */}
      {rows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, rowIndex) => (
          <CollapsibleRow
            key={row['teamName'] || rowIndex}
            row={row}
            columns={columns}
            participants={participants[row['teamName']] || mockParticipants.default}
          />
        ))}
    </TableBody>
  )
}

export default TableDataRows
