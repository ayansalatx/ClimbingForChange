import SearchIcon from '@mui/icons-material/Search'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import React from 'react'

const SearchBar = ({ value, onChange }) => {
  return (
    <TextField
      label="Search"
      variant="outlined"
      value={value}
      
      onChange={(e) => onChange(e.target.value)}
      sx={{
        width: 510,
        padding: '0',
        input: { color: 'background.paper', fontSize: '1rem', padding: '.9rem', },
        label: { color: 'background.paper' },
        '& fieldset': { borderColor: 'background.paper' },
        '& .MuiOutlinedInput-root': {
          color: 'background.paper',
          fontSize: '.9rem',
          '& fieldset': { borderColor: 'background.paper', borderWidth: '2px' },
          '&:hover fieldset': { borderColor: 'info.main' },
          '&.Mui-focused fieldset': { borderColor: 'info.main' },
        },
        '& .MuiInputLabel-root': {
          color: 'background.paper',
          fontSize: '.9rem',
        },
        '&:hover .MuiInputLabel-root': {
          color: 'info.main',
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: 'info.main',
        },
        '& input::placeholder': {
          color: 'background.paper',
          textAlign: 'center',
          opacity: 1,
        },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon sx={{ color: 'background.paper' }} />
          </InputAdornment>
        ),
      }}
    />
  )
}

export default SearchBar
