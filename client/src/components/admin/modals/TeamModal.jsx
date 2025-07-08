import {Box, Button, Checkbox, FormControl,FormControlLabel, InputLabel, MenuItem, Modal, Select, TextField, Typography} from '@mui/material'
import { useEffect, useState } from 'react'

import { getAllEvents } from '../../../services/eventService'
import { getAllHills } from '../../../services/hillService'
import { getAllMountains } from '../../../services/mountainService'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
}

const AddTeamModal = ({ open, onClose, onAdd, onEdit, teamToEdit }) => {
  const [name, setName] = useState('')
  const [isSoloTeam, setIsSoloTeam] = useState(false)
  const [lapsRequired, setLapsRequired] = useState('')
  const [distanceRequired, setDistanceRequired] = useState('')
  const [startDateTime, setStartDateTime] = useState('')
  const [selectedMountain, setSelectedMountain] = useState('')
  const [selectedHill, setSelectedHill] = useState('')
  const [selectedEvent, setSelectedEvent] = useState('')
  const [mountains, setMountains] = useState([])
  const [hills, setHills] = useState([])
  const [events, setEvents] = useState([])

  const onModalClose = () => {
    onClose()
    setName('')
    setIsSoloTeam(false)
    setLapsRequired('')
    setDistanceRequired('')
    setStartDateTime('')
    setSelectedMountain('')
    setSelectedHill('')
    setSelectedEvent('')
  }

  useEffect(() => {
    const fetchData = async () => {
      if (open) {
        try {
          const [mountainData, hillData, eventData] = await Promise.all([
            getAllMountains(),
            getAllHills(),
            getAllEvents()
          ])
          setMountains(mountainData)
          setHills(hillData)
          setEvents(eventData)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }
    }
    fetchData()
  }, [open])

  useEffect(() => {
    if (teamToEdit) {
      setName(teamToEdit.name || '')
      setIsSoloTeam(teamToEdit.isSoloTeam || false)
      setLapsRequired(teamToEdit.lapsRequired || '')
      setDistanceRequired(teamToEdit.totalDistanceRequired || '')
      setStartDateTime(teamToEdit.startDateTime?.slice(0, 16) || '')
      setSelectedMountain(teamToEdit.mountainId || '')
      setSelectedHill(teamToEdit.hillId || '')
      setSelectedEvent(teamToEdit.event || '')
    }
  }, [teamToEdit])
  const handleSubmit = async (e) => {
    e.preventDefault()

    const teamData = {
      name,
      isSoloTeam,
      lapsRequired: Number(lapsRequired),
      totalDistanceRequired: Number(distanceRequired),
      startDateTime: new Date(startDateTime).toISOString(),
      mountain: selectedMountain,
      hill: selectedHill,
      event: selectedEvent,
    }

    try {
      if (teamToEdit) {
        onEdit(teamToEdit.id, teamData)
      } else {
        onAdd(teamData)
      }
    } catch (error) {
      console.error('Error saving team:', error)
    }

    onModalClose()
  }

  return (
    <Modal open={open} onClose={onModalClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2} sx={{ color: 'black' }}>
          {teamToEdit ? 'Edit Team' : 'Add New Team'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Team Name"
            variant="outlined"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={isSoloTeam}
                onChange={(e) => setIsSoloTeam(e.target.checked)}
              />
            }
            label="Solo Team"
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel id="mountain-select-label">Target Mountain</InputLabel>
            <Select
              labelId="mountain-select-label"
              id="mountain-select"
              value={selectedMountain}
              label="Mountain"
              onChange={(e) => setSelectedMountain(e.target.value)}
            >
              {mountains.map((mountain) => (
                <MenuItem key={mountain.id} value={mountain.id}>
                  {mountain.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal" required>
            <InputLabel id="hill-select-label">Hill</InputLabel>
            <Select
              labelId="hill-select-label"
              id="hill-select"
              value={selectedHill}
              label="Hill"
              onChange={(e) => setSelectedHill(e.target.value)}
            >
              {hills.map((hill) => (
                <MenuItem key={hill.id} value={hill.id}>
                  {hill.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal" required>
            <InputLabel id="event-select-label">Event</InputLabel>
            <Select
              labelId="event-select-label"
              id="event-select"
              value={selectedEvent}
              label="Event"
              onChange={(e) => setSelectedEvent(e.target.value)}
            >
              {events.map((event) => (
                <MenuItem key={event.id} value={event.id}>
                  {event.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            required
            label="Laps"
            type="number"
            variant="outlined"
            margin="normal"
            value={lapsRequired}
            onChange={(e) => setLapsRequired(e.target.value)}
            inputProps={{ min: 1 }}
          />

          <TextField
            fullWidth
            required
            label="Total Distance"
            type="number"
            variant="outlined"
            margin="normal"
            value={distanceRequired}
            onChange={(e) => setDistanceRequired(e.target.value)}
            inputProps={{ min: 1 }}
          />
          <TextField
            fullWidth
            label="Start Date & Time"
            type="datetime-local"
            variant="outlined"
            margin="normal"
            value={startDateTime}
            onChange={(e) => setStartDateTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
          />

          <Box mt={3} display="flex" justifyContent="space-between" gap={2}>
            <Button variant="outlined" onClick={onModalClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              {teamToEdit ? 'Save' : 'Create'}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  )
}

export default AddTeamModal
