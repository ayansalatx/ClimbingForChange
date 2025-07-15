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
  const [imageURL, setImageURL] = useState('')

  useEffect(() => {
    if (open && mountain) {
      console.log('Setting form values from mountain:', mountain)
      setName(mountain.name || '')
      setTotalElevation(mountain.totalElevation?.toString() || '0')
      setElevationUnit(mountain.elevationUnit || 'FT')
      setImageURL(mountain.imageURL || '')
    } else if (!open) {
      // Reset form when closing
      setName('')
      setTotalElevation('0')
      setElevationUnit('FT')
      setImageURL('')
    }
  }, [open, mountain])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Prepare the mountain data
    const mountainData = {
      name: name.trim(),
      totalElevation: parseFloat(totalElevation) || 0,
      elevationUnit,
      imageURL: imageURL || '',
      active: true,
    }
    
    console.log('Submitting mountain data:', mountainData)
    onSave(mountainData)
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant='h5' mb={2} sx={{ textTransform: 'uppercase', color: 'primary.main' }}>
          {mountain?.id ? 'Edit Mountain' : 'Add New Mountain'}
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label='Mountain Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin='dense'
            required
          />

          <TextField
            fullWidth
            label='Elevation'
            type='number'
            value={totalElevation}
            onChange={(e) => setTotalElevation(e.target.value)}
            margin='dense'
            required
          />
          
          <FormControl fullWidth margin='dense'>
            <InputLabel>Unit</InputLabel>
            <Select
              value={elevationUnit}
              label='Unit'
              onChange={(e) => setElevationUnit(e.target.value)}
              required
            >
              <MenuItem value='FT'>Feet</MenuItem>
              <MenuItem value='M'>Meters</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            fullWidth
            label='Image URL (Optional)'
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            margin='dense'
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}>
            <CancelButton onClick={onClose} />
            <SaveButton type='submit' label={mountain?.id ? 'Update' : 'Add'} />
          </Box>
        </form>
      </Box>
    </Modal>
  )
}

export default MountainModal