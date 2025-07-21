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

import theme from '../../../styles/theme'
import ActiveToggle from '../buttons/ShowInactiveToggle'
import EventSelector from './EventSelector'
import SearchBar from './SearchBar'
import TableDataRows from './TableDataRows'
import TableHeaderRow from './TableHeaderRow'

const DataTable = ({
  tableTitle,
  tableIcon: TableIcon,
  tableColumns,
  tableData = [],
  showInactive,
  setShowInactive,
  eventsForDropdown,
  selectedEvent,
  setSelectedEvent,
  activeOnChange,
  onAddClick,
  onEditClick,
  onDeleteClick,
  loading,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const activeToggleOption = tableTitle == 'Events' ? 'visible' : 'hidden'

  let filteredRows = []

  if (tableTitle === 'Teams' || tableTitle === 'Participants') {
    filteredRows = tableData
      .filter((row) => {
        const show = showInactive || row.active
        return show
      })
      .filter((row) => {
        const searchableText = Object.values(row).join(' ').toLowerCase()
        const matchesSearch = searchableText.includes(searchTerm.toLowerCase())
        return matchesSearch
      })
      .filter((row) => {
        if (!selectedEvent) return true
        return row.eventId === selectedEvent
      })
  } else {
    filteredRows = tableData
      .filter((row) => {
        const show = showInactive || row.active
        return show
      })
      .filter((row) => {
        const searchableText = Object.values(row).join(' ').toLowerCase()
        const matchesSearch = searchableText.includes(searchTerm.toLowerCase())
        return matchesSearch
      })
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const disableAdd = tableTitle === 'Participants' && !selectedEvent

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
            justifyItems: 'bottom',
            py: '.5rem',
          }}
        >
          <TableIcon
            fontSize="large"
            sx={{
              color: 'secondary.main',
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
              color: 'white',
            }}
          >
            {tableTitle}
          </Typography>
        </Box>

        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </Box>
      {['Teams', 'Participants'].includes(tableTitle) && (
        <Box
          sx={{
            px: 1,
            pt: 1,
            bgcolor: 'info.main',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              px: 1,
              bgcolor: 'info.light',
              borderRadius: '3px',
              fontSize: {
                xxs: '0.9rem',
                xs: '0.9rem',
                sm: '0.9rem',
                md: '1.1rem',
              },
            }}
          >
            <Typography
              variant="body1"
              component="span"
              color="primary.light"
              textTransform={'uppercase'}
              fontWeight={'bold'}
              letterSpacing={'.05rem'}
              paddingRight={1}
            >
              Event:
            </Typography>
            <EventSelector
              events={eventsForDropdown}
              selectedEvent={selectedEvent}
              setSelectedEvent={setSelectedEvent}
            />
          </Box>
        </Box>
      )}

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
          <Table stickyHeader height="100%">
            <TableHeaderRow columns={tableColumns} />
            <TableBody
              sx={{
                backgroundColor: 'background.paper',
              }}
            >
              <TableRow>
                <TableCell
                  colSpan={tableColumns.length + 1}
                  align="center"
                  sx={{ border: 'none' }}
                >
                  <CircularProgress color="info" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ) : filteredRows.length > 0 ? (
          <Table
            stickyHeader
            sx={{
              width: '100%',
              '&:hover': { bgcolor: alpha(theme.palette.primary.light, 0.05) },
            }}
          >
            <TableHeaderRow
              columns={tableColumns}
              onAddClick={onAddClick}
              disabled={disableAdd}
            />
            <TableDataRows
              rows={filteredRows}
              columns={tableColumns}
              page={page}
              rowsPerPage={rowsPerPage}
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
              activeOnChange={activeOnChange}
              toggleDisabled={(row) =>
                tableTitle === 'Events' &&
                !row.active &&
                !row.canReactivate
              }
            />
          </Table>
        ) : (
          <Table height="100%" stickyHeader>
            <TableHeaderRow
              columns={tableColumns}
              onAddClick={onAddClick}
              disabled={disableAdd}
            />
            <TableBody
              sx={{
                backgroundColor: 'background.paper',
              }}
            >
              <TableRow>
                <TableCell
                  colSpan={tableColumns.length + 1}
                  align="center"
                  sx={{ border: 'none' }}
                >
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
          justifyContent: 'space-between',
          backgroundColor: 'primary.main',
        }}
      >
        <ActiveToggle
          checked={showInactive}
          onChange={() => setShowInactive((prev) => !prev)}
          hidden={activeToggleOption}
        />

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
