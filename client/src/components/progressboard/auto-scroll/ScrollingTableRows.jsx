import { TableBody, TableCell, TableRow } from '@mui/material'

const ScrollingTableRow = ({ teams, columns }) => {
  return (
    <TableBody>
      {teams.map((team) => (
        <TableRow key={team.id}>
          <TableCell></TableCell>
          {columns.map((column, colIndex) => {
            const value = team[column.id] ?? '-'
            let align = 'center'
            if (colIndex === 0) align = 'left'
            if (colIndex === columns.length - 1) align = 'right'
            return (
              <TableCell key={column.id} align={align}>
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
