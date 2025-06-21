import { AddOutlined } from '@mui/icons-material'
import { Button } from '@mui/material'

const AddButton = ({ onAddClick }) => {
  return (
    <Button
      variant="contained"
      sx={{
        minWidth: 0,
        px: '.5rem',
        backgroundColor: 'secondary.main',
        color: 'primary.main',
        '&:hover': { backgroundColor: 'var(--med-green)' },
      }}
      onClick={onAddClick}
    >
      <AddOutlined />
    </Button>
  )
}

export default AddButton
