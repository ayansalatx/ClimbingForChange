import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import { TableContainer, TablePagination, Box } from '@mui/material'
import React, { useState } from 'react'

import SearchBar from './SearchBar'
import TableDataRows from './TableDataRows'
import TableHeaderRow from './TableHeaderRow'
import PlaceIcon from '@mui/icons-material/Place'

const LocationTable = ({ tableTitle, tableColumns, tableData, onAddClick }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const filteredRows = tableData.filter((row) =>
    Object.values(row)
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  )

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper
      elevation={3}
      sx={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: 'info.light',
          padding: '.5rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyItems: 'bottom',
            py: '.5rem',
          }}
        >
          <PlaceIcon
            fontSize="large"
            sx={{
              color: 'background.paper',
              filter: 'drop-shadow(2px 0px 1px var(--c4c-teal))',
            }}
          />
          <h1
            style={{
              textAlign: 'left',
              margin: '0',
              paddingBottom: '.15rem',
              paddingLeft: '.35rem',
              fontSize: '2.45rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              textShadow: '2px 0px 1px var(--c4c-teal)',
              color: 'white',
            }}
          >
            {tableTitle}
          </h1>
        </Box>

        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </Box>

      <TableContainer
        sx={{
          flexGrow: 1,
          overflowX: 'hidden',
        }}
      >
        <Table stickyHeader aria-label="sticky table" sx={{}}>
          <TableHeaderRow columns={tableColumns} onAddClick={onAddClick} />
          <TableDataRows
            rows={filteredRows}
            columns={tableColumns}
            page={page}
            rowsPerPage={rowsPerPage}
          />
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          bgcolor: 'info.light',
          color: 'background.paper',
          '& .MuiSvgIcon-root': {
            fontSize: '1.25rem',
            color: 'background.paper',
          },
        }}
        labelRowsPerPage=""
      />
    </Paper>
  )
}

export default LocationTable
