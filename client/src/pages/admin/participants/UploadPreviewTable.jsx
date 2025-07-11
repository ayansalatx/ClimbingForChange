import { Box, Table, TableCell, TableBody, TableContainer, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

import { useAlert } from '../../../hooks/useAlert.js'

const UploadPreviewTable = ({ rows }) => {
  const [loading, setLoading] = useState(true)
  const [locations, setLocations] = useState([])
  const [showInactive, setShowInactive] = useState(false)
  const [currentLocation, setCurrentLocation] = useState(null)
  const [popupOpen, setPopupOpen] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [deletedLocation, setDeleteLocation] = useState(null)

  const displayAlert = useAlert()

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: '4rem',
        px: '1.5rem',
      }}
    >
      {rows.length > 0 ? (
        <TableContainer
          component={Paper}
          sx={{ margin: '1rem 0', height: '60%', overflowY: 'scroll' }}
        >
          <Table sx={{ minWidth: 650 }} stickyHeader>
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
      ) : (
        <Typography variant="h5" mt="5rem">
          Please select CSV to view data.
        </Typography>
      )}
    </Box>
  )
}

export default UploadPreviewTable
