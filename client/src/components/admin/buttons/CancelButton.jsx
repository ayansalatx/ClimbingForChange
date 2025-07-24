import { alpha, Button } from '@mui/material'

import theme from '../../../styles/theme'

const CancelButton = ({ onClick, color }) => {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      sx={{
        width: '6rem',
        borderWidth: '2px',
        letterSpacing: '.05rem',
        borderColor: color == 'red' ? 'error.main' : 'gray.main',
        color: color == 'red' ? 'error.main' : 'gray.main',
        '&:hover': {
          borderColor: color == 'red' ? 'error.main' : 'gray.main',
          backgroundColor:
            color == 'red'
              ? alpha(theme.palette.error.main, 0.15)
              : alpha(theme.palette.gray.main, 0.2),
        },
      }}
    >
      Cancel
    </Button>
  )
}

export default CancelButton
