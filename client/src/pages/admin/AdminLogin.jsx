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
      displayAlert('Failed', result.error.message, 'error')
      return
    }

    localStorage.setItem('token', result.data.token)
    displayAlert('Success', 'Successfully logged in', 'success')
    navigate('/admin')
  }

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      minHeight='100vh'
      px={2}
    >
      <AlertDisplay />
      <Paper elevation={3} sx={{ paddingTop: 0, width: '100%', maxWidth: 500 }}>
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          sx={{
            backgroundColor: 'primary.main',
            width: '100%',
            p: 3,
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            m: 0,
          }}
        >
          <a
            href='https://www.climbingforchange.ca/'
            target='_blank'
            rel='noreferrer'
          >
            <img
              src={C4CHorizontalGreenLogo}
              alt='Climbing for Change Logo'
              style={{ maxWidth: '15rem', width: 'auto' }}
            />
          </a>
        </Box>

        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          gap={2}
          sx={{ p: 4, pt: 4 }}
        >
          <Typography variant='h4' textTransform='uppercase' fontWeight='bold' fontStyle='italic' color='primary.main' textAlign='center' marginBottom={2}>
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
              sx={{ marginTop: 4, letterSpacing: '0.05rem', maxWidth: '50%' }}
            >
              Login
            </Button>
          </form>
        </Box>
      </Paper>
    </Box>
  )
}

export default AdminLogin
