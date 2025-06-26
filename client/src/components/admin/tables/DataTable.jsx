import { Box, TableContainer, TablePagination, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import { alpha } from '@mui/material/styles'
import Table from '@mui/material/Table'
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
  onAddClick,
  onEditClick,
  onDeleteClick,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const activeToggleOption = tableTitle == 'Events' ? 'visible' : 'hidden'

  let filteredRows = []

  if (tableTitle === 'Teams' || tableTitle === 'Participants') {
    filteredRows = tableData
      .filter((row) => showInactive || row.active)
      .filter((row) =>
        Object.values(row)
          .join(' ')
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
      .filter((row) => {
        if (!selectedEvent) return true
        return row.eventId === selectedEvent
      })
  } else {
    filteredRows = tableData
      .filter((row) => showInactive || row.active)
      .filter((row) =>
        Object.values(row)
          .join(' ')
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
  }

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
          flexGrow: 1,
          overflowX: 'auto',
          overflowY: 'auto',
          position: 'relative',
          scrollbarWidth: 'thin',
          scrollbarColor: `${theme.palette.primary.light} ${theme.palette.background.default}`,
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
            onDeleteClick={onDeleteClick}
          />
        </Table>
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
