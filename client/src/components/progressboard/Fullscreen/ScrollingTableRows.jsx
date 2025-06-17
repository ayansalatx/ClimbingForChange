import { TableBody, TableCell, TableRow } from '@mui/material'
import React from 'react'

const ScrollingTableRow = ({ teams, columns }) => {
  return (
    <TableBody>
      {teams.map((team, index) => (
        <TableRow key={team.id || index}>
          <TableCell></TableCell>
          {columns.map((column, colIndex) => {
            const value = team[column.id] ?? '-'
            let align = 'center'
            if (colIndex === 0) align = 'left'
            if (colIndex === columns.length - 1) align = 'right'
            return (
              <TableCell
                key={column.id}
                align={align}
                sx={{
                  ...(colIndex === columns.length - 1 && { pr: '1.75rem' }),
                }}
              >
                {value}
              </TableCell>
            )
          })}
        </TableRow>
      ))}
    </TableBody>
  )
}

export default ScrollingTableRow
