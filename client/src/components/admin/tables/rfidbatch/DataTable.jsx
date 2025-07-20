import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import React, { useState } from 'react'

import theme from '../../../../styles/theme'
import SearchBar from './SearchBar'
import TableDataRows from './TableDataRows'
import TableHeaderRow from './TableHeaderRow'

const DataTable = ({
  tableTitle,
  tableIcon: TableIcon,
  tableColumns,
  tableData = [],
  loading,
  onAddClick,
  onEditClick,
  onDeleteClick,
  activeOnChange,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const filteredRows = tableData.filter((row) => {
    const searchableText = Object.values(row).join(' ').toLowerCase()
    return searchableText.includes(searchTerm.toLowerCase())
  })

  const handleChangePage = (event, newPage) => setPage(newPage)
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
          bgcolor: 'primary.main',
          padding: '.5rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            py: '.5rem',
          }}
        >
          <TableIcon
            fontSize="large"
            sx={{ color: 'secondary.main' }}
          />
          <Typography
            variant="h1"
            sx={{
              margin: 0,
              paddingLeft: '.35rem',
              fontSize: '2.45rem',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
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
          width: '100%',
          height: '100%',
          flexGrow: 1,
          overflowX: 'auto',
          overflowY: 'auto',
          position: 'relative',
          scrollbarWidth: 'thin',
          scrollbarColor: `${theme.palette.primary.light} ${theme.palette.background.default}`,
        })}
      >
        {loading ? (
          <Table stickyHeader>
            <TableHeaderRow columns={tableColumns} />
            <TableBody>
              <TableRow>
                <TableCell colSpan={tableColumns.length + 1} align="center" sx={{ border: 'none' }}>
                  <CircularProgress color="info" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ) : filteredRows.length > 0 ? (
          <Table stickyHeader
            sx={{
              width: '100%',
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
              onDeleteClick={onDeleteClick}
              activeOnChange={activeOnChange}
            />
          </Table>
        ) : (
          <Table stickyHeader>
            <TableHeaderRow columns={tableColumns} onAddClick={onAddClick} />
            <TableBody>
              <TableRow>
                <TableCell colSpan={tableColumns.length + 1} align="center" sx={{ border: 'none' }}>
                  <Typography variant="h5" color="primary.main">
                    No {tableTitle.toLowerCase()} to display
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </TableContainer>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          backgroundColor: 'primary.main',
        }}
      >
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
            bgcolor: 'primary.main',
            color: 'background.paper',
            '& .MuiSvgIcon-root': {
              fontSize: '1.25rem',
              color: 'background.paper',
            },
          }}
          labelRowsPerPage=""
        />
      </Box>
    </Paper>
  )
}

export default DataTable
