import { Box, CircularProgress } from '@mui/material'

const LoadingSpinner = () => {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
      }}
    >
      <CircularProgress color="secondary" />
    </Box>
  )
}

export default LoadingSpinner
