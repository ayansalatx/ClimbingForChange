import { Box, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

import CancelButton from '../buttons/CancelButton'
import SaveButton from '../buttons/SaveButton'

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
  '& .MuiTextField-root': { mb: 2 },
}

const MountainModal = ({ open, onClose, onSave, mountain }) => {
  const [name, setName] = useState('')
  const [totalElevation, setTotalElevation] = useState('')
  const [elevationUnit, setElevationUnit] = useState('FT')

  useEffect(() => {
    if (open && mountain) {
      console.log('Setting form values from mountain:', mountain)
      setName(mountain.name || '')
      setTotalElevation(mountain.totalElevation?.toString() || '0')
      setElevationUnit(mountain.elevationUnit || 'FT')
    } else if (!open) {
      // Reset form when closing
      setName('')
      setTotalElevation('0')
      setElevationUnit('FT')
    }
  }, [open, mountain])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Prepare the mountain data
    const mountainData = {
      name: name.trim(),
      totalElevation: parseFloat(totalElevation) || 0,
      elevationUnit,
      active: true,
    }
    
    console.log('Submitting mountain data:', mountainData)
    onSave(mountainData)
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h5" mb={2} sx={{ textTransform: 'uppercase', color: 'primary.main' }}>
          {mountain?.id ? 'Edit Mountain' : 'Add New Mountain'}
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Mountain Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="dense"
            required
          />
          
          <Box display="flex" gap={2} alignItems="baseline" >
            <TextField
              label="Elevation"
              type="number"
              value={totalElevation}
              onChange={(e) => setTotalElevation(e.target.value)}
              required
              fullWidth
              margin="dense"
            />

            <FormControl fullWidth margin="dense" sx={{ minWidth: 120 }}>
              <InputLabel>Unit</InputLabel>
              <Select
                value={elevationUnit}
                label="Unit"
                onChange={(e) => setElevationUnit(e.target.value)}
                required
              >
                <MenuItem value="FT">Feet</MenuItem>
                <MenuItem value="M">Meters</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box mt={3} display="flex" justifyContent="space-between" gap={2}>
            <CancelButton onClick={onClose} color="red" />
            <SaveButton type="submit" label={mountain?.id ? 'Save' : 'Create'} />
          </Box>
        </form>
      </Box>
    </Modal>
  )
}

export default MountainModal