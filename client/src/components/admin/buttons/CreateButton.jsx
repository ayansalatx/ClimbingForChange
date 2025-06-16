import { Button } from '@mui/material'

export default function CreateButton({  onClick, disabled, type = 'button'}) {
  return (
    <Button
      type={type}
      variant="contained"
      sx={{
        backgroundColor: '#191447',
        '&:hover': {
          backgroundColor: '#121234',
        },
        color: '#fff',
      }}
      onClick={onClick}
      disabled={disabled}
    >
      Create
    </Button>
  )
}