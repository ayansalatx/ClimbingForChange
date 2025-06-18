import { Box } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

import C4Clogo from '../../assets/C4C-branding/Climbing-For-Change-Logo_Green.png'

const Landing = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        bgcolor: 'primary.main',
        flexDirection: 'column',
        alignContent: 'center',
        color: 'background.default'
      }}
    >
      <div className="p-6 text-center">
        <a
          href="https://www.climbingforchange.ca/"
          target="_blank"
          rel="noreferrer"
        >
          <img src={C4Clogo} alt="Climbing for Change Logo" height={250} />
        </a>
        <h1 style={{ letterSpacing: '0.05rem' }}>
          Welcome to the C4C Team Two WebApp
        </h1>
        <h2 style={{ letterSpacing: '0.075rem' }}>
          This is a temporary page while development is underway.
        </h2>
        <h3 style={{ letterSpacing: '0.075rem' }}>
          Visit these existing pages that are currently in development:
        </h3>
        <nav>
          <ul style={{ listStyle: 'none' }}>
            <li>
              <Link to="/progress">Progress Board</Link>
            </li>
            <li>
              <Link to="/admin">Admin Dashboard</Link>
            </li>
          </ul>
        </nav>
      </div>
    </Box>
  )
}

export default Landing
