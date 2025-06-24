import { Delete, Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material'

const RowActions = ({ row, onEditClick, onDeleteClick }) => {
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
          sx={{
            color: 'primary.light',
          }}
          fontSize='small'
        />
      </IconButton>
      <IconButton
        onClick={() => onDeleteClick(row)}
        sx={{
          p: 0,
          '&:focus': {
            outline: 'none',
          },
        }}
      >
        <Delete color='error' fontSize='small' />
      </IconButton>
    </>
  )
}

export default RowActions
