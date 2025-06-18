import { Delete,Edit } from '@mui/icons-material'
import { TableBody, TableCell,TableRow } from '@mui/material'
import React from 'react'

const TableDataRows = ({ rows, columns, page, rowsPerPage }) => {
  return (
    <TableBody>
      {/* Slice the rows array to get only the rows for the current page. */}
      {rows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={row.code ?? index}>
              {/* For each column in the column definition, render a matching cell */}
              {columns.map((column) => {
                const value = row[column.id]
                return (
                  <TableCell key={column.id} align={column.align}>
                    {column.format && typeof value === 'number'
                      ? column.format(value)
                      : value}
                  </TableCell>
                )
              })}
              <TableCell key={row.id} align={'right'}>
                <Edit/>
                <Delete/>
              </TableCell>
            </TableRow>
          )
        })}
    </TableBody>
  )
}

export default TableDataRows
