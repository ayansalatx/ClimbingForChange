import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import React from 'react'

import {deleteEvent} from '../../../../services/eventService.js'
import TableDataRows from './TableDataRows'
import TableHeaderRow from './TableHeaderRow'
 
// Define columns for full width screen
const formatDateTime = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString([], {
    year: 'numeric',
    month: 'long',  
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}
 
const fullColumns = [
  { id: 'eventName', label: 'Event', minWidth: 270 },
  { id: 'location', label: 'Location', minWidth: 85 },
  { id: 'start', label: 'Start-Time', minWidth: 85 },
  { id: 'end', label: 'End-Time', minWidth: 85 },
  { id: 'duration', label: 'Duration', minWidth: 85 },
  { id: 'lap', label: 'Lap', minWidth: 85 },
  { id: 'active', label: 'Active', minWidth: 90 },
]
 
 
const EventsTable = ({ searchTerm = '', events = [] }) => {  
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
 
  const formattedEvents = events.map(event => {
    const startTime = event.startDateTime
    const endTime = event.endDateTime
    const startDate = new Date(startTime)
    const endDate = new Date(endTime)
    const durationTime = (endDate - startDate) / (1000 * 60)

    return  ({
      ...event,
      start: formatDateTime(startTime),
      end:formatDateTime(endTime),
      eventName: event.name || '',
      location: event.locationId?.name || '',
      duration: durationTime,  
      lap: event.physicalMountainIds?.length || 0,
      active: event.active
    })
     
  })
  const filteredRows = formattedEvents.filter((row) => {
    const event = row?.eventName || ''
    return event.toLowerCase().includes(searchTerm.toLowerCase())
  })
 
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
 
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
 
  const onDelete = async (id) => {
    await deleteEvent(id)
  }
 
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ width: 1400}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHeaderRow columns={fullColumns} />
          <TableDataRows
            onDelete={onDelete}
            rows={filteredRows}
            columns={fullColumns}
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
      />
    </Paper>
  )
}
 
export default EventsTable
 
