import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

const UploadPreviewTable = ({ rows }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ overflowY: 'auto' }}
    >
      <Table size='small' stickyHeader>
        <TableHead>
          <TableRow
            sx={{
              '& th': {
                backgroundColor: 'primary.light', // MUI blue
                color: 'background.paper', // white text
              },
            }}
          >
            <TableCell>Participant ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Sub Event</TableCell>
            <TableCell>Team Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.participantId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.participantId}
              </TableCell>
              <TableCell>{row.firstName}</TableCell>
              <TableCell>{row.lastName}</TableCell>
              <TableCell>{row.subEvent}</TableCell>
              <TableCell>{row.teamName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UploadPreviewTable
