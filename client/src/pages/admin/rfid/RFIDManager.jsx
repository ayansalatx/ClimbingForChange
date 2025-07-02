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
import { useAlert } from '../../../hooks/useAlert';
import {
  getRfidTags,
  createRfidTag,
  updateRfidTag,
  deleteRfidTag,
} from '../../../services/rfidService';

const RFIDManager = () => {
  const theme = useTheme();
  const [rfidData, setRfidData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingRfid, setEditingRfid] = useState(null);
  const [formData, setFormData] = useState({
    tagId: '',
    status: 'Active',
  });
  const displayAlert = useAlert();

  // Fetch RFID data
  const loadData = async () => {
    try {
      setLoading(true);
      const tags = await getRfidTags();
      const processedTags = tags.map(tag => ({
        id: tag._id || tag.id,
        tagId: tag.serialNumber,
        status: tag.status || 'Active',
        lastScanned: tag.lastScanned || null,
      }));
      setRfidData(processedTags);
    } catch (error) {
      displayAlert(
        'Error',
        `Failed to load RFID tags: ${error.message}`,
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async (tagData) => {
    try {
      if (editingRfid && editingRfid.id) {
        await updateRfidTag(editingRfid.id, tagData);
        displayAlert('Success', 'RFID tag updated successfully', 'success');
      } else {
        await createRfidTag(tagData);
        displayAlert('Success', 'RFID tag added successfully', 'success');
      }
      
      setOpenDialog(false);
      loadData();
    } catch (error) {
      displayAlert(
        'Error',
        error.response?.data?.message || 'Failed to save RFID tag',
        'error'
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(formData);
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
        await deleteRfidTag(id);
        displayAlert('Success', 'RFID tag deleted successfully', 'success');
        loadData();
      } catch (error) {
        displayAlert(
          'Error',
          error.response?.data?.message || 'Failed to delete RFID tag',
          'error'
        );
      }
    }
  };

  const handleRefresh = () => {
    loadData();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingRfid(null);
    setFormData({ tagId: '', status: 'Active' });
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


    </Container>
  );
};

export default RFIDManager;
