import { Box, Modal, Typography } from '@mui/material'
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

const LocationModal = ({ open, onClose, onSave, locationData }) => {
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [provState, setProvState] = useState('')
  const [country, setCountry] = useState('')

  useEffect(() => {
    if (open && locationData) {
      setId(locationData.id || '')
      setName(locationData.name || '')
      setAddress(locationData.address || '')
      setCity(locationData.city || '')
      setProvState(locationData.provState || '')
      setCountry(locationData.country || '')
    } else if (!open) {
      setId('')
      setName('')
      setAddress('')
      setCity('')
      setProvState('')
      setCountry('')
    }
  }, [open, locationData])

  const handleSave = async (e) => {
    e.preventDefault()
    const newLocationData = {
      id: id || undefined,
      name,
      address,
      city,
      provState,
      country,
    }
    onSave(newLocationData)
  }

  const handleLettersOnlyChange = (setter) => (e) => {
    const lettersOnly = e.target.value.replace(/[^a-zA-Z\s]/g, '')
    setter(lettersOnly)
  }

  const handleProvStateChange = (e) => {
    const lettersOnly = e.target.value.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 2)
    setProvState(lettersOnly)
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography
          variant='h5'
          mb={2}
          sx={{ textTransform: 'uppercase', color: 'primary.main' }}
        >
          {locationData ? 'Edit Location' : 'Add New Location'}
        </Typography>

        <form onSubmit={handleSave}>
          <TextInput
            label={'Location Name'}
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            onChange={handleLettersOnlyChange(setCity)}
            required={true}
          />

          <TextInput
            label={'Province/State'}
            value={provState}
            onChange={handleProvStateChange}
            required={true}
          />
          <TextInput
            label={'Country'}
            value={country}
            onChange={handleLettersOnlyChange(setCountry)}
            required={true}
          />
          <Box mt={3} display='flex' justifyContent='space-between' gap={2}>
            <CancelButton onClick={onClose} color={'red'} />
            <SaveButton
              type='submit'
              label={locationData ? 'Save' : 'Create'}
            />
          </Box>
        </form>
      </Box>
    </Modal>
  )
}

export default LocationModal
