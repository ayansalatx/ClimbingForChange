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

import C4CGreenLogo from '../../assets/C4C-branding/Climbing-For-Change-Horizontal_Green.png'

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
        <IconButton
          edge="start"
          onClick={onMenuClick}
          color="inherit"
          sx={{
            '&:hover': {
              outline: 'none',
              color: 'info.main',
            },
            '&:focus': {
              outline: 'none',
            },
            '&.Mui-focusVisible': {
              outline: 'none',
              boxShadow: 'none',
            },
          }}
        >
          <MenuIcon sx={{ fontSize: '2.75rem' }} />
        </IconButton>

        <Box component="span" sx={{ ml: 2.25, mt: 0.5 }}>
          <img src={C4CGreenLogo} alt="Climbing for Change" height={45} />
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Button
          onClick={onLogout}
          color="inherit"
          variant="outlined"
          size="med"
          sx={{
            px: '1.5rem',
            py: '.25rem',
            letterSpacing: '.075rem',
            borderWidth: '2px',
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </Container>
  </AppBar>
)

export default TopAppBar
