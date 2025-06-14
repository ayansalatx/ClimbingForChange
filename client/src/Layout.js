// import React, { useState } from 'react'
// import { Outlet, useNavigate } from 'react-router-dom'
// import TopAppBar from './components/shared/TopAppBar'
// import SideBar from './components/shared/SideBar'

// function Layout() {
//   const [drawerOpen, setDrawerOpen] = useState(false)
//   const navigate = useNavigate()

//   const toggleDrawer = (state) => () => {
//     setDrawerOpen(state)
//   }

//   const logout = () => {
//     // TODO: Implement full logout
//     navigate('/')
//   }
//   return (
//     <>
//       <header>
//         <TopAppBar onMenuClick={toggleDrawer(true)} onLogout={logout} />
//       </header>
//       <nav>
//         <SideBar open={drawerOpen} toggleDrawer={toggleDrawer} />
//       </nav>
//       <Box component="main" sx={{ paddingTop: '4rem', paddingLeft: '1rem' }}>
//         <Outlet />
//       </Box>
//     </>
//   )
// }
