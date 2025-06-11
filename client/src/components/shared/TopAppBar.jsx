import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Box,Button, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'

const TopAppBar = ({ onMenuClick, onLogout }) => {
  return (
    <AppBar position='fixed' color='primary' elevation={1}>
      <Toolbar>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='menu'
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant='h6' component='div'>
          Admin Dashboard
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Button color='inherit' onClick={onLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default TopAppBar
