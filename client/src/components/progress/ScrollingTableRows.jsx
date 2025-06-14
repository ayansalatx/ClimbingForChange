import { TableBody,TableCell, TableRow } from '@mui/material'
import React from 'react'

const ScrollingTableRow = ({ teams, columns }) => {
  return (
    <TableBody>
      {teams.map((team, index) => (
        <TableRow key={team.id || index}>
          <TableCell>
            
          </TableCell>
          {columns.map((column) => {
            const value = team[column.id]
            return <TableCell key={column.id}>{value}</TableCell>
          })}
        </TableRow>
      ))}
    </TableBody>
  )
}

export default ScrollingTableRow
