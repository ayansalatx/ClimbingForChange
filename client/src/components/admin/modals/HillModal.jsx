import { Box, FormControl, InputLabel, MenuItem, Modal, Select, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

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

const HillModal = ({ open, onClose, onSave, hillData, onLocation }) => {
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [lapDistance, setLapDistance] = useState('')
  const [distanceUnit, setDistanceUnit] = useState('KM')
  const [lapElevationGain, setLapElevationGain] = useState('')
  const [elevationUnit, setElevationUnit] = useState('FT')
  const [location, setLocation] = useState('')
  const [locations, setLocations] = useState([])

  useEffect(() => {
    setLocations(onLocation)
  }, [onLocation])

  useEffect(() => {
    if (open && hillData) {
      setId(hillData.id || '')
      setName(hillData.name || '')
      setLapDistance(
        hillData.lapDistance !== undefined ? hillData.lapDistance.toString() : ''
      )
      setLapElevationGain(
        hillData.lapElevationGain !== undefined ? hillData.lapElevationGain.toString() : ''
      )
      setDistanceUnit(hillData.distanceUnit || 'KM')
      setElevationUnit(hillData.elevationUnit || 'FT')
      setLocation(hillData.location || '')
    } else if (!open) {
      setId('')
      setName('')
      setLapDistance('')
      setLapElevationGain('')
      setDistanceUnit('KM')
      setElevationUnit('FT')
      setLocation('')
    }
  }, [open, hillData])

  const handleSave = (e) => {
    e.preventDefault()
    const newHillData = {
      id: id || undefined,
      name: name.trim(),
      lapDistance: parseFloat(lapDistance),
      distanceUnit,
      lapElevationGain: parseFloat(lapElevationGain),
      elevationUnit,
      location: location.trim(),
    }
    onSave(newHillData)
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography
          variant='h5'
          mb={2}
          sx={{ textTransform: 'uppercase', color: 'primary.main' }}
        >
          {hillData ? 'Edit Hill' : 'Add New Hill'}
        </Typography>

        <form onSubmit={handleSave}>
          <TextInput
            fullWidth
            label='Hill Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Box display="flex" gap={2} alignItems="baseline">
            <TextInput
              fullWidth
              label='Lap Distance'
              type='number'
              inputProps={{ step: 'any', min: 0 }}
              value={lapDistance}
              onChange={(e) => setLapDistance(e.target.value)}
              required
            />
            <FormControl fullWidth>
              <InputLabel>Distance Unit</InputLabel>
              <Select
                value={distanceUnit}
                label='Distance Unit'
                onChange={(e) => setDistanceUnit(e.target.value)}
                required
              >
                <MenuItem value='KM'>Kilometers</MenuItem>
                <MenuItem value='MI'>Miles</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box display="flex" gap={2} alignItems="baseline">
            <TextInput
              fullWidth
              label='Lap Elevation Gain'
              type='number'
              inputProps={{ step: 'any', min: 0 }}
              value={lapElevationGain}
              onChange={(e) => setLapElevationGain(e.target.value)}
              required
            />
            <FormControl fullWidth>
              <InputLabel>Elevation Unit</InputLabel>
              <Select
                value={elevationUnit}
                label='Elevation Unit'
                onChange={(e) => setElevationUnit(e.target.value)}
                required
              >
                <MenuItem value='FT'>Feet</MenuItem>
                <MenuItem value='M'>Meters</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <FormControl fullWidth required margin='normal'>
            <InputLabel id='location-select-label'>Location</InputLabel>
            <Select
              labelId='location-select-label'
              id='location-select'
              value={location}
              label='Location'
              onChange={(e) => setLocation(e.target.value)}
            >
              {locations.map((loc) => (
                <MenuItem key={loc.id} value={loc.id}>
                  {loc.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box mt={3} display='flex' justifyContent='space-between' gap={2}>
            <CancelButton onClick={onClose} color='red' />
            <SaveButton type='submit' label={hillData ? 'Save' : 'Create'} />
          </Box>
        </form>
      </Box>
    </Modal>
  )
}

export default HillModal
