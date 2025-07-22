import './App.css'

import { CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import PrivateRoute from './components/admin/PrivateRoute'
import Landing from './components/shared/Landing'
import Layout from './Layout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminLogin from './pages/admin/AdminLogin'
import EventManager from './pages/admin/events/EventManager'
import HillManager from './pages/admin/hills/HillManager'
import LocationManager from './pages/admin/locations/LocationManager'
import MountainManager from './pages/admin/mountains/MountainManager'
import ParticipantManager from './pages/admin/participants/ParticipantManager'
import ParticipantUpload from './pages/admin/participants/ParticipantUpload'
import RFIDManager from './pages/admin/rfid/RFIDManager'
import TeamRFIDBatchManager from './pages/admin/rfid/TeamRFIDBatchManager.jsx'
import TeamsManager from './pages/admin/teams/TeamsManager'
import ProgressBoard from './pages/progressboard/ProgressBoard'
import ProgressBoardFullscreen from './pages/progressboard/ProgressBoardFullscreen'
import theme from './styles/theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/progress" element={<ProgressBoard />} />
          <Route
            path="/progress/fullscreen/:eventId"
            element={<ProgressBoardFullscreen />}
          />

          <Route path="/login" element={<AdminLogin />} />

          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path='events' element={<EventManager />} />
            <Route path='participants' element={<ParticipantManager />} />
            <Route path='upload' element={<ParticipantUpload />} />
            <Route path='mountains' element={<MountainManager />} />
            <Route path='locations' element={<LocationManager />} />  
            <Route path='teams' element={<TeamsManager />} />              
            <Route path='hills' element={<HillManager />} />
            <Route path='rfid' element={<RFIDManager />} />
            <Route path='team-rfid-batch' element={<TeamRFIDBatchManager />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
