import { Box, CircularProgress } from '@mui/material'
import { Suspense,useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import AlertDisplay from './components/AlertDisplay'
import SideBar from './components/shared/SideBar'
import TopAppBar from './components/shared/TopAppBar'

function Layout() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const navigate = useNavigate()

  const toggleDrawer = (open)  => {
    setDrawerOpen(open)
  }

  const logout = async (e) => {
    // TODO: Implement full logout
    e.preventDefault()
    navigate('/login')
  }

  return (
    <>
      <header>
        {/* Pass a function to onMenuClick so it triggers on event */}
        <TopAppBar onMenuClick={() => toggleDrawer(true)} onLogout={logout} />
      </header>
      <nav>
        <SideBar open={drawerOpen} toggleDrawer={toggleDrawer} />
      </nav>
      <main>
        <Box
          component="section"
          sx={{
            paddingTop: '4rem',
            paddingLeft: '1rem',
            minHeight: '100vh',
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
                  minHeight: '60vh',
                }}
              >
                <CircularProgress />
              </Box>
            }
          >
            <AlertDisplay />
            <Outlet />
          </Suspense>
        </Box>
      </main>
    </>
  )
}

export default Layout
