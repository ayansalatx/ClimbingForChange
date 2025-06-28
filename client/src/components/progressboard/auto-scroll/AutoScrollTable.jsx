import {
  Paper,
  Table,
  TableContainer,
  TablePagination,
  alpha
} from '@mui/material'
import { useEffect, useRef,useState } from 'react'

import TableHeaderRow from './TableHeaderRow'
import ScrollingTableRow from './ScrollingTableRows'


const AutoScrollTable = ({ teams, columns }) => {
  const containerRef = useRef(null)
  const scrollSpeed = 0.5 // 0.5px per frame
  const [page, setPage] = useState(0)
  const rowsPerPage = 10

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  // Smooth scrolling effect - placeholder for real animation
  useEffect(() => {
    let animationFrameId

    const scrollStep = () => {
      const container = containerRef.current
      if (!container) return

      container.scrollTop += scrollSpeed

      if (
        container.scrollTop + container.clientHeight >=
        container.scrollHeight
      ) {
        container.scrollTop = 0
      }

      animationFrameId = requestAnimationFrame(scrollStep)
    }

    animationFrameId = requestAnimationFrame(scrollStep)

    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  return (
    <Paper sx={{ width: '100%', height: '100%', overflow: 'hidden', background: 'transparent' }}>
      <TableContainer ref={containerRef} sx={{width: '100%', height: '100%' }}>
        <Table stickyHeader aria-label="auto scrolling table" size='small'>
          <TableHeaderRow columns={columns} />
          <ScrollingTableRow columns={columns} teams={teams} />
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={teams.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        sx={{display: 'none'}}
      />
    </Paper>
  )
}

export default AutoScrollTable
