import { Button } from '@mui/material'

const CancelButton = ({ onClick, label = 'Cancel' }) => {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      sx={{
        borderColor: '#D97A7A',
        color: '#D97A7A',
        '&:hover': {
          borderColor: '#D97A7A',
          backgroundColor: 'rgba(217, 122, 122, 0.08)',
        },
      }}
    >
      {label}
    </Button>
  )
}

export default CancelButton