import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Landing from './components/shared/Landing'
import ProgressBoard from "./pages/Progress/ProgressBoard";
import ProgressBoardFullscreen from "./pages/Progress/ProgressBoardFullscreen";
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import EventManager from './pages/Admin/events/EventManager';
import ParticipantManager from './pages/Admin/participants/ParticipantManager'
import MountainManager from './pages/Admin/mountains/MountainManager';
import LocationManager from './pages/Admin/locations/LocationManager';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/progress" element={<ProgressBoard />} />
        <Route path="/progress/fullscreen" element={<ProgressBoardFullscreen />} />
        <Route path="/login" element={<AdminLogin />} />

        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="events" element={<EventManager />} />
          <Route path="participants" element={<ParticipantManager />} />
          <Route path="mountains" element={<MountainManager />} />
          <Route path="locations" element={<LocationManager />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;