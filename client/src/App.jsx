import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Landing from './components/shared/Landing'
import ProgressBoard from "./pages/progress/ProgressBoard";
import ProgressBoardFullscreen from "./pages/progress/ProgressBoardFullscreen";
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import EventManager from './pages/admin/Events/EventManager';
import ParticipantManager from './pages/admin/Participants/ParticipantManager'
import MountainManager from './pages/admin/Mountains/MountainManager';
import LocationManager from './pages/admin/Locations/LocationManager';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/progress" element={<ProgressBoard />} />
        <Route
          path="/progress/fullscreen"
          element={<ProgressBoardFullscreen />}
        />

        <Route path="/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/events" element={<EventManager />} />
        <Route path="/admin/participants" element={<ParticipantManager />} />
        <Route path="/admin/mountains" element={<MountainManager />} />
        <Route path="/admin/locations" element={<LocationManager />} />
      </Routes>
    </Router>
  );
}

export default App;
