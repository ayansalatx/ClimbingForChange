import { Box, Button, FormControl, InputLabel, MenuItem,Modal, Select, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { editEvent, addEvent } from '../../../services/eventService.js'



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

const AddEventModal = ({ open, onClose, onAdd, onEditComplete ,onLocation, eventToEdit }) => {
  const [eventName, setEventName] = useState('')
  const [location, setLocation] = useState('')
  const [locations, setLocations] = useState([])  
  const [startDate, setStartDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [duration, setDuration] = useState('')
  const [lapDistance, setLapDistance] = useState('')

  const onModalClose = () => {
    onClose()
    setEventName('')
    setLocation('')
    setStartDate('')
    setStartTime('')
    setDuration('')
    setLapDistance('')
  }

  useEffect(() => {
    setLocations(onLocation)
  }, [onLocation])

   
  useEffect(() => {
    if (eventToEdit) {
      setEventName(eventToEdit.name || '')
      setLocation(eventToEdit.locationId?.id || '')
      const start = new Date(eventToEdit.startDateTime)
      setStartDate(start.toISOString().slice(0, 10))
      setStartTime(start.toTimeString().slice(0, 5))
      const duration = (new Date(eventToEdit.endDateTime) - start) / 60000
      setDuration(duration)
      setLapDistance(eventToEdit.physicalMountainIds?.length || '')
    }
  }, [eventToEdit])

  const handleAdd = async (e) => {
    e.preventDefault()

    const selectedLocation = locations.find((loc) => loc.id === location)
    const start = new Date(`${startDate}T${startTime}`)
    const end = new Date(start.getTime() + Number(duration) * 60000)

    const eventData = {
      name: eventName,
      locationId: selectedLocation.id,
      startDateTime: start.toISOString(),
      endDateTime: end.toISOString(),
      physicalMountainIds: [], 
      active: true,
    }

    try {
      if (eventToEdit) {
        await editEvent(eventToEdit.id, eventData)
        onEditComplete?.()
      } else {
        onAdd(eventData)
      }
    } catch (error) {
      console.error('Error saving event:', error)
    }

    onModalClose()
  }

  return (
    <Modal open={open} onClose={onModalClose}>
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

              {locations.map((location) => <MenuItem value={location.id} key={location.id}> {location.name} </MenuItem> )}
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
            label="Lap Distance (ft)"
            type="number"
            variant="outlined"
            margin="normal"
            value={lapDistance}
            onChange={(e) => setLapDistance(e.target.value)}
            required
          />

          <Box mt={3} display="flex" justifyContent="space-between" gap={2}>
            <Button variant="outlined" onClick={onModalClose}>
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
