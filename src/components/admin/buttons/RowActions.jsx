import { Delete, Edit } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import { alpha } from '@mui/material/styles'

const RowActions = ({ row, onEditClick, onDeleteClick, active }) => {
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      justifyContent="space-evenly"
    >
      <IconButton
        onClick={(e) => {
          e.currentTarget.blur()
          onEditClick(row)
        }}
        sx={(theme) => ({
          'p': 0.35,
          'borderRadius': 2,
          '&:hover': {
            bgcolor: alpha(theme.palette.primary.main, 0.15),
          },
          '&:focus': {
            outline: 'none',
            bgcolor: alpha(theme.palette.primary.main, 0.5),
          },
        })}
      >
        <Edit
          sx={{
            fontSize: '1.5rem',
            color: active ? 'primary.light' : 'grey.main',
          }}
          fontSize="small"
        />
      </IconButton>
      <IconButton
        onClick={(e) => {
          e.currentTarget.blur()
          onDeleteClick(row)
        }}
        sx={(theme) => ({
          'p': 0.25,
          'borderRadius': 2,
          '&:hover': {
            bgcolor: alpha(theme.palette.primary.main, 0.15),
          },
          '&:focus': {
            outline: 'none',
            bgcolor: alpha(theme.palette.error.main, 0.5),
          },
        })}
      >
        <Delete
          fontSize="small"
          sx={{
            fontSize: '1.5rem',
            color: active ? 'error.main' : 'grey.main',
          }}
        />
      </IconButton>
    </Box>
  )
}

export default RowActions
