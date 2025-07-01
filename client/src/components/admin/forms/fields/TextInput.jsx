import { TextField } from '@mui/material'

const TextInput = ({ label, value, onChange, required }) => {
  return (
    <TextField
      fullWidth
      label={label}
      variant="outlined"
      margin="normal"
      value={value}
      onChange={onChange}
      required={required}
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
  )
}

export default TextInput
