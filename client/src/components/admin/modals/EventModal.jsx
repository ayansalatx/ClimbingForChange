import { Box, Button, Checkbox, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

import TextInput from '../forms/fields/TextInput'

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
const parseMountainNames = (mountains) => {
  if (typeof mountains === 'string') {
    return mountains.split(',').map((s) => s.trim())
  }
  if (Array.isArray(mountains)) {
    return mountains
  }
  return []
}

const getMountainIdsByName = (mountainNames, mountains) => {
  return mountainNames
    .map((name) => mountains.find((m) => m.name === name)?.id)
    .filter((id) => id !== undefined)
}

const AddEventModal = ({ open, onClose, onAdd, onEdit, onLocation, onMountains, eventToEdit }) => {
  const [eventName, setEventName] = useState('')
  const [location, setLocation] = useState('')
  const [locations, setLocations] = useState([])
  const [startDate, setStartDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [duration, setDuration] = useState('')
  const [mountains, setMountains] = useState([])
  const [mountainSelection, setMountainSelection] = useState([])

  const onModalClose = () => {
    onClose()
    setEventName('')
    setLocation('')
    setStartDate('')
    setStartTime('')
    setDuration('')
    setMountainSelection([])
  }

  useEffect(() => {
    setLocations(onLocation || [])
  }, [onLocation])

  useEffect(() => {
    setMountains(onMountains || [])
  }, [onMountains])

  useEffect(() => {
    if (eventToEdit) {
      setEventName(eventToEdit.name || '')
      setLocation(eventToEdit.locationId || '')
      const start = new Date(eventToEdit.startDateTime)
      setStartDate(start.toISOString().slice(0, 10))
      setStartTime(start.toTimeString().slice(0, 5))
      const durationHours = (new Date(eventToEdit.endDateTime) - start) / 3600000
      setDuration(durationHours)
      const mountainNames = parseMountainNames(eventToEdit.mountains)
      const selectedMountains = getMountainIdsByName(mountainNames, mountains)
      setMountainSelection(selectedMountains)
    } else {
      setMountainSelection([])
    }
  }, [eventToEdit, mountains])

  const handleAdd = async (e) => {
    e.preventDefault()

    const selectedLocation = locations.find((loc) => loc.id === location)
    const start = new Date(`${startDate}T${startTime}`)
    const end = new Date(start.getTime() + Number(duration) * 3600000)
    const eventData = {
      name: eventName,
      location: selectedLocation?.id || null,
      mountains: mountainSelection,
      startDateTime: start.toISOString(),
      endDateTime: end.toISOString(),
      hill: [],
      active: true,
    }

    if (eventToEdit) {
      await onEdit(eventToEdit.id, eventData)
    } else {
      await onAdd(eventData)
    }

    onModalClose()
  }

  const handleMountainChange = (e) => {
    const value = e.target.value
    if (typeof value === 'string') {
      setMountainSelection(value.split(','))
    } else {
      setMountainSelection(value)
    }
  }

  const getMountainNames = (selected) => {
    const names = selected.map((id) => {
      const mountain = mountains.find((m) => m.id === id)
      return mountain ? mountain.name : id
    })
    return names.join(', ')
  }
  
  return (
    <Modal open={open} onClose={onModalClose}>
      <Box sx={style}>
        <Typography variant='h6' mb={2} sx={{ color: 'black' }}>
          {eventToEdit ? 'Edit Event' : 'Add New Event'}
        </Typography>
        <form onSubmit={handleAdd}>
          <TextInput
            fullWidth
            label='Event Name'
            margin='normal'
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />

          <FormControl fullWidth margin='normal'>
            <InputLabel id='location-select-label'>Location</InputLabel>
            <Select
              labelId='location-select-label'
              id='location-select'
              value={location}
              label='Location'
              onChange={(e) => setLocation(e.target.value)}
              required
            >
              {locations.map((loc) => (
                <MenuItem value={loc.id} key={loc.id}>
                  {loc.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin='normal'>
            <InputLabel id='mountain-select-label'>Mountains</InputLabel>
            <Select
              labelId='mountain-select-label'
              id='mountain-select'
              multiple
              value={mountainSelection}
              onChange={handleMountainChange}
              label='Mountains'
              renderValue={getMountainNames}
            >
              {mountains.map((mountain) => (
                <MenuItem key={mountain.id} value={mountain.id}>
                  <Checkbox checked={mountainSelection.indexOf(mountain.id) > -1} />
                  {mountain.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label='Start Date'
            type='date'
            variant='outlined'
            margin='normal'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
          />

          <TextField
            fullWidth
            label='Start Time'
            type='time'
            variant='outlined'
            margin='normal'
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
          />

          <TextInput
            fullWidth
            label='Duration (hours)'
            type='number'
            margin='normal'
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />

          <Box mt={3} display='flex' justifyContent='space-between' gap={2}>
            <Button variant='outlined' onClick={onModalClose}>
              Cancel
            </Button>
            <Button type='submit' variant='contained'>
              {eventToEdit ? 'Save' : 'Create'}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  )
}

export default AddEventModal
