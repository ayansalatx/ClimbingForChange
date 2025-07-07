import { Box, Container, Typography } from '@mui/material'

import C4CGreenLogo from '../../assets/C4C-branding/Climbing-For-Change-Logo_Green.png'

const Footer = () => {
  return (
    <Box
      component="footer"
      elevation={3}
      sx={{
        mt: 'auto',
        backgroundColor: 'primary.main',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: 3,
          py: 1,
        }}
      >
        <Box sx={{ display: 'flex', gap: 1}}>
          <Typography
            variant="body2"
            color="background.paper"
            align="center"
            sx={{ textAlign: { xs: 'center', sm: 'right' } }}
          >
            © {new Date().getFullYear()} Climbing for Change.
          </Typography>
          <Typography
            variant="body2"
            color="background.paper"
            align="center"
            sx={{ textAlign: { xs: 'center', sm: 'right' } }}
          >
            All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Footer
