import React from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const AddMountainModal = ({ open, onClose, onAdd }) => {
  const [mountainName, setMountainName] = React.useState('');
  const [elevation, setElevation] = React.useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    const newMountain = {
      mountainName,
      elevation: parseInt(elevation, 10)
    };
    onAdd(newMountain);
    setMountainName('');
    setElevation('');
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2} sx={{ color: 'black' }}>
          Add New Mountain
        </Typography>

        <form onSubmit={handleAdd}>
          <TextField
            fullWidth
            label="Mountain Name"
            variant="outlined"
            margin="normal"
            value={mountainName}
            onChange={(e) => setMountainName(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Elevation"
            type="number"
            variant="outlined"
            margin="normal"
            value={elevation}
            onChange={(e) => setElevation(e.target.value)}
            required
          />

          <Box mt={3} display="flex" justifyContent="space-between" gap={2}>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Add
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddMountainModal;