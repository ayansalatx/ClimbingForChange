import { Box, MenuItem, Modal, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

import CancelButton from '../buttons/CancelButton'
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

const AddParticipantModal = ({
  open,
  onClose,
  onAdd,
  participantData,
  teamNames = [],
}) => {
  const [id, setId] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [teamId, setTeamId] = useState('')

  useEffect(() => {
    if (open && participantData) {
      setId(participantData.id || '')
      setFirstName(participantData.firstName || '')
      setLastName(participantData.lastName || '')
      setTeamId(participantData.teamId?.id || participantData.teamId || '')
    } else if (!open) {
      setId('')
      setFirstName('')
      setLastName('')
      setTeamId('')
    }
  }, [open, participantData])

  const handleSubmit = (e) => {
    e.preventDefault()

    const newParticipant = {
      id: id || undefined,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      teamId: teamId || null,
    }

    onAdd(newParticipant)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography
          variant="h5"
          mb={2}
          sx={{ textTransform: 'uppercase', color: 'primary.main' }}
        >
          {participantData ? 'Edit Participant' : 'Add New Participant'}
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextInput
            fullWidth
            label="First Name"
            margin="normal"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <TextInput
            fullWidth
            label="Last Name"
            margin="normal"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <TextField
            select
            fullWidth
            label="Team"
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
            <CancelButton onClick={onClose} color="red"/>
            <SaveButton type="submit" label={participantData ? 'Save' : 'Create'} />
          </Box>
        </form>
      </Box>
    </Modal>
  )
}

export default AddParticipantModal
