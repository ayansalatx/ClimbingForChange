import { Box, Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Modal, Select, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

import { getAllEvents } from '../../../services/eventService'
import { getAllHills } from '../../../services/hillService'
import { getAllMountains } from '../../../services/mountainService'

import CancelButton from '../buttons/CancelButton'
import SaveButton from '../buttons/SaveButton'
import TextInput from '../forms/fields/TextInput'

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
  const [selectedMountain, setSelectedMountain] = useState('')
  const [selectedHill, setSelectedHill] = useState('')
  const [selectedEvent, setSelectedEvent] = useState('')
  const [mountains, setMountains] = useState([])
  const [hills, setHills] = useState([])
  const [events, setEvents] = useState([])

  const onModalClose = () => {
    onClose()
    setName('')
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
            getAllEvents(),
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
      setSelectedMountain(teamToEdit.mountainId || '')
      setSelectedHill(teamToEdit.hillId || '')
      setSelectedEvent(teamToEdit.event || '')

      if (mountains.some((m) => m.id === teamToEdit.mountainId)) {
        setSelectedMountain(teamToEdit.mountainId)
      } else {
        setSelectedMountain('')
      }
      if (hills.some((h) => h.id === teamToEdit.hillId)) {
        setSelectedHill(teamToEdit.hillId)
      } else {
        setSelectedHill('')
      }
      if (events.some((e) => e.id === teamToEdit.event)) {
        setSelectedEvent(teamToEdit.event)
      } else {
        setSelectedEvent('')
      }
    }
  }, [teamToEdit, mountains, hills, events])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const teamData = {
      name,
      mountain: selectedMountain,
      hill: selectedHill,
      event: selectedEvent,

      // temporary data
      isSoloTeam: false,
      lapsRequired: 1,
      totalDistanceRequired: 0,
      startDateTime: "2025-07-12T03:46:43.305Z"
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
          <TextInput
            fullWidth
            label="Team Name"
            variant="outlined"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Box display="flex" gap={2} mt={1.5} mb={0.5}>
            <FormControl fullWidth required sx={{ flex: 1 }}>
              <InputLabel id="mountain-select-label">Mountain</InputLabel>
              <Select
                labelId="mountain-select-label"
                id="mountain-select"
                value={selectedMountain}
                label="Mountain"
                onChange={(e) => setSelectedMountain(e.target.value)}
                required
              >
                {mountains.map((mountain) => (
                  <MenuItem key={mountain.id} value={mountain.id}>
                    {mountain.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth required sx={{ flex: 1 }}>
              <InputLabel id="hill-select-label">Hill</InputLabel>
              <Select
                labelId="hill-select-label"
                id="hill-select"
                value={selectedHill}
                label="Hill"
                onChange={(e) => setSelectedHill(e.target.value)}
                required
              >
                {hills.map((hill) => (
                  <MenuItem key={hill.id} value={hill.id}>
                    {hill.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

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

          <Box mt={3} display="flex" justifyContent="space-between" gap={2}>
            <CancelButton onClick={onModalClose} color="red" />
            <SaveButton type="submit" label={teamToEdit ? 'Save' : 'Create'} />
          </Box>
        </form>
      </Box>
    </Modal>
  )
}

export default AddTeamModal
