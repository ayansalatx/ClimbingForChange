import { Button } from '@mui/material'

export default function CreateButton({ onClick, disabled, type = 'button' }) {
  return (
    <Button
      type={type}
      variant="contained"
      sx={{
        width: '6rem',
        borderWidth: '2px',
        letterSpacing: '.06rem',
        backgroundColor: 'primary.main',
        '&:hover': {
          backgroundColor: 'primary.light',
        },
      }}
      onClick={onClick}
      disabled={disabled}
    >
      Create
    </Button>
  )
}
