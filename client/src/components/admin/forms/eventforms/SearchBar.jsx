import SearchIcon from '@mui/icons-material/Search'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import React from 'react'

const SearchBar = ({ setSearchTerm }) => {
  return (
    <TextField
      label="Search"
      variant="outlined"
      onChange={(e) => setSearchTerm(e.target.value)} 
      sx={{
        width: 500,
        input: { color: 'white' },
        label: { color: '#c9d82c' },
        '& fieldset': { borderColor: '#c9d82c' }
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon sx={{ color: 'white' }} />
          </InputAdornment>
        ),
      }}
    />
  )
}

export default SearchBar
