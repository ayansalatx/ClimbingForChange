import { Button } from '@mui/material'

const DeleteButton = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        width: '6rem',
        borderWidth: '2px',
        letterSpacing: '.075rem',
        backgroundColor: 'error.main',
        '&:hover': {
          backgroundColor: 'error.dark',
        },
      }}
    >
      Delete
    </Button>
  )
}

export default DeleteButton
