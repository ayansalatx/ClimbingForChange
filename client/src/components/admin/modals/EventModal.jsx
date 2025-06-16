import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

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
}

const AddEventModal = ({ open, onClose, onAdd, onLocation }) => {
  const [eventName, setEventName] = useState('')
  const [location, setLocation] = useState('')
  const [startDate, setStartDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [duration, setDuration] = useState('')
  const [lapDistance, setLapDistance] = useState('')

  useEffect(() => {
      console.log("Location in event-modal updated");
      setLocations(onLocation);
    }, [onLocation])

  const handleAdd = (e) => {
    e.preventDefault()

    const eventData = {
      eventName,
      location,
      start: `${startDate} ${startTime}`,
      end: '', 
      duration,
      lap: lapDistance,
      active: true,
    }

    onAdd(eventData, setLocations) 
    onClose() 

  
    setEventName('')
    setLocation('')
    setStartDate('')
    setStartTime('')
    setDuration('')
    setLapDistance('')
  }

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
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Location</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={location}
              label="Location"
              onChange={(e) => setLocation(e.target.value)}
            >
              {locations.map((location) => <MenuItem value={location.id}> {location.name} </MenuItem> )}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Start Date"
            type="date"
            variant="outlined"
            margin="normal"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            fullWidth
            label="Start Time"
            type="time"
            variant="outlined"
            margin="normal"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
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
  )
}

export default AddEventModal
