import { Box, FormControl, InputLabel, MenuItem, Modal, Select, Typography } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'

import { getAllEvents } from '../../../services/eventService'
import { getAllHills } from '../../../services/hillService'
import { getAllMountains } from '../../../services/mountainService'
import { getTeamsByEvent } from '../../../services/teamService'
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

const TeamModal = ({ open, onClose, onAdd, onEdit, teamToEdit, rfidTagList, preSelectedEvent, eventsData }) => {
  const [name, setName] = useState('')
  const [selectedMountain, setSelectedMountain] = useState('')
  const [selectedHill, setSelectedHill] = useState('')
  const [selectedEvent, setSelectedEvent] = useState('')
  const [selectedRfidTag, setSelectedRfidTag] = useState('')
  const [mountains, setMountains] = useState([])
  const [hills, setHills] = useState([])
  const [events, setEvents] = useState([])
  const [rfidTags, setRfidTags] = useState([])
  const [filteredRfidTags, setFilteredRfidTags] = useState([])
  const [filteredMountains, setFilteredMountains] = useState([])
  const [filteredHills, setFilteredHills] = useState([])

  const clearForm = () => {
    setName('')
    setSelectedMountain('')
    setSelectedHill('')
    setSelectedEvent('')
    setSelectedRfidTag('')
  }

  const onModalClose = () => {
    clearForm()
    onClose()
  }

  useEffect(() => {
    async function fetchTeams() {
      const teams = await getTeamsByEvent(selectedEvent)
      const usedRfidIds = teams.map((team) => team.rfidTag.id)
      const availableTags = rfidTags.filter((tag) => !usedRfidIds.includes(tag.id))
      setFilteredRfidTags(availableTags)
    }

    if (!selectedEvent && !eventsData) return
    const currentEvent = eventsData.find((event) => event.id === selectedEvent)
    if (!currentEvent) return

    const eventMountainIds = currentEvent.mountains.map((m) => (typeof m === 'object' ? m.id : m))
    const availableMountains = mountains.filter((mountain) => eventMountainIds.includes(mountain.id))
    setFilteredMountains(availableMountains)

    const eventHillIds = currentEvent.hills.map((h) => (typeof h === 'object' ? h.id : h))
    const availableHills = hills.filter((hill) => eventHillIds.includes(hill.id))
    setFilteredHills(availableHills)

    fetchTeams()
  }, [selectedEvent, eventsData, mountains, hills, rfidTags])

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
          setRfidTags(rfidTagList)

          if (!teamToEdit && preSelectedEvent) {
            setSelectedEvent(preSelectedEvent)
          }
        }
        catch (error) {
          console.error(error)
        }
      }
    }
    fetchData()
  }, [open, rfidTagList, teamToEdit, preSelectedEvent])

  useEffect(() => {
    if (!teamToEdit) return

    setName(teamToEdit.name || '')
    setSelectedMountain(teamToEdit?.mountain?.id ?? teamToEdit?.mountainId ?? '')
    setSelectedHill(teamToEdit?.hill?.id ?? teamToEdit?.hillId ?? '')
    setSelectedEvent(teamToEdit?.event?.id ?? teamToEdit?.eventId ?? '')

    if (teamToEdit.rfidTag !== undefined && teamToEdit.rfidTag !== null) {
      const matchedTag = rfidTags.find((tag) => tag.serialNumber === String(teamToEdit.rfidTag))
      setSelectedRfidTag(matchedTag || null)
    }
    else {
      setSelectedRfidTag(null)
    }
  }, [teamToEdit, rfidTags])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const teamData = {
      name,
      mountain: selectedMountain,
      hill: selectedHill,
      event: selectedEvent,
      rfidTag: selectedRfidTag,
      isSoloTeam: false,
      lapsRequired: 1,
      totalDistanceRequired: 0,
      startDateTime: '2025-07-12T03:46:43.305Z',
    }

    try {
      if (teamToEdit) {
        onEdit(teamToEdit.id, teamData)
      }
      else {
        onAdd(teamData)
      }
    }
    catch (error) {
      console.error(error)
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

          <FormControl fullWidth margin="normal" required>
            <InputLabel id="event-select-label">Event</InputLabel>
            <Select
              labelId="event-select-label"
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

          <Box display="flex" gap={2} mt={1.5} mb={0.5}>
            <FormControl fullWidth required sx={{ flex: 1 }}>
              <InputLabel id="mountain-select-label">Mountain</InputLabel>
              <Select
                disabled={!selectedEvent}
                labelId="mountain-select-label"
                value={selectedMountain}
                label="Mountain"
                onChange={(e) => setSelectedMountain(e.target.value)}
              >
                {filteredMountains.map((mountain) => (
                  <MenuItem key={mountain.id} value={mountain.id}>
                    {mountain.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth required sx={{ flex: 1 }}>
              <InputLabel id="hill-select-label">Hill</InputLabel>
              <Select
                disabled={!selectedEvent}
                labelId="hill-select-label"
                value={selectedHill}
                label="Hill"
                onChange={(e) => setSelectedHill(e.target.value)}
              >
                {filteredHills.map((hill) => (
                  <MenuItem key={hill.id} value={hill.id}>
                    {hill.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <FormControl fullWidth margin="normal" required>
            <Autocomplete
              id="rfidTag-select"
              disablePortal
              options={filteredRfidTags}
              sx={{ width: '100%' }}
              value={selectedRfidTag}
              onChange={(_, newValue) => setSelectedRfidTag(newValue)}
              getOptionLabel={(option) => option.serialNumber || ''}
              renderInput={(params) => <TextField {...params} label="RFID Tag" />}
            />
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

export default TeamModal
