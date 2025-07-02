import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import React, { useEffect,useState } from 'react'

import { useAlert } from '../../../hooks/useAlert'
import {
  createRfidTag,
  deleteRfidTag,
  getRfidTags,
  updateRfidTag,
} from '../../../services/rfidService'

const RFIDManager = () => {
  const [rfidData, setRfidData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [editingRfid, setEditingRfid] = useState(null)
  const [formData, setFormData] = useState({
    serialNumber: '',
  })
  const displayAlert = useAlert()

  // Fetch RFID data
  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      const tags = await getRfidTags()
      const processedTags = tags.map(tag => ({
        id: tag._id || tag.id,
        serialNumber: tag.serialNumber,
        createdAt: new Date(tag.createdAt).toLocaleString(),
        updatedAt: new Date(tag.updatedAt).toLocaleString(),
      }))
      setRfidData(processedTags)
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to load RFID tags'
      setError(errorMessage)
      displayAlert('Error', errorMessage, 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async (tagData) => {
    try {
      const tagPayload = {
        serialNumber: tagData.serialNumber.trim(),
      }

      if (editingRfid) {
        await updateRfidTag(editingRfid.id, tagPayload)
        displayAlert('Success', 'RFID tag updated successfully', 'success')
      } else {
        await createRfidTag(tagPayload)
        displayAlert('Success', 'RFID tag created successfully', 'success')
      }
      
      handleCloseDialog()
      loadData()
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to save RFID tag'
      displayAlert('Error', errorMessage, 'error')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSave(formData)
  }

  const handleEdit = (rfid) => {
    setEditingRfid(rfid)
    setFormData({
      serialNumber: rfid.serialNumber,
    })
    setOpenDialog(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this RFID tag?')) {
      try {
        await deleteRfidTag(id)
        displayAlert('Success', 'RFID tag deleted successfully', 'success')
        loadData()
      } catch (error) {
        displayAlert(
          'Error',
          error.response?.data?.message || 'Failed to delete RFID tag',
          'error'
        )
      }
    }
  }

  const handleRefresh = () => {
    loadData()
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setEditingRfid(null)
    setFormData({ serialNumber: '' })
  }


  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h4" component="h1" gutterBottom>
              RFID Management
            </Typography>
            <Typography color="textSecondary" variant="subtitle1">
              Manage RFID tags and their status
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setOpenDialog(true)}
              sx={{ mr: 1 }}
            >
              Add RFID Tag
            </Button>
            <IconButton
              color="primary"
              onClick={handleRefresh}
              disabled={loading}
            >
              <RefreshIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>

      <Card>
        <CardContent>
          {loading ? (
            <Box display="flex" justifyContent="center" p={4}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Serial Number</strong></TableCell>
                    <TableCell><strong>Created At</strong></TableCell>
                    <TableCell><strong>Last Updated</strong></TableCell>
                    <TableCell align="right"><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rfidData.map((rfid) => (
                    <TableRow key={rfid.id}>
                      <TableCell>{rfid.serialNumber}</TableCell>
                      <TableCell>{rfid.createdAt}</TableCell>
                      <TableCell>{rfid.updatedAt}</TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => handleEdit(rfid)} size="small">
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(rfid.id)} size="small" color="error">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            {editingRfid ? 'Edit RFID Tag' : 'Add New RFID Tag'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>
              {editingRfid
                ? 'Update the RFID tag information.'
                : 'Enter the details for the new RFID tag.'}
            </DialogContentText>
            
            <TextField
              autoFocus
              margin="dense"
              id="serialNumber"
              name="serialNumber"
              label="RFID Serial Number"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.serialNumber}
              onChange={handleInputChange}
              required
              sx={{ mb: 2 }}
              helperText="Enter the unique serial number of the RFID tag"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="inherit">
              Cancel
            </Button>
            <Button type="submit" color="primary" variant="contained">
              {editingRfid ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>


    </Container>
  )
}

export default RFIDManager