import { Box, MenuItem,Modal, TextField, Typography } from '@mui/material'
import { useState } from 'react'

import CancelButton from '../buttons/CancelButton'
import CreateButton from '../buttons/CreateButton'

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

const AddParticipantModal = ({ open, teamNames = [], onClose, onAdd }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [teamId, setTeamId] = useState('')

  const handleAdd = (e) => {
    e.preventDefault()

    const selectedTeam = teamNames.find((team) => team.id === teamId)
    console.log('Selected team:', selectedTeam)

    const participantData = {
      firstName,
      lastName,
      team: selectedTeam || null,
    }

    onAdd(participantData)
    onClose()

    setFirstName('')
    setLastName('')
    setTeamId('')
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2} sx={{ color: 'black' }}>
          Add New Participant
        </Typography>

        <form onSubmit={handleAdd}>
          <TextField
            fullWidth
            label="First Name"
            variant="outlined"
            margin="normal"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Last Name"
            variant="outlined"
            margin="normal"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <TextField
            select
            fullWidth
            label="Team Name"
            variant="outlined"
            margin="normal"
            value={teamId}
            onChange={(e) => setTeamId(e.target.value)}
            required
          >
            <MenuItem disabled value="">
              -- Select a team --
            </MenuItem>
            {teamNames
              .filter((team) => !team.isSoloTeam)
              .map((team) => (
                <MenuItem key={team.id} value={team.id}>
                  {team.name}
                </MenuItem>
              ))}
          </TextField>

          <Box mt={3} display="flex" justifyContent="space-between" gap={2}>
            <CancelButton onClick={onClose} />
            <CreateButton type="submit" label="Create" />
          </Box>
        </form>
      </Box>
    </Modal>
  )
}

export default AddParticipantModal
