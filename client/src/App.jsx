import './App.css'

import { ThemeProvider } from '@mui/material'
import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Landing from './components/shared/Landing'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminLogin from './pages/admin/AdminLogin'
import EventManager from './pages/admin/events/EventManager'
import LocationManager from './pages/admin/locations/LocationManager'
import MountainManager from './pages/admin/mountains/MountainManager'
import ParticipantManager from './pages/admin/participants/ParticipantManager'
import LoadingSpinner from './components/shared/LoadingSpinner.jsx'
import theme from './styles/theme'
import Layout from './Layout.jsx'

const ProgressBoard = React.lazy(
  () =>
    new Promise(
      (resolve) =>
        setTimeout(
          () => resolve(import('./pages/progress/ProgressBoard')),
          1000
        ) // 1 second delay
    )
)

const ProgressBoardFullscreen = React.lazy(
  () => import('./pages/progress/ProgressBoardFullscreen')
)

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* <CssBaseline/> */}
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />

          <Route
            path="/progress"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <ProgressBoard />
              </Suspense>
            }
          />
          <Route
            path="/progress/fullscreen"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <ProgressBoardFullscreen />
              </Suspense>
            }
          />

          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="events" element={<EventManager />} />
            <Route path="participants" element={<ParticipantManager />} />
            <Route path="mountains" element={<MountainManager />} />
            <Route path="locations" element={<LocationManager />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
