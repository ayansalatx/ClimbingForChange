import { alpha, Button } from '@mui/material'

import theme from '../../../styles/theme'

const CancelButton = ({ onClick, label = 'Cancel' }) => {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      sx={{
        width: '6rem',
        borderWidth: '2px',
        letterSpacing: '.05rem',
        borderColor: 'error.main',
        color: 'error.main',
        '&:hover': {
          borderColor: '#D97A7A',
          backgroundColor: alpha(theme.palette.error.main, 0.15),
        },
      }}
    >
      {label}
    </Button>
  )
}

export default CancelButton