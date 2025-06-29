import { useCallback, useEffect, useState } from 'react'

import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputBase,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material'

import { 
  createMountain,
  deleteMountain,
  getMountains,
  updateMountain
} from '../../../services/mountainService'

export default function MountainManager() {
  const [mountains, setMountains] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [, setSnackbar] = useState({ open: false, message: '', severity: 'info' })
  const [tabValue] = useState('physical') // Add tab state
  const [editOpen, setEditOpen] = useState(false)
  const [current, setCurrent] = useState({ 
    id: null, 
    name: '', 
    totalElevation: '', 
    elevationUnit: 'FT', 
    imageURL: '' 
  })
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [toDeleteId, setToDeleteId] = useState(null)
  const [addOpen, setAddOpen] = useState(false)
  const [newMountain, setNewMountain] = useState({ 
    name: '', 
    totalElevation: '', 
    elevationUnit: 'FT', 
    imageURL: '' 
  })

  const fetchMountains = useCallback(async () => {
    try {
      setLoading(true)
      // Get all mountains and filter them on the client side
      const allMountains = await getMountains()
      
      // Filter based on the current tab
      const filteredMountains = tabValue === 'physical' 
        ? allMountains.filter(m => !m.isTargetMountain)
        : allMountains.filter(m => m.isTargetMountain)
      
      const mountainsWithIds = filteredMountains.map(mountain => ({
        ...mountain,
        id: mountain._id || mountain.id
      }))
      
      setMountains(mountainsWithIds)
      setError(null)
    } catch (err) {
      console.error('Error fetching mountains:', err)
      setError('Failed to load mountains. Please try again later.')
      setSnackbar({ 
        open: true, 
        message: 'Error loading mountains', 
        severity: 'error' 
      })
    } finally {
      setLoading(false)
    }
  }, [tabValue])

  useEffect(() => {
    fetchMountains()
  }, [fetchMountains])

  const filtered = mountains.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const openAdd = () => {
    setNewMountain({ name: '', totalElevation: '', elevationUnit: 'FT', imageURL: '' })
    setAddOpen(true)
  }

  const closeAdd = () => setAddOpen(false)

  // Removed unused closeSnackbar function

  const saveAdd = useCallback(async () => {
    try {
      const { name, totalElevation, elevationUnit, imageURL } = newMountain
      if (!name.trim()) return
      
      const mountainData = {
        name: name.trim(),
        totalElevation: parseFloat(totalElevation) || 0,
        elevationUnit,
        imageURL: imageURL || undefined,
        active: true,
        isTargetMountain: tabValue !== 'physical'
      }
      
      await createMountain(mountainData)
      
      await fetchMountains()
      setAddOpen(false)
      setSnackbar({
        open: true,
        message: 'Mountain added successfully',
        severity: 'success'
      })
    } catch (err) {
      console.error('Error adding mountain:', err)
      setError('Failed to add mountain. Please try again.')
      setSnackbar({
        open: true,
        message: 'Error adding mountain',
        severity: 'error'
      })
    }
  }, [newMountain, tabValue, fetchMountains])

  const handleDeleteClick = (id) => {
    setToDeleteId(id)
    setDeleteOpen(true)
  }

  const handleDeleteCancel = () => {
    setDeleteOpen(false)
    setToDeleteId(null)
  }
  
  const handleDeleteConfirm = useCallback(async () => {
    if (!toDeleteId) return
    
    try {
      setLoading(true)
      await deleteMountain(toDeleteId)
      
      await fetchMountains()
      setDeleteOpen(false)
      setToDeleteId(null)
      setSnackbar({
        open: true,
        message: 'Mountain deleted successfully',
        severity: 'success'
      })
    } catch (err) {
      console.error('Error deleting mountain:', err)
      setSnackbar({
        open: true,
        message: 'Error deleting mountain',
        severity: 'error'
      })
    } finally {
      setLoading(false)
    }
  }, [toDeleteId, fetchMountains])

  const openEdit = (mountain) => {
    setCurrent({
      id: mountain.id,
      name: mountain.name,
      totalElevation: mountain.totalElevation,
      elevationUnit: mountain.elevationUnit,
      imageURL: mountain.imageURL || ''
    })
    setEditOpen(true)
  }
  
  const closeEdit = () => setEditOpen(false)
  
  const saveEdit = useCallback(async () => {
    try {
      const { id, ...updateData } = current
      
      await updateMountain(id, {
        ...updateData,
        isTargetMountain: tabValue !== 'physical'
      })
      
      await fetchMountains()
      setEditOpen(false)
      setSnackbar({
        open: true,
        message: 'Mountain updated successfully',
        severity: 'success'
      })
    } catch (err) {
      console.error('Error updating mountain:', err)
      setSnackbar({
        open: true,
        message: 'Error updating mountain',
        severity: 'error'
      })
    }
  }, [current, tabValue, fetchMountains])

  return (
    <Box sx={{ pt: 16, pb: 2, width: '90vw', maxWidth: 1200, mx: 'auto', px: 3 }}>
      <Typography variant='h4' align='center' gutterBottom>
        Mountains
      </Typography>
      
      {error && (
        <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
          {error}
        </Typography>
      )}
      
      {loading && (
        <Typography sx={{ textAlign: 'center', my: 3 }}>Loading mountains...</Typography>
      )}

      {/* Search + Add Mountain */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ mr: 1, fontWeight: 500 }}>Search</Typography>
          <InputBase
            placeholder='Search for a mountain…'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            startAdornment={
              <InputAdornment position='start'>
                <SearchIcon fontSize='small' />
              </InputAdornment>
            }
            sx={{
              backgroundColor: '#f0f0f0',
              borderRadius: 1,
              px: 1,
              height: 32,
              width: 300
            }}
          />
        </Box>

        <Button variant='contained' startIcon={<AddIcon />} onClick={openAdd}>
          Add Mountain
        </Button>
      </Box>

      {/* Table */}
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
            {filtered.map(m => (
              <TableRow key={m.id}>
                <TableCell>{m.name}</TableCell>
                <TableCell>{m.totalElevation} {m.elevationUnit}</TableCell>
                <TableCell align='center'>
                  <IconButton size='small' onClick={() => openEdit(m)}>
                    <EditIcon fontSize='small' />
                  </IconButton>
                  <IconButton size='small' onClick={() => handleDeleteClick(m.id)}>
                    <DeleteIcon fontSize='small' />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


      <Dialog open={editOpen} onClose={closeEdit}>
        <DialogTitle>Edit Mountain</DialogTitle>
        <DialogContent dividers>
          <TextField
            fullWidth
            label='Mountain Name'
            value={current.name}
            onChange={e => setCurrent({ ...current, name: e.target.value })}
            margin='dense'
          />
          <TextField
            fullWidth
            label='Elevation'
            type='number'
            value={current.totalElevation}
            onChange={e => setCurrent({ ...current, totalElevation: e.target.value })}
            margin='dense'
          />
          <FormControl fullWidth margin='dense'>
            <InputLabel>Unit</InputLabel>
            <Select
              value={current.elevationUnit}
              label='Unit'
              onChange={e => setCurrent({ ...current, elevationUnit: e.target.value })}
            >
              <MenuItem value='FT'>Feet</MenuItem>
              <MenuItem value='M'>Meters</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label='Image URL'
            value={current.imageURL}
            onChange={e => setCurrent({ ...current, imageURL: e.target.value })}
            margin='dense'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEdit}>Cancel</Button>
          <Button variant='contained' onClick={saveEdit}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Mountain?</DialogTitle>
        <DialogContent dividers>
          <Typography>
            Are you sure you want to delete this mountain?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button color='error' variant='contained' onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={addOpen} onClose={closeAdd}>
        <DialogTitle>Add Mountain</DialogTitle>
        <DialogContent dividers>
          <TextField
            fullWidth
            label='Mountain Name'
            value={newMountain.name}
            onChange={e => setNewMountain({ ...newMountain, name: e.target.value })}
            margin='dense'
          />
          <TextField
            fullWidth
            label='Elevation'
            type='number'
            value={newMountain.totalElevation}
            onChange={e => setNewMountain({ ...newMountain, totalElevation: e.target.value })}
            margin='dense'
          />
          <FormControl fullWidth margin='dense'>
            <InputLabel>Unit</InputLabel>
            <Select
              value={newMountain.elevationUnit}
              label='Unit'
              onChange={e => setNewMountain({ ...newMountain, elevationUnit: e.target.value })}
            >
              <MenuItem value='FT'>Feet</MenuItem>
              <MenuItem value='M'>Meters</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label='Image URL'
            value={newMountain.imageURL}
            onChange={e => setNewMountain({ ...newMountain, imageURL: e.target.value })}
            margin='dense'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAdd}>Cancel</Button>
          <Button variant='contained' onClick={saveAdd}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
