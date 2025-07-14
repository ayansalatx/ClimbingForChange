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
import FlagIcon from '@mui/icons-material/Flag'
import theme from '../../../../styles/theme'
import LapHeaderRow from './LapHeaderRow'
import LapDataRows from './LapDataRows'

const LapTable = ({ tableColumns, laps = [], loading }) => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(15)

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
        backgroundColor: 'transparent',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '.5rem',
          backgroundColor: 'background.paper',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyItems: 'bottom',
            py: '.25rem',
          }}
        >
          <FlagIcon
            sx={{
              color: 'secondary.main',
              fontSize: '2.1rem',
            }}
          />
          <Typography
            variant="h1"
            sx={{
              textAlign: 'left',
              margin: '0',
              paddingBottom: '.15rem',
              paddingLeft: '.35rem',
              fontSize: '2rem',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'primary.light',
            }}
          >
            Laps
          </Typography>
        </Box>
      </Box>

      <TableContainer
        sx={(theme) => ({
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          minHeight: 0,
          position: 'relative',
          scrollbarWidth: 'thin',
          scrollbarColor: `${theme.palette.secondary.main} ${theme.palette.background.default}`,
        })}
      >
        {loading ? (
          <Table stickyHeader height="100%">
            <LapHeaderRow columns={tableColumns} />
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={tableColumns.length + 1}
                  align="center"
                  sx={{ border: 'none' }}
                >
                  <CircularProgress color="secondary" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ) : laps.length > 0 ? (
          <Table
            stickyHeader
            size="small"
            sx={{
              width: '100%',
              '&:hover': { bgcolor: alpha(theme.palette.primary.light, 0.05) },
            }}
          >
            <LapHeaderRow columns={tableColumns} />
            <LapDataRows
              rows={laps}
              columns={tableColumns}
              page={page}
              rowsPerPage={rowsPerPage}
            />
          </Table>
        ) : (
          <Table height="100%" stickyHeader>
            <LapHeaderRow columns={tableColumns} />
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={tableColumns.length + 1}
                  align="center"
                  sx={{
                    backgroundColor: alpha(theme.palette.background.paper, 0.1),
                    border: 'none',
                  }}
                >
                  <Typography variant="h5" color="secondary.main">
                    no laps to display yet
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
          backgroundColor: 'background.paper',
        }}
      >
        <TablePagination
          rowsPerPageOptions={[15, 25, 100]}
          component="div"
          count={laps.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            minHeight: '3rem',
            bgcolor: 'background.paper',
            color: 'primary.main',
            '& .MuiSvgIcon-root': {
              fontSize: '1.25rem',
              color: 'primary.main',
            },
          }}
          labelRowsPerPage=""
        />
      </Box>
    </Paper>
  )
}

export default LapTable
