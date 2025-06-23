import {
  Box,
  Modal,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'

import TextInput from '../forms/fields/TextInput'
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
}

const LocationModal = ({ open, onClose, onSave, locationData }) => {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [province, setProvince] = useState('')
  const [country, setCountry] = useState('')

  useEffect(() => {
    if (locationData) {
      setName(locationData.name || '')
      setAddress(locationData.address || '')
      setCity(locationData.city || '')
      setProvince(locationData.provState || '')
      setCountry(locationData.country || '')
    } else {
      setName('')
      setAddress('')
      setCity('')
      setProvince('')
      setCountry('')
    }
  }, [locationData, open])

  const handleSave = (e) => {
    e.preventDefault()
    const newLocationData = {
      name,
      address,
      city,
      province,
      country,
    }
    onSave(newLocationData)
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography
          variant="h5"
          mb={2}
          sx={{ textTransform: 'uppercase', color: 'primary.main' }}
        >
          {locationData ? 'Edit Location' : 'Add New Location'}
        </Typography>

        <form onSubmit={handleSave}>
          <TextInput
            label={'Location Name'}
            value={name}
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
          <Box mt={3} display="flex" justifyContent="space-between" gap={2}>
            <CancelButton onClick={onClose} />
            <SaveButton
              type="submit"
              label={locationData ? 'Save' : 'Create'}
            />
          </Box>
        </form>
      </Box>
    </Modal>
  )
}

export default LocationModal
