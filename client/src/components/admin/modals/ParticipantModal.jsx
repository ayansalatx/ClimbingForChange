import { Box, Modal, TextField, Typography } from '@mui/material'
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

const AddParticipantModal = ({ open, onClose, onAdd }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [teamName, setTeamName] = useState('')

  const handleAdd = (e) => {
    e.preventDefault()
    const participantData = {
      firstName,
      lastName,
      teamName,
    }
    onAdd(participantData)
    onClose()

    // Clear the form fields
    setFirstName('')
    setLastName('')
    setTeamName('')
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
            fullWidth
            label="Team Name"
            variant="outlined"
            margin="normal"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
          />
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
