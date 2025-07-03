import {
  alpha,
  Box,
  CircularProgress,
  Paper,
  Table,
  TableContainer,
  TablePagination,
} from '@mui/material'
import { useState } from 'react'

import theme from '../../../../../styles/theme'
import ScrollingTableRow from './ScrollingTableRows'
import TableHeaderRow from './TableHeaderRow'

const AutoScrollTable = ({ teams, columns, loading }) => {
  const [page, setPage] = useState(0)
  const rowsPerPage = 10

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  return (
    <Paper
      sx={{
        width: '100%',
        tableLayout: 'fixed',
        backgroundColor: 'transparent',
      }}
    >
      <TableHeaderRow columns={columns} />
      <TableContainer
        sx={{
          width: '100%',
          height: '100%',
          overflowY: 'auto',
          background: 'transparent',
        }}
      >
        {loading ? (
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexGrow: 1,
              alignItems: 'center',
              justifyContent: 'center',
              background: `linear-gradient(to right, ${alpha(theme.palette.primary.main, 0.8)}, ${alpha(theme.palette.primary.main, 0.3)}, ${alpha(theme.palette.primary.main, 0.8)})`,
              color: 'white',
              fontSize: '2rem',
            }}
          >
            <CircularProgress color="secondary" />
          </Box>
        ) : (
          <Table aria-label="auto scrolling table" size="small">
            <ScrollingTableRow columns={columns} teams={teams} />
          </Table>
        )}
      </TableContainer>
      <TablePagination
        component="div"
        count={teams.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        sx={{ display: 'none' }}
      />
    </Paper>
  )
}

export default AutoScrollTable
