import { AddOutlined } from '@mui/icons-material'
import { TableCell, TableHead, TableRow, Button } from '@mui/material'
import React from 'react'

const TableHeaderRow = ({ columns }) => {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column, index) => (
          <TableCell
            key={column.id}
            align={index < 2 ? 'left' : 'center'}
            sx={{
              minWidth: column.minWidth,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              bgcolor: 'info.main',
              color: 'white',
            }}
          >
            {column.label}
          </TableCell>
        ))}
        <TableCell sx={{ bgcolor: 'info.main', padding: '0', textAlign: 'center' }}>
          <Button
            variant="contained"
            sx={{
              minWidth: 0,
              px: '.5rem',
              backgroundColor: 'secondary.main',
              color: 'black',
              '&:hover': { backgroundColor: '#b3c623' },
            }}
          >
            <AddOutlined />
          </Button>
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

export default TableHeaderRow
