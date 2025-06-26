import GroupsIcon from '@mui/icons-material/Groups'
import {
  Box,
  Paper,
  Table,
  TableContainer,
  TablePagination,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { alpha } from '@mui/material/styles'

import theme from '../../../../styles/theme'
import SearchBar from './SearchBar'
import TableHeaderRow from './TableHeaderRow'
import TableDataRows from './TableDataRows'

const defaultColumns = [
  { id: 'firstName', label: 'First Name', align: 'left', width: '30%' },
  { id: 'lastName', label: 'Last Name', align: 'left', width: '30%' },
  { id: 'teamId.name', label: 'Team Name', align: 'center', width: '40%' },
]

const ParticipantTable = ({
  tableTitle = 'Participants',
  tableColumns = defaultColumns,
  tableData = [],
  onAddClick,
  onEditClick,
  onDeleteClick,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const filteredRows = tableData.filter((row) =>
    Object.values(row || {})
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
      {/* Header */}
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
          <GroupsIcon fontSize="large" sx={{ color: 'secondary.main' }} />
          <Typography
            variant="h1"
            sx={{
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
        sx={{
          flexGrow: 1,
          overflowX: 'auto',
          overflowY: 'auto',
          position: 'relative',
          scrollbarWidth: 'thin',
          scrollbarColor: `${theme.palette.primary.light} ${theme.palette.background.default}`,
        }}
      >
        <Table
          stickyHeader
          aria-label="sticky table"
          sx={{
            '&:hover': {
              bgcolor: alpha(theme.palette.primary.light, 0.05),
            },
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
          bgcolor: 'primary.main',
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

export default ParticipantTable