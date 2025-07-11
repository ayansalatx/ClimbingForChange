import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import C4CHorizontalGreenLogo from '../../assets/C4C-branding/Climbing-For-Change-Full-Horizontal_Green.png'
import AlertDisplay from '../../components/AlertDisplay'
import { useAlert } from '../../hooks/useAlert'
import { login } from '../../services/loginService'

const AdminLogin = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const displayAlert = useAlert()

  const handleLogin = async (e) => {
    e.preventDefault()

    const result = await login({ username, password })

    if (result.status != 200) {
      displayAlert('Error', result.error.message, 'error')
      return
    }

    localStorage.setItem('token', result.data.token)
    displayAlert('Success', 'Successfully logged in', 'success')
    navigate('/admin')
  }

  return (
    <Box
      paddingTop='5px'
      display='flex'
      justifyContent='center'
      alignItems='center'
      sx={{ backgroundColor: '#191447' }} 
    >
      <AlertDisplay />
      <Box display='flex' flexDirection='column' alignItems='center' gap={2}>
        <a
          href='https://www.climbingforchange.ca/'
          target='_blank'
          rel='noreferrer'
        >
          <img
            src={C4CHorizontalGreenLogo}
            alt='Climbing for Change Logo'
            style={{ maxWidth: '15.5rem', width: 'auto' }}
          />
        </a>

        <Paper elevation={3} sx={{ padding: 4, width: 300 }}>
          <Typography variant='h5' textAlign='center' marginBottom={2}>
            Admin Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin='normal'
              required
            />
            <TextField
              fullWidth
              autoComplete=''
              label='Password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin='normal'
              required
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ marginTop: 2 }}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Box>
    </Box>
  )
}

export default AdminLogin
