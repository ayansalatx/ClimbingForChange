import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./components/shared/Landing";
import ProgressBoard from "./pages/Progress/ProgressBoard";
import ProgressBoardFullscreen from "./pages/Progress/ProgressBoardFullscreen";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import EventManager from "./pages/Admin/EventManager";
import ParticipantManager from "./pages/Admin/ParticipantManager";
import MountainManager from "./pages/Admin/MountainManager";
import LocationManager from "./pages/Admin/LocationManager";


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
