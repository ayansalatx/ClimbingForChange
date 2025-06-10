import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';


const SearchBar = () => {
  return (
    <TextField
      label="Search"
      variant="outlined"
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
  );
};

export default SearchBar