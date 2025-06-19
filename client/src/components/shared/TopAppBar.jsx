import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
} from '@mui/material'
import React from 'react'

import C4CGreenLogo from '../../assets/C4C-branding/Climbing-for-Change-Horizontal_Green.png'

const TopAppBar = ({ onMenuClick, onLogout }) => (
  <AppBar
    position="fixed"
    elevation={3}
    sx={{
      bgcolor: 'primary-main',
      height: '5rem',
    }}
  >
    <Container sx={{ my: '.5rem' }} maxWidth={false}>
      <Toolbar disableGutters>
        <IconButton edge="start" onClick={onMenuClick} color="inherit">
          <MenuIcon fontSize="large" />
        </IconButton>

        <Box component="span" sx={{ ml: 2 }}>
          <img src={C4CGreenLogo} alt="Climbing for Change" height={45} />
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Button
          onClick={onLogout}
          color="inherit"
          variant="outlined"
          size="med"
          sx={{px: '1.5rem'}}
        >
          Logout
        </Button>
      </Toolbar>
    </Container>
  </AppBar>
)

export default TopAppBar
