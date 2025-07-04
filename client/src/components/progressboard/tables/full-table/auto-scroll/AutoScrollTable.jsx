import {
  alpha,
  Box,
  CircularProgress,
  Paper,
  Table,
  TableContainer,
} from '@mui/material'

import theme from '../../../../../styles/theme'
import ScrollingTableRow from './ScrollingTableRows'
import TableHeaderRow from './TableHeaderRow'

const AutoScrollTable = ({ teams, columns, loading }) => {
  const dblTeams = [...teams, ...teams]

  return (
    <Paper
      sx={{
        width: '100%',
        tableLayout: 'fixed',
        backgroundColor: 'transparent',
        boxShadow: 'none'
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
              width: '100%',
              display: 'flex',
              flexGrow: 1,
              alignItems: 'center',
              justifyContent: 'center',
              background: `linear-gradient(to right, ${alpha(theme.palette.primary.main, 0.8)}, ${alpha(theme.palette.primary.main, 0.3)}, ${alpha(theme.palette.primary.main, 0.8)})`,
              fontSize: '2rem',
            }}
          >
            <CircularProgress color="secondary" />
          </Box>
        ) : (
          <Table aria-label="auto scrolling table" size="small">
            <ScrollingTableRow columns={columns} teams={dblTeams} />
          </Table>
        )}
      </TableContainer>
    </Paper>
  )
}

export default AutoScrollTable
