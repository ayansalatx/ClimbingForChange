import { Delete, Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material'

const RowActions = ({ row, onEditClick, onDeleteClick, active }) => {
  return (
    <>
      <IconButton
        onClick={() => onEditClick(row)}
        sx={{
          p: 0,
          '&:focus': {
            outline: 'none',
          },
        }}
      >
        <Edit
          sx={{ color: active ? 'primary.light' : 'grey.main' }}
          fontSize='small'
        />
      </IconButton>
      <IconButton
        onClick={() => onDeleteClick(row)}
        disabled={!active}
        sx={{
          p: 0,
          '&:focus': {
            outline: 'none',
          },
        }}
      >
        <Delete fontSize='small' sx={{ color: active ? 'error.main' : 'grey.main' }} />
      </IconButton>
    </>
  )
}

export default RowActions
