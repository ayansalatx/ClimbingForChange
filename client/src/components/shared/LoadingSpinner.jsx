import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const LoadingSpinner = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        minHeight: '60vh',
      }}
    >
      <CircularProgress color="secondary"  />
    </Box>
  )
}

export default LoadingSpinner