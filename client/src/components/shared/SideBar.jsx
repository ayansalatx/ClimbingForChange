import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import PlaceIcon from '@mui/icons-material/Place';
import TerrainIcon from '@mui/icons-material/Terrain';
import UploadIcon from '@mui/icons-material/Upload';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import C4CBanner from '../../assets/C4C-branding/Climbing-For-Change-Full-Horizontal_Green.png';

import { useNavigate } from 'react-router-dom';

const SideBar = ({ open, toggleDrawer }) => {
  const navigate = useNavigate();

  // Navigation List Definitions
  const dashboardList = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      onClick: () => navigate('/admin'),
    },
  ];

  const manageList = [
    {
      text: 'Events',
      icon: <EventIcon />,
      onClick: () => navigate('/admin/events'),
    },
    {
      text: 'Participants',
      icon: <PeopleIcon />,
      onClick: () => navigate('/admin/participants'),
    },
    {
      text: 'Locations',
      icon: <PlaceIcon />,
      onClick: () => navigate('/admin/locations'),
    },
    {
      text: 'Mountains',
      icon: <TerrainIcon />,
      onClick: () => navigate('/admin/mountains'),
    },
  ];


  const quickAccessList = [
    {
      text: 'Upload Participants',
      icon: <UploadIcon />,
      onClick: () => navigate('/admin'),
    },
    {
      text: 'Add Event',
      icon: <AddCircleIcon />,
      onClick: () => navigate('/admin'),
    },
  ];

  return (
    <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
      <Box
        sx={{
          width: 250,
          height: '100%',
          backgroundColor: '#1B1354',
          color: '#fff',
        }}
      >
        <Box sx={{ textAlign: 'center', p: 2 }}>
          <a
            href="https://www.climbingforchange.ca/"
            target="_blank"
          >
            <img src={C4CBanner} alt="Climbing for Change Logo" height={70} />
          </a>
        </Box>

        <List>
          {dashboardList.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={item.onClick}>
                <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ backgroundColor: '#fff', opacity: 0.2 }} />

        <Box sx={{ pl: 2, pt: 1 }}>
          <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 'bold' }}>
            Manage
          </Typography>
        </Box>
        <List>
          {manageList.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={item.onClick}>
                <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ pl: 2, pt: 2 }}>
          <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 'bold' }}>
            Quick Access
          </Typography>
        </Box>
        <List>
          {quickAccessList.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={item.onClick}>
                <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default SideBar;
