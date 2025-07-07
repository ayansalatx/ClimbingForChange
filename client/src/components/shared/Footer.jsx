import { Box, Container, Typography } from '@mui/material'
import React from 'react'

import C4CGreenLogo from '../../assets/C4C-branding/Climbing-For-Change-Horizontal_Green.png'

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        backgroundColor: '#191447',
        borderTop: '1px solid #ddd',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 2,
        }}
      >
        <Box
          component="img"
          src={C4CGreenLogo}
          alt="Climbing for Change Logo"
          sx={{
            height: 40,
            maxWidth: '100%',
            mb: { xs: 1, sm: 0 },
          }}
        />
        <Typography
          variant="body2"
          color="#ffffff"
          align="center"
          sx={{ textAlign: { xs: 'center', sm: 'right' } }}
        >
          © {new Date().getFullYear()} Climbing for Change. All rights reserved.
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer
