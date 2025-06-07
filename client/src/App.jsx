import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Landing from './components/Landing'
import ProgressBoard from './pages/ProgressBoard';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import EventManager from './pages/EventManager';
import ParticipantManager from './pages/ParticipantManager';
import MountainManager from './pages/MountainManager';
import LocationManager from './pages/LocationManager';
import ProgressBoardFullscreen from './pages/ProgressBoardFullscreen';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/progress" element={<ProgressBoard/>}>
          <Route path="/fullscreen" element={<ProgressBoardFullscreen />}/>
        </Route>
        <Route path="/login" element={<AdminLogin />}/>
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path = "events" element={<EventManager />}/>
          <Route path = "participants" element={<ParticipantManager />}/>
          <Route path = "mountains" element={<MountainManager />}/>
          <Route path = "locations" element={<LocationManager />}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
