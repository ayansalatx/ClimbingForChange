import { Delete, Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material'

const RowActions = ({ onEditClick, onDeleteClick }) => {
  return (
    <>
      <IconButton
        onClick={onEditClick}
        sx={{
          p: 0,
          '&:focus': {
            outline: 'none',
          },
        }}
      >
        <Edit
          sx={{
            color: 'primary.light',
          }}
          fontSize="small"
        />
      </IconButton>
      <IconButton
        onClick={onDeleteClick}
        sx={{
          p: 0,
          '&:focus': {
            outline: 'none',
          },
        }}
      >
        <Delete color="error" fontSize="small" />
      </IconButton>
    </>
  )
}

export default RowActions
