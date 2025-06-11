import { Autocomplete, TextField } from '@mui/material'
import * as React from 'react'

// temporary mock data
import mockData from '../../mock-data/progressboard-team-only.json'

const ProgressSearch = ({ searchString, onChange }) => {
  return (
    // Use MUI Autocomplete to display search suggestions for teams
    <Autocomplete
      size='small'
      freeSolo // Allow any input - not limited to the options
      id='progress-search'
      disableClearable
      options={mockData.map((option) => option['team-name'])} // List of team names as suggestions
      inputValue={searchString}

      // Notify Progress Board of input change
      onInputChange={(event, newInputValue) => {
        onChange(newInputValue)
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label='Search'
          slotProps={{
            input: {
              ...params.InputProps,
              type: 'search',
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              color: 'var(--c4c-green)',
              fontSize: '.9rem',

              '&:hover input': {
                color: 'var(--c4c-light-blue)',
              },
              '&.Mui-focused input': {
                color: 'var(--c4c-teal)',
              },
              '& fieldset': {
                borderColor: 'var(--c4c-green)',
              },
              '&:hover fieldset': {
                borderColor: 'var(--c4c-light-blue)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'var(--c4c-teal)',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'var(--c4c-green)',
              fontSize: '.9rem',
            },
            '&:hover .MuiInputLabel-root': {
              color: 'var(--c4c-light-blue)',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'var(--c4c-teal)',
            },
            '& input::placeholder': {
              color: 'var(--c4c-green)',
              opacity: 1,
            },
          }}
        />
      )}
    />
  )
}

export default ProgressSearch
