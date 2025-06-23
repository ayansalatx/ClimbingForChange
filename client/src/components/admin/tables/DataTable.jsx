import PlaceIcon from '@mui/icons-material/Place'
import { Box, TableContainer, TablePagination, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import { alpha } from '@mui/material/styles'
import Table from '@mui/material/Table'
import React, { useState } from 'react'

import theme from '../../../styles/theme'
import SearchBar from './SearchBar'
import TableDataRows from './TableDataRows'
import TableHeaderRow from './TableHeaderRow'

const LocationTable = ({ tableTitle, tableColumns, tableData, onAddClick, onEditClick, onDeleteClick }) => {
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
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
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
          <Typography
            variant="h1"
            sx={{
              textAlign: 'left',
              margin: '0',
              paddingBottom: '.15rem',
              paddingLeft: '.35rem',
              fontSize: '2.45rem',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              textShadow: '2px 0px 1px var(--c4c-teal)',
              color: 'white',
            }}
          >
            {tableTitle}
          </Typography>
        </Box>

        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </Box>

      <TableContainer
        sx={(theme) => ({
          flexGrow: 1,
          overflowX: 'auto',
          overflowY: 'auto',
          position: 'relative',
          scrollbarWidth: 'thin',
          scrollbarColor: `${theme.palette.info.light} ${theme.palette.background.default}`,
        })}
      >
        <Table
          stickyHeader
          aria-label="sticky table"
          sx={{
            '&:hover': { bgcolor: alpha(theme.palette.primary.light, 0.05) },
          }}
        >
          <TableHeaderRow columns={tableColumns} onAddClick={onAddClick} />
          <TableDataRows
            rows={filteredRows}
            columns={tableColumns}
            page={page}
            rowsPerPage={rowsPerPage}
            onEditClick={onEditClick}
            onDeleteClick ={onDeleteClick}
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
          minHeight: '3.25rem',
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
