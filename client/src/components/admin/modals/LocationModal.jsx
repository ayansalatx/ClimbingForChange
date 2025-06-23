import {
  Box,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from '@mui/material'
import React from 'react'

import TextInput from '../forms/fields/TextInput'
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

const LocationModal = ({ open, onClose, onSave }) => {
  const [locationName, setLocationName] = React.useState('')
  const [address, setAddress] = React.useState('')
  const [city, setCity] = React.useState('')
  const [province, setProvince] = React.useState('')
  const [country, setCountry] = React.useState('')
  const [lap, setLap] = React.useState('')

  const handleSave = (e) => {
    e.preventDefault()
    const locationData = {
      locationName,
      address,
      city,
      province,
      country,
      lap,
    }
    onSave(locationData)
    onClose()

    // Clear the form fields
    setLocationName('')
    setAddress('')
    setCity('')
    setProvince('')
    setCountry('')
    setLap('')
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography
          variant="h5"
          mb={2}
          sx={{ textTransform: 'uppercase', color: 'primary.main' }}
        >
          Add New Location
          
        </Typography>

        <form onSubmit={handleSave}>
          <TextInput
            label={'Location Name'}
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            required={true}
          />
          <TextInput
            label={'Address'}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required={true}
          />
          <TextInput
            label={'City'}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required={true}
          />
          <TextInput
            label={'Province'}
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            required={true}
          />
          <TextInput
            label={'Country'}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required={true}
          />
          <TextField
            fullWidth
            label="Lap Distance"
            variant="outlined"
            margin="normal"
            type="number"
            value={lap}
            onChange={(e) => setLap(e.target.value)}
            required
            InputProps={{
              endAdornment: <InputAdornment position="end">ft</InputAdornment>,
            }}
            inputProps={{
              min: 0,
              step: 1,
            }}
            sx={{
              borderWidth: '2px',
              bgcolor: 'background.default',
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                  borderWidth: '2px',
                },
              },
            }}
          />
          <Box mt={3} display="flex" justifyContent="space-between" gap={2}>
            <CancelButton onClick={onClose} />
            <CreateButton type="submit" label="Create" onClick={handleSave}/>
          </Box>
        </form>
      </Box>
    </Modal>
  )
}

export default LocationModal
