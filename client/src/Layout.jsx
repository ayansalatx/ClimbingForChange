import { Box, CircularProgress } from '@mui/material'
import { Suspense, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import AlertDisplay from './components/AlertDisplay'
import Footer from './components/shared/Footer'
import SideBar from './components/shared/SideBar'
import TopAppBar from './components/shared/TopAppBar'

function Layout() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const navigate = useNavigate()

  const toggleDrawer = (open) => {
    setDrawerOpen(open)
  }

  const logout = () => {
    // TODO: Implement full logout
    navigate('/')
  }

  return (
    <>
      <header>
        <TopAppBar onMenuClick={() => toggleDrawer(true)} onLogout={logout} />
      </header>
      <nav>
        <SideBar open={drawerOpen} toggleDrawer={toggleDrawer} />
      </nav>
      <main>
        <Box
          component="section"
          sx={{
            width: '100vw',
            height: '100vh',
            paddingTop: '5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Suspense
            fallback={
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <CircularProgress />
              </Box>
            }
          >
            <AlertDisplay />
            <Outlet sx={{ padding: 0, margin: 0 }} />
          </Suspense>
        </Box>
        <Footer />
      </main>
    </>
  )
}

export default Layout
