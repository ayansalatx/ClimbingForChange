import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon   from '@mui/icons-material/Edit'
import SearchIcon from '@mui/icons-material/Search'
import {Box,Button,Dialog,DialogActions,DialogContent,DialogTitle,IconButton,InputAdornment,InputBase,Paper,Table,TableBody,TableCell,
  TableContainer,TableHead,TableRow, TextField,Typography} from '@mui/material'
import React, { useState } from 'react'

const initialData = [
  { id: 1,  name: 'Rainier',  height: 20310 },
  { id: 2,  name: 'Everest',  height: 29029 },
  { id: 3,  name: 'Rainier',  height: 20310 },
  { id: 4,  name: 'Denali',   height: 14410 },
  { id: 5,  name: 'Rainier',  height: 20310 },
  { id: 6,  name: 'Everest',  height: 29029 },
  { id: 7,  name: 'Rainier',  height: 20310 },
  { id: 8,  name: 'Denali',   height: 14410 },
  { id: 9,  name: 'Rainier',  height: 20310 },
  { id: 10, name: 'Rainier',  height: 20310 },
  { id: 11, name: 'Denali',   height: 14410 },
  { id: 12, name: 'Denali',   height: 14410 },
  { id: 13, name: 'Everest',  height: 29029 },
  { id: 14, name: 'Rainier',  height: 20310 },
  { id: 15, name: 'Everest',  height: 29029 },
]

export default function MountainManager() {
  const [mountains, setMountains] = useState(initialData)
  const [searchTerm, setSearchTerm] = useState('')

  const [editOpen, setEditOpen] = useState(false)
  const [current, setCurrent] = useState({ id: null, name: '', height: '' })

  const [deleteOpen, setDeleteOpen] = useState(false)
  const [toDeleteId, setToDeleteId] = useState(null)

  const [addOpen, setAddOpen] = useState(false)
  const [newMountain, setNewMountain] = useState({ name: '', height: '' })

  const filtered = mountains.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const openAdd = () => {
    setNewMountain({ name: '', height: '' })
    setAddOpen(true)
  }
  const closeAdd = () => setAddOpen(false)
  const saveAdd = () => {
    const { name, height } = newMountain
    if (!name.trim()) return
    const nextId = Math.max(...mountains.map(m => m.id)) + 1
    setMountains([
      ...mountains,
      { id: nextId, name: name.trim(), height: parseInt(height, 10) || 0 }
    ])
    setAddOpen(false)
  }

  const handleDeleteClick = id => {
    setToDeleteId(id)
    setDeleteOpen(true)
  }
  const handleDeleteCancel = () => {
    setDeleteOpen(false)
    setToDeleteId(null)
  }
  const handleDeleteConfirm = () => {
    setMountains(mountains.filter(m => m.id !== toDeleteId))
    setDeleteOpen(false)
    setToDeleteId(null)
  }

  const openEdit = mountain => {
    setCurrent({ ...mountain })
    setEditOpen(true)
  }
  const closeEdit = () => setEditOpen(false)
  const saveEdit = () => {
    setMountains(mountains.map(m =>
      m.id === current.id
        ? { ...m, name: current.name.trim(), height: parseInt(current.height, 10) || m.height }
        : m
    ))
    setEditOpen(false)
  }

  return (
    <Box sx={{ pt: 10, pb: 2, width: '90vw', maxWidth: 1200, mx: 'auto', px: 3 }}>
      <Typography variant='h4' align='center' gutterBottom>
        Mountains
      </Typography>

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
                <TableCell>{m.height}</TableCell>
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
            label='Elevation (m)'
            type='number'
            value={current.height}
            onChange={e => setCurrent({ ...current, height: e.target.value })}
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
            label='Elevation (m)'
            type='number'
            value={newMountain.height}
            onChange={e => setNewMountain({ ...newMountain, height: e.target.value })}
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
