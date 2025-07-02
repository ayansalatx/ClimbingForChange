import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

// Mock data - Replace with actual API calls
const mockRFIDData = [
  { id: 1, tagId: 'E2:4F:3A:7B', status: 'Active', lastScanned: '2025-07-02T10:30:00Z' },
  { id: 2, tagId: 'A1:B2:C3:D4', status: 'Inactive', lastScanned: '2025-07-01T15:45:00Z' },
];

const RFIDManager = () => {
  const theme = useTheme();
  const [rfidData, setRfidData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingRfid, setEditingRfid] = useState(null);
  const [formData, setFormData] = useState({
    tagId: '',
    status: 'Active',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // Fetch RFID data
  const fetchRFIDData = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const response = await fetch('/api/rfid');
      // const data = await response.json();
      setRfidData(mockRFIDData);
    } catch (err) {
      setError('Failed to fetch RFID data');
      console.error('Error fetching RFID data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRFIDData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Replace with actual API call
      // const method = editingRfid ? 'PUT' : 'POST';
      // const url = editingRfid ? `/api/rfid/${editingRfid.id}` : '/api/rfid';
      
      // const response = await fetch(url, {
      //   method,
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      
      // const data = await response.json();
      
      setSnackbar({
        open: true,
        message: editingRfid ? 'RFID tag updated successfully' : 'RFID tag added successfully',
        severity: 'success',
      });
      
      setOpenDialog(false);
      fetchRFIDData();
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Error saving RFID tag',
        severity: 'error',
      });
      console.error('Error saving RFID tag:', err);
    }
  };

  const handleEdit = (rfid) => {
    setEditingRfid(rfid);
    setFormData({
      tagId: rfid.tagId,
      status: rfid.status,
    });
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this RFID tag?')) {
      try {
        // TODO: Replace with actual API call
        // await fetch(`/api/rfid/${id}`, { method: 'DELETE' });
        setSnackbar({
          open: true,
          message: 'RFID tag deleted successfully',
          severity: 'success',
        });
        fetchRFIDData();
      } catch (err) {
        setSnackbar({
          open: true,
          message: 'Error deleting RFID tag',
          severity: 'error',
        });
        console.error('Error deleting RFID tag:', err);
      }
    }
  };

  const handleRefresh = () => {
    fetchRFIDData();  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingRfid(null);
    setFormData({ tagId: '', status: 'Active' });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString();
  };

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
                    <TableCell>Tag ID</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Last Scanned</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rfidData.map((rfid) => (
                    <TableRow key={rfid.id}>
                      <TableCell>{rfid.tagId}</TableCell>
                      <TableCell>
                        <Box
                          component="span"
                          sx={{
                            display: 'inline-block',
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            bgcolor: rfid.status === 'Active' ? 'success.main' : 'error.main',
                            mr: 1,
                          }}
                        />
                        {rfid.status}
                      </TableCell>
                      <TableCell>{formatDate(rfid.lastScanned)}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleEdit(rfid)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(rfid.id)}
                        >
                          <DeleteIcon fontSize="small" />
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
              id="tagId"
              name="tagId"
              label="RFID Tag ID"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.tagId}
              onChange={handleInputChange}
              required
              sx={{ mb: 2 }}
            />
            
            <TextField
              select
              margin="dense"
              id="status"
              name="status"
              label="Status"
              fullWidth
              variant="outlined"
              value={formData.status}
              onChange={handleInputChange}
              SelectProps={{ native: true }}
              required
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Lost">Lost</option>
              <option value="Damaged">Damaged</option>
            </TextField>
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

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RFIDManager;
