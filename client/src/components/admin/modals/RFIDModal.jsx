import { Box, Modal, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

import CancelButton from '../buttons/CancelButton'
import SaveButton from '../buttons/SaveButton'

const style = {
  'position': 'absolute',
  'top': '50%',
  'left': '50%',
  'transform': 'translate(-50%, -50%)',
  'width': 400,
  'bgcolor': 'background.paper',
  'boxShadow': 24,
  'p': 4,
  'borderRadius': 2,
  '& .MuiTextField-root': { mb: 2 },
}

const RFIDModal = ({ open, onClose, onSave, rfid }) => {
  const [serialNumber, setSerialNumber] = useState('')

  useEffect(() => {
    if (open && rfid) {
      setSerialNumber(rfid.serialNumber || '')
    }
    else if (!open) {
      // Reset form when closing
      setSerialNumber('')
    }
  }, [open, rfid])

  const handleSubmit = (e) => {
    e.preventDefault()

    // Prepare the RFID data
    const rfidData = {
      serialNumber: serialNumber.trim(),
    }

    onSave(rfidData)
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography
          variant="h5"
          mb={2}
          sx={{ textTransform: 'uppercase', color: 'primary.main' }}
        >
          {rfid?.id ? 'Edit RFID Tag' : 'Add New RFID Tag'}
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="RFID Serial Number"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            margin="dense"
            required
            helperText="Enter the unique serial number of the RFID tag"
          />
          <Box mt={2} display="flex" justifyContent="space-between" gap={2}>
            <CancelButton onClick={onClose} color="red" />
            <SaveButton type="submit" label={rfid?.id ? 'Save' : 'Create'} />
          </Box>
        </form>
      </Box>
    </Modal>
  )
}

export default RFIDModal
