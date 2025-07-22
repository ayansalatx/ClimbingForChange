import { AddOutlined } from '@mui/icons-material'
import { Button } from '@mui/material'

const AddButton = ({ onAddClick, disabled }) => {
  return (
    <Button
      variant="contained"
      sx={{
        minWidth: 0,
        px: '.5rem',
        backgroundColor: 'secondary.main',
        color: 'primary.main',
        '&:hover': { backgroundColor: 'var(--med-green)' },
        '&:focus': {
          outline: 'none',
        },
        '&.Mui-focusVisible': {
          outline: 'none',
          boxShadow: 'none',
        },
      }}
      onClick={disabled ? undefined : onAddClick}
      disabled={disabled}
    >
      <AddOutlined />
    </Button>
  )
}

export default AddButton
