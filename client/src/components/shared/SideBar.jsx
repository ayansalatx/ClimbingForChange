import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import PlaceIcon from '@mui/icons-material/Place';
import TerrainIcon from '@mui/icons-material/Terrain';
import UploadIcon from '@mui/icons-material/Upload';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import C4CBanner from '../../assets/C4C-branding/Climbing-For-Change-Full-Horizontal_Green.png';

const SideBar = ({ open, toggleDrawer }) => {
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, onClick: () => console.log('Dashboard clicked') },
    { text: 'Events', icon: <EventIcon />, onClick: () => console.log('Events clicked') },
    { text: 'Participants', icon: <PeopleIcon />, onClick: () => console.log('Participants clicked') },
    { text: 'Locations', icon: <PlaceIcon />, onClick: () => console.log('Locations clicked') },
    { text: 'Mountains', icon: <TerrainIcon />, onClick: () => console.log('Mountains clicked') },
    { text: 'Upload Participants', icon: <UploadIcon />, onClick: () => console.log('Upload clicked') },
    { text: 'Add Event', icon: <AddCircleIcon />, onClick: () => console.log('Add Event clicked') },
  ];

  return (
    <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
      <Box sx={{ width: 250 }}>
        <Box sx={{ textAlign: 'center', p: 2 }}>
          <a href="https://www.climbingforchange.ca/" target="_blank">
            <img src={C4CBanner} alt="Climbing for Change Logo" height={70} />
          </a>
        </Box>

        <List>
          {menuItems.map((item, index) => (
            <ListItem
              button
              key={index}
              onClick={() => {
                item.onClick();
              }}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default SideBar;
