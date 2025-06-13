import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Box,Button, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'

const TopAppBar = ({ onMenuClick, onLogout }) => (
  <AppBar
    position="fixed"
    elevation={1}
    sx={{
      bgcolor: '#f5f5f5',   
      color: '#000',        
      height: 64
    }}
  >
    <Container maxWidth="lg" disableGutters>
      <Toolbar disableGutters sx={{ px: 3 }}>
      
        <IconButton edge="start" onClick={onMenuClick} color="inherit">
          <MenuIcon />
        </IconButton>

       
        <Box component="span" sx={{ ml: 2 }}>
          <img src={Logo} alt="Climbing for Change" height={40} />
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Button onClick={onLogout} color="inherit" variant="outlined" size="small">
          Logout
        </Button>
      </Toolbar>
    </Container>
  </AppBar>
);

export default TopAppBar
