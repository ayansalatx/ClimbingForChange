import {
  alpha,
  Box,
  CircularProgress,
  Paper,
  Table,
  TableContainer,
} from '@mui/material'
import { useEffect, useRef, useState } from 'react'

import theme from '../../../../styles/theme'
import ScrollingTableRow from './ScrollingTableRows'
import TableHeaderRow from './TableHeaderRow'

const AutoScrollTable = ({ teams, columns, loading }) => {
  const containerRef = useRef(null)
  const tableRef = useRef(null)
  const [shouldScroll, setShouldScroll] = useState(false)

  useEffect(() => {
    const checkScroll = () => {
      if (!containerRef.current || !tableRef.current) return
      const containerHeight = containerRef.current.offsetHeight
      const tableHeight = tableRef.current.offsetHeight

      setShouldScroll(tableHeight > containerHeight)
    }

    checkScroll()

    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [teams, columns])

  return (
    <Paper
      sx={{
        width: '100%',
        height: '100%',
        tableLayout: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'transparent',
        boxShadow: 'none',
      }}
    >
      <TableHeaderRow columns={columns} />
      <TableContainer
        ref={containerRef}
        sx={{
          width: '100%',
          maxHeight: '100%',
          overflowY: 'hidden',
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
          <Table ref={tableRef} aria-label="auto scrolling table" size="small">
            <ScrollingTableRow columns={columns} teams={shouldScroll ? [...teams, ...teams] : teams} shouldScroll={shouldScroll} />
          </Table>
        )}
      </TableContainer>
    </Paper>
  )
}

export default AutoScrollTable
