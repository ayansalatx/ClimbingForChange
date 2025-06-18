import { Button } from '@mui/material'

const SaveButton = ({ onClick, label = "Save" }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        backgroundColor: '#191447',
        color: '#ffffff',
        '&:hover': {
          backgroundColor: '#14103a',
        },
      }}
    >
      {label}
    </Button>
  )
}

export default SaveButton