import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'

import CancelButton from '../buttons/CancelButton'
import DeactivateToggle from '../buttons/DeactivateToggle'
import SaveButton from '../buttons/SaveButton'
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

const parseHillNames = (hills) => {
  if (typeof hills === 'string') {
    return hills.split(',').map((s) => s.trim())
  }
  if (Array.isArray(hills)) {
    return hills
  }
  return []
}

const getHillIdsByName = (hillNames, hillsList) => {
  return hillNames
    .map((name) => hillsList.find((h) => h.name === name)?.id)
    .filter((id) => id !== undefined)
}

const AddEventModal = ({
  open,
  onClose,
  onAdd,
  onEdit,
  onLocation,
  onMountains,
  onHills,
  eventToEdit,
}) => {
  const [eventName, setEventName] = useState('')
  const [location, setLocation] = useState('')
  const [locations, setLocations] = useState([])
  const [startDate, setStartDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [duration, setDuration] = useState('')
  const [mountains, setMountains] = useState([])
  const [mountainSelection, setMountainSelection] = useState([])
  const [hills, setHills] = useState([])
  const [hillSelection, setHillSelection] = useState([])
  const [filteredHills, setFilteredHills] = useState([])
  const [isActive, setIsActive] = useState(true)

  const isPastEvent = eventToEdit
    ? new Date(eventToEdit.startDateTime) < new Date()
    : false

  const onModalClose = () => {
    onClose()
    setEventName('')
    setLocation('')
    setStartDate('')
    setStartTime('')
    setDuration('')
    setMountainSelection([])
    setHillSelection([])
    setFilteredHills([])
  }

  useEffect(() => {
    setLocations(onLocation || [])
  }, [onLocation])

  useEffect(() => {
    setMountains(onMountains || [])
  }, [onMountains])

  useEffect(() => {
    setHills(onHills || [])
  }, [onHills])

  useEffect(() => {
    if (!location) {
      setFilteredHills([])
      setHillSelection([])
      return
    }

    const filtered = hills.filter(
      (hill) => String(hill.location) === String(location)
    )
    setFilteredHills(filtered)

    setHillSelection((prevSelection) =>
      prevSelection.filter((id) => filtered.some((hill) => hill.id === id))
    )
  }, [location, hills])

  useEffect(() => {
    if (eventToEdit) {
      setEventName(eventToEdit.name || '')
      setLocation(eventToEdit.locationId || '')
      const start = new Date(eventToEdit.startDateTime)
      setStartDate(start.toISOString().slice(0, 10))
      setStartTime(start.toTimeString().slice(0, 5))
      const durationHours
        = (new Date(eventToEdit.endDateTime) - start) / 3600000
      setDuration(durationHours)

      const mountainNames = parseMountainNames(eventToEdit.mountains)
      const selectedMountains = getMountainIdsByName(mountainNames, mountains)
      setMountainSelection(selectedMountains)

      const hillNames = parseHillNames(eventToEdit.hills)
      const selectedHills = getHillIdsByName(hillNames, hills)
      setHillSelection(selectedHills)

      setIsActive(eventToEdit.active)
    }
    else {
      setIsActive(true)
      setMountainSelection([])
      setHillSelection([])
    }
  }, [eventToEdit, mountains, hills])

  const handleDateChange = (e) => {
    const value = e.target.value
    //  date 4 digits
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (value === '' || dateRegex.test(value)) {
      setStartDate(value)
    }
  }

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
      hills: hillSelection,
      active: isActive,
    }

    if (eventToEdit) {
      await onEdit(eventToEdit.id, eventData)
    }
    else {
      await onAdd(eventData)
    }

    onModalClose()
  }

  const handleMountainChange = (e) => {
    const value = e.target.value
    if (typeof value === 'string') {
      setMountainSelection(value.split(','))
    }
    else {
      setMountainSelection(value)
    }
  }
  const handleHillChange = (e) => {
    const value = e.target.value
    if (typeof value === 'string') {
      setHillSelection(value.split(','))
    }
    else {
      setHillSelection(value)
    }
  }

  const getMountainNames = (selected) => {
    const names = selected.map((id) => {
      const mountain = mountains.find((m) => m.id === id)
      return mountain ? mountain.name : id
    })
    return names.join(', ')
  }

  const getHillNames = (selected) => {
    return selected
      .map((id) => hills.find((h) => h.id === id)?.name || id)
      .join(', ')
  }

  return (
    <Modal open={open} onClose={onModalClose}>
      <Box sx={style}>
        <Box
          mb={1}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6" sx={{ color: 'black' }}>
            {eventToEdit ? 'Edit Event' : 'Add New Event'}
          </Typography>
          {eventToEdit && (
            <FormControl>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography>Active</Typography>
                <DeactivateToggle
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  disabled={isPastEvent}
                />
              </Box>
            </FormControl>
          )}
        </Box>
        {isPastEvent && (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="caption" color="error">
              This event is in the past and cannot be activated or deactivated.
            </Typography>
          </Box>
        )}
        <form onSubmit={handleAdd}>
          <TextInput
            fullWidth
            label="Event Name"
            margin="normal"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="location-select-label">Location</InputLabel>
            <Select
              labelId="location-select-label"
              id="location-select"
              value={location}
              label="Location"
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

          <FormControl fullWidth margin="normal">
            <InputLabel id="hill-select-label">Hills</InputLabel>
            <Select
              labelId="hill-select-label"
              id="hill-select"
              multiple
              value={hillSelection}
              onChange={handleHillChange}
              label="Hills"
              renderValue={getHillNames}
            >
              {filteredHills.map((hill) => (
                <MenuItem key={hill.id} value={hill.id}>
                  <Checkbox checked={hillSelection.includes(hill.id)} />
                  {hill.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel id="mountain-select-label">Mountains</InputLabel>
            <Select
              labelId="mountain-select-label"
              id="mountain-select"
              multiple
              value={mountainSelection}
              onChange={handleMountainChange}
              label="Mountains"
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
            label="Start Date"
            type="date"
            variant="outlined"
            margin="normal"
            value={startDate}
            onChange={handleDateChange}
            InputLabelProps={{ shrink: true }}
            inputProps={{
              min: '1900-01-01',
              max: '2099-12-31',
              pattern: '\\d{4}-\\d{2}-\\d{2}',
            }}
            required
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
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

            <TextInput
              fullWidth
              label="Duration (hours)"
              type="number"
              margin="normal"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </Box>

          <Box mt={3} display="flex" justifyContent="space-between" gap={2}>
            <CancelButton onClick={onModalClose} color="red" />
            <SaveButton type="submit" label={eventToEdit ? 'Save' : 'Create'} />
          </Box>
        </form>
      </Box>
    </Modal>
  )
}

export default AddEventModal
