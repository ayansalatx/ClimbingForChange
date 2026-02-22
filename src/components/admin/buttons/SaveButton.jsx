import { Button } from '@mui/material'

const SaveButton = ({ type, label, onClick, disabled }) => {
  return (
    <Button
      type={type}
      variant="contained"
      sx={{
        'width': '6rem',
        'borderWidth': '2px',
        'letterSpacing': '.06rem',
        'backgroundColor': 'primary.main',
        '&:hover': {
          backgroundColor: 'primary.light',
        },
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </Button>
  )
}

export default SaveButton
