import React from 'react';
import { Modal, Box, Typography, TextField, InputAdornment } from '@mui/material';
import CancelButton from '../buttons/CancelButton';
import CreateButton from '../buttons/CreateButton';

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

const AddLocationModal = ({ open, onClose, onAdd }) => {
  const [locationName, setLocationName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [city, setCity] = React.useState('');
  const [province, setProvince] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [lap, setLap] = React.useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    const locationData = {
      locationName,
      address,
      city,
      province,
      country,
      lap,
    };
    onAdd(locationData);
    onClose();

    // Clear the form fields
    setLocationName('');
    setAddress('');
    setCity('');
    setProvince('');
    setCountry('');
    setLap('');
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2} sx={{ color: 'black' }}>
          Add New Location
        </Typography>

        <form onSubmit={handleAdd}>
          <TextField
            fullWidth
            label="Location Name"
            variant="outlined"
            margin="normal"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Address"
            variant="outlined"
            margin="normal"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="City"
            variant="outlined"
            margin="normal"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Province"
            variant="outlined"
            margin="normal"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Country"
            variant="outlined"
            margin="normal"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Lap Distance"
            variant="outlined"
            margin="normal"
            type="number"
            value={lap}
            onChange={(e) => setLap(e.target.value)}
            required
            InputProps={{
              endAdornment: <InputAdornment position="end">ft</InputAdornment>,
            }}
            inputProps={{
              min: 0,
              step: 1,
            }}
          />
          <Box mt={3} display="flex" justifyContent="space-between" gap={2}>
            <CancelButton onClick={onClose} />
            <CreateButton type="submit" label="Create" />
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddLocationModal;
