import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  InputBase,
  Typography,
} from '@mui/material'
import { useCallback, useEffect, useState } from 'react'

import MountainModal from '../../../components/admin/modals/MountainModal'
import MountainsTable from '../../../components/admin/mountains/MountainsTable'
import {
  createMountain,
  deleteMountain,
  getMountains,
  updateMountain,
} from '../../../services/mountainService'

export default function MountainManager() {
  const [mountains, setMountains] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  })
  const [editOpen, setEditOpen] = useState(false)
  const [currentMountain, setCurrentMountain] = useState(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [toDeleteId, setToDeleteId] = useState(null)

  const fetchMountains = useCallback(async () => {
    try {
      setLoading(true)
      const allMountains = await getMountains()

      const mountainsWithIds = allMountains.map((mountain) => ({
        ...mountain,
        id: mountain._id || mountain.id,
      }))

      setMountains(mountainsWithIds)
      setError(null)
    } catch (err) {
      console.error('Error fetching mountains:', err)
      setError('Failed to load mountains. Please try again later.')
      setSnackbar({
        open: true,
        message: 'Error loading mountains',
        severity: 'error',
      })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMountains()
  }, [fetchMountains])

  const filtered = mountains.filter((m) =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const openAdd = () => {
    setCurrentMountain(null)
    setEditOpen(true)
  }
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
        severity: 'success',
      })
    } catch (err) {
      console.error('Error deleting mountain:', err)
      setSnackbar({
        open: true,
        message: 'Error deleting mountain',
        severity: 'error',
      })
    } finally {
      setLoading(false)
    }
  }, [toDeleteId, fetchMountains])

  const openEdit = (mountain) => {
    setCurrentMountain(mountain)
    setEditOpen(true)
  }


  const handleSaveMountain = useCallback(
    async (mountainData) => {
      try {
        if (currentMountain) {
          // Update existing mountain
          await updateMountain(currentMountain.id, mountainData)
          setSnackbar({
            open: true,
            message: 'Mountain updated successfully',
            severity: 'success',
          })
        } else {
          // Create new mountain
          await createMountain(mountainData)
          setSnackbar({
            open: true,
            message: 'Mountain added successfully',
            severity: 'success',
          })
        }

        await fetchMountains()
        setEditOpen(false)
        setCurrentMountain(null)
      } catch (err) {
        console.error('Error saving mountain:', err)
        setSnackbar({
          open: true,
          message: `Error ${currentMountain ? 'updating' : 'adding'} mountain`,
          severity: 'error',
        })
      }
    },
    [currentMountain, fetchMountains]
  )

  return (
    <Box
      sx={{ pt: 16, pb: 2, width: '90vw', maxWidth: 1200, mx: 'auto', px: 3 }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Mountains
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
          {error}
        </Typography>
      )}

      {loading && (
        <Typography sx={{ textAlign: 'center', my: 3 }}>
          Loading mountains...
        </Typography>
      )}

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ mr: 1, fontWeight: 500 }}>Search</Typography>
          <InputBase
            placeholder="Search for a mountain…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            }
            sx={{
              backgroundColor: '#f0f0f0',
              borderRadius: 1,
              px: 1,
              height: 32,
              width: 300,
            }}
          />
        </Box>

        <Button variant="contained" startIcon={<AddIcon />} onClick={openAdd}>
          Add Mountain
        </Button>
      </Box>

      <MountainsTable
        mountains={filtered}
        searchTerm={searchTerm}
        onEdit={openEdit}
        onDelete={handleDeleteClick}
        loading={loading}
        error={error}
      />

      <MountainModal
        open={editOpen}
        onClose={() => {
          setEditOpen(false)
          setCurrentMountain(null)
        }}
        onSave={handleSaveMountain}
        mountainData={currentMountain}
      />

      <Dialog open={deleteOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Mountain?</DialogTitle>
        <DialogContent dividers>
          <Typography>
            Are you sure you want to delete this mountain?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleDeleteConfirm}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
