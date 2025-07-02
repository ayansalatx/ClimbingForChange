import {Box, Button, Modal, TextField, Typography, FormControlLabel, Checkbox} from '@mui/material'
import { useEffect, useState } from 'react'

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

  const onModalClose = () => {
    onClose()
    setName('')
    setIsSoloTeam(false)
    setLapsRequired('')
    setDistanceRequired('')
    setStartDateTime('')
  }

  useEffect(() => {
    if (teamToEdit) {
      setName(teamToEdit.name || '')
      setIsSoloTeam(teamToEdit.isSoloTeam || false)
      setLapsRequired(teamToEdit.lapsRequired || '')
      setDistanceRequired(teamToEdit.totalDistanceRequired || '')
      setStartDateTime(teamToEdit.startDateTime?.slice(0, 16) || '')
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

          <TextField
            fullWidth
            label="Laps Required"
            type="number"
            variant="outlined"
            margin="normal"
            value={lapsRequired}
            onChange={(e) => setLapsRequired(e.target.value)}
          />

          <TextField
            fullWidth
            label="Total Distance Required"
            type="number"
            variant="outlined"
            margin="normal"
            value={distanceRequired}
            onChange={(e) => setDistanceRequired(e.target.value)}
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
              {teamToEdit ? 'Save' : 'Add'}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  )
}

export default AddTeamModal
