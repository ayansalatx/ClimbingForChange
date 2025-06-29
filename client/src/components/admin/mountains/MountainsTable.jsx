import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'

const MountainsTable = ({ 
  mountains, 
  searchTerm, 
  onEdit, 
  onDelete,
  loading,
  error
}) => {
  const filteredMountains = mountains.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return <Typography sx={{ textAlign: 'center', my: 3 }}>Loading mountains...</Typography>
  }

  if (error) {
    return (
      <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
        {error}
      </Typography>
    )
  }

  if (filteredMountains.length === 0) {
    return <Typography sx={{ textAlign: 'center', my: 3 }}>No mountains found</Typography>
  }

  return (
    <TableContainer component={Paper} elevation={0} sx={{ backgroundColor: '#f0f0f0' }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Mountain Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Elevation</TableCell>
            <TableCell align='center' sx={{ fontWeight: 'bold' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredMountains.map((mountain) => (
            <TableRow key={mountain.id}>
              <TableCell>{mountain.name}</TableCell>
              <TableCell>{mountain.totalElevation} {mountain.elevationUnit}</TableCell>
              <TableCell align='center'>
                <IconButton size='small' onClick={() => onEdit(mountain)}>
                  <EditIcon fontSize='small' />
                </IconButton>
                <IconButton size='small' onClick={() => onDelete(mountain.id)}>
                  <DeleteIcon fontSize='small' />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default MountainsTable
