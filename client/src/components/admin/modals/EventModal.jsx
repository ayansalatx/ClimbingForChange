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

const AddEventModal = ({ open, onClose, onAdd }) => {
  const [eventName, setEventName] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [startDate, setStartDate] = React.useState('');
  const [startTime, setStartTime] = React.useState('');
  const [duration, setDuration] = React.useState('');
  const [lapDistance, setLapDistance] = React.useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    // To Do:
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2} sx={{ color: 'black' }}>
          Add New Event
        </Typography>

        <form onSubmit={handleAdd}>
          <TextField
            fullWidth
            label="Event Name"
            variant="outlined"
            margin="normal"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Location"
            variant="outlined"
            margin="normal"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Start Date"
            type="date"
            variant="outlined"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Start Time"
            type="time"
            variant="outlined"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Duration (minutes)"
            type="number"
            variant="outlined"
            margin="normal"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Lap Distance (meters)"
            type="number"
            variant="outlined"
            margin="normal"
            value={lapDistance}
            onChange={(e) => setLapDistance(e.target.value)}
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

export default AddEventModal;