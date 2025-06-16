import { Box,CircularProgress } from '@mui/material'
import React from 'react'

const LoadingSpinner = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        minHeight: '60vh',
      }}
    >
      <CircularProgress />
    </Box>
  )
}

export default LoadingSpinner