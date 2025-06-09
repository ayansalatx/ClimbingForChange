import { useState } from "react";
import TopAppBar from "../../components/shared/TopAppBar";
import SideBar from "../../components/shared/SideBar";
import { Box } from "@mui/material";
import { useNavigate, Outlet } from "react-router-dom"; // <-- add Outlet

const AdminDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (state) => () => {
    setDrawerOpen(state);
  };

  const logout = () => {
    // TODO: Implement full logout
    navigate('/progress');
  };

  return (
    <>
      <TopAppBar onMenuClick={toggleDrawer(true)} onLogout={logout} />
      <SideBar open={drawerOpen} toggleDrawer={toggleDrawer} />
      <Box sx={{ paddingTop: "64px", paddingLeft: "16px" }}>
        <Outlet /> {/* This is where the other pages render */}
      </Box>
    </>
  );
};

export default AdminDashboard;
