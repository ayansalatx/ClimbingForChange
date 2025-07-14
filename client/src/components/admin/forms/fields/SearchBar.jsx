import SearchIcon from '@mui/icons-material/Search'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'

const SearchBar = ({ value, onChange }) => {
  return (
    <TextField
      label='Search'
      variant='outlined'
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{
        width: 500,
        input: { color: 'white' },
        label: { color: '#c9d82c' },
        '& fieldset': { borderColor: '#c9d82c' },
        '& .MuiOutlinedInput-root': {
          color: 'var(--c4c-green)',
          fontSize: '.9rem',
          '&:hover input': { color: 'var(--c4c-light-blue)' },
          '&.Mui-focused input': { color: 'var(--c4c-teal)' },
          '& fieldset': { borderColor: 'var(--c4c-green)' },
          '&:hover fieldset': { borderColor: 'var(--c4c-light-blue)' },
          '&.Mui-focused fieldset': { borderColor: 'var(--c4c-teal)' },
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
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position='end'>
              <SearchIcon sx={{ color: 'white' }} />
            </InputAdornment>
          ),
        },
      }}
    />
  )
}

export default SearchBar
