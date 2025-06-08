import { useState } from "react";
import TopAppBar from "../../components/shared/TopAppBar";
import SideBar from "../../components/shared/SideBar";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (state) => () => {
    setDrawerOpen(state);
  };

  const logout = () => {
    //TODO add logging out fully
    navigate('/progress')
  }

  return (
    <>
      <TopAppBar onMenuClick={toggleDrawer(true)} onLogout={logout} />
      <SideBar open={drawerOpen} toggleDrawer={toggleDrawer} />
      <Box sx={{ paddingTop: "64px", paddingLeft: "16px" }}>
        <h1>In Development</h1>
      </Box>
    </>
  );
};

export default AdminDashboard;
