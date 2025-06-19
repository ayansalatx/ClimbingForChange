import './App.css'

import { CssBaseline,ThemeProvider } from '@mui/material'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Landing from './components/shared/Landing'
import Layout from './Layout'
import AdminDashboard from './pages/admin/AdminDashboard'
import EventManager from './pages/admin/events/EventManager'
import LocationManager from './pages/admin/locations/LocationManager'
import MountainManager from './pages/admin/mountains/MountainManager'
import ParticipantManager from './pages/admin/participants/ParticipantManager'
import ProgressBoard from './pages/progressboard/ProgressBoard'
import ProgressBoardFullscreen from './pages/progressboard/ProgressBoardFullscreen'
import theme from './styles/theme'
import ParticipantUpload from './pages/admin/participants/ParticipantUpload'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path="/progress" element={<ProgressBoard />} />
          <Route
            path="/progress/fullscreen"
            element={<ProgressBoardFullscreen />}
          />

          <Route path='/admin' element={<Layout />}>
            <Route index element={<AdminDashboard />} />
            <Route path='events' element={<EventManager />} />
            <Route path='participants' element={<ParticipantManager />} />
            <Route path='upload' element={<ParticipantUpload />} />
            <Route path='mountains' element={<MountainManager />} />
            <Route path='locations' element={<LocationManager />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
