import FlagIcon from '@mui/icons-material/Flag'
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
import React from 'react'

import theme from '../../../../styles/theme'
import ExitButton from './ExitButton'
import LapDataRows from './LapDataRows'
import LapHeaderRow from './LapHeaderRow'

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
        boxShadow: '0px 3px 0 rgba(0, 0, 0, 0.3)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '.5rem',
          backgroundColor: alpha(theme.palette.background.paper, 0.75),
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
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyItems: 'bottom',
              backgroundColor: 'primary.light',
              borderRadius: '36px',
              p: .5,
            }}
          >
            <FlagIcon
              sx={{
                color: { xxs: alpha(theme.palette.background.paper, 0.85), md: 'secondary.main' },
                fontSize: { xxs: '.95rem', xs: '1rem', sm: '1.1rem', md: '1.2rem', lg: '1.4rem' },
              }}
            />
          </Box>
          <Typography
            variant='h1'
            sx={{
              textAlign: 'left',
              margin: '0',
              paddingBottom: '.15rem',
              paddingLeft: '.35rem',
              fontSize: { xxs: '1.2rem', xs: '1.5rem', sm: '1.75rem', md: '1.75rem', lg: '2rem' ,xl: '2.25rem' },
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: { xxs: 'primary.light', md: 'primary.main' },
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
          scrollbarColor: `${theme.palette.secondary.main} ${theme.palette.primary.light}`,
          boxShadow: '0px 3px 1px rgba(49, 47, 47, 0.3)',
        })}
      >
        {loading ? (
          <Table stickyHeader height='100%'>
            <LapHeaderRow columns={tableColumns} />
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={tableColumns.length + 1}
                  align='center'
                  sx={{ border: 'none' }}
                >
                  <CircularProgress color='secondary' />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ) : laps.length > 0 ? (
          <Table
            stickyHeader
            size='small'
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
          <Table height='100%' stickyHeader>
            <LapHeaderRow columns={tableColumns} />
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={tableColumns.length + 1}
                  align='center'
                  sx={{
                    backgroundColor: alpha(theme.palette.background.paper, 0.3),
                    border: 'none',
                  }}
                >
                  <Typography variant='h5' color='secondary.main'>
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
          justifyContent: 'space-between',
          backgroundColor: alpha(theme.palette.background.paper, 0.75),
        }}
      >
        <ExitButton />
        <TablePagination
          rowsPerPageOptions={[15, 25, 100]}
          component='div'
          count={laps.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            minHeight: '3rem',
            backgroundColor: alpha(theme.palette.background.paper, 0),
            color: 'primary.main',
            '& .MuiSvgIcon-root': {
              fontSize: '1.25rem',
              color: 'primary.main',
            },
          }}
          labelRowsPerPage=''
        />
      </Box>
    </Paper>
  )
}

export default LapTable
