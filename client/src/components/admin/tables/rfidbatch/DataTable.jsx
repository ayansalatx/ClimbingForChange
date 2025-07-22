import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import React, { useState } from 'react'

import theme from '../../../../styles/theme'
import EventSelector from '../EventSelector'
import SearchBar from './SearchBar'
import TableDataRows from './TableDataRows'
import TableHeaderRow from './TableHeaderRow'

const DataTable = ({
  tableTitle,
  tableIcon: TableIcon,
  tableColumns,
  tableData = [],
  eventsForDropdown = [],
  selectedEvent,
  setSelectedEvent,
  rfidTags = [],
  onRfidChange,
  usedRfidIds = [],
  loading,
  onSave,
}) => {
  const [searchTerm, setSearchTerm] = useState('')

  let filteredRows = tableData.filter((row) =>
    Object.values(row).join(' ').toLowerCase().includes(searchTerm.toLowerCase())
  )

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
        <Box sx={{ display: 'flex', alignItems: 'center', py: '.5rem' }}>
          <TableIcon fontSize="large" sx={{ color: 'secondary.main' }} />
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

      {tableTitle === 'Team RFID Batch Edit' && (
        <Box sx={{ px: 1, pt: 1, bgcolor: 'info.main' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              px: 1,
              bgcolor: 'info.light',
              borderRadius: '3px',
              fontSize: { xxs: '0.9rem', sm: '0.9rem', md: '1.1rem' },
            }}
          >
            <Typography
              variant="body1"
              component="span"
              color="primary.light"
              textTransform="uppercase"
              fontWeight="bold"
              letterSpacing=".05rem"
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
          flexGrow: 1,
          overflowX: 'auto',
          overflowY: 'auto',
          position: 'relative',
          maxHeight: '600px', // or adjust as needed
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
          <Table
            stickyHeader
            sx={{
              width: '100%',
              '&:hover': { bgcolor: alpha(theme.palette.primary.light, 0.05) },
            }}
          >
            <TableHeaderRow columns={tableColumns} />
            <TableDataRows
              rows={filteredRows}
              columns={tableColumns}
              rfidTags={rfidTags}
              onRfidChange={onRfidChange}
              usedRfidIds={usedRfidIds}
            />
          </Table>
        ) : (
          <Table stickyHeader>
            <TableHeaderRow columns={tableColumns} />
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
          px: 3,
          py: 1,
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={onSave}
          sx={{ textTransform: 'uppercase' }}
        >
          Save
        </Button>
      </Box>
    </Paper>
  )
}

export default DataTable
