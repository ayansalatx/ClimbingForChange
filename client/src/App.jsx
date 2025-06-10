import './App.css'

import React from 'react'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'

import Landing from './components/shared/Landing'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminLogin from './pages/admin/AdminLogin'
import EventManager from './pages/admin/events/EventManager'
import LocationManager from './pages/admin/locations/LocationManager'
import MountainManager from './pages/admin/mountains/MountainManager'
import ParticipantManager from './pages/admin/participants/ParticipantManager'
import ProgressBoard from './pages/progress/ProgressBoard'
import ProgressBoardFullscreen from './pages/progress/ProgressBoardFullscreen'



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/progress' element={<ProgressBoard />} />
        <Route
          path='/progress/fullscreen'
          element={<ProgressBoardFullscreen />}
        />

        <Route path='/login' element={<AdminLogin />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/admin/events' element={<EventManager />} />
        <Route path='/admin/participants' element={<ParticipantManager />} />
        <Route path='/admin/mountains' element={<MountainManager />} />
        <Route path='/admin/locations' element={<LocationManager />} />
      </Routes>
    </Router>
  )
}

export default App
