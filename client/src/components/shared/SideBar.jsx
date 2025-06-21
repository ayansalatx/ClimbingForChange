import AddCircleIcon from '@mui/icons-material/AddCircle'
import DashboardIcon from '@mui/icons-material/Dashboard'
import EventIcon from '@mui/icons-material/Event'
import PeopleIcon from '@mui/icons-material/People'
import PlaceIcon from '@mui/icons-material/Place'
import TerrainIcon from '@mui/icons-material/Terrain'
import UploadIcon from '@mui/icons-material/Upload'
import ForkRight from '@mui/icons-material/ForkRight'
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

import C4CBanner from '../../assets/C4C-branding/Climbing-For-Change-Full-Horizontal_Green.png'

const SideBar = ({ open, toggleDrawer }) => {
  const navigate = useNavigate()

  // Navigation List Definitions
  const dashboardList = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      onClick: () => navigate('/admin'),
    },
  ]

  const manageList = [
    {
      text: 'Events',
      icon: <EventIcon />,
      onClick: () => navigate('/admin/events'),
    },
    {
      text: 'Mountains',
      icon: <TerrainIcon />,
      onClick: () => navigate('/admin/mountains'),
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
  ]

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
  ]

  return (
    <Drawer anchor="left" open={open} onClose={() => toggleDrawer(false)}>
      <Box
        sx={{
          width: 300,
          height: '100%',
          backgroundColor: 'primary.main',
          color: 'background.paper',
        }}
      >
        <Box sx={{ p: 2, pl: 3, mt: 2 }}>
          <a
            href="https://www.climbingforchange.ca/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={C4CBanner} alt="Climbing for Change Logo" height={80} />
          </a>
        </Box>

        <List disablePadding>
          {dashboardList.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={() => {
                  item.onClick()
                  toggleDrawer(false)
                }}
              >
                <ListItemIcon sx={{ color: 'background.paper', pl: 1.5 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  slotProps={{
                    primary: {
                      sx: {
                        fontSize: '1.35rem',
                      },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ backgroundColor: 'background.paper', opacity: 0.2 }} />

        <Box sx={{ pl: 3.5, pt: 3, pb: 1 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontSize: '1.5rem',
              textTransform: 'uppercase',
              letterSpacing: '.1rem',
            }}
          >
            Manage
          </Typography>
        </Box>
        <List disablePadding sx={{ pb: 0.5 }}>
          {manageList.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ pl: 1 }}>
              <ListItemButton
                onClick={() => {
                  item.onClick()
                  toggleDrawer(false)
                }}
                sx={{ py: 0.5 }}
              >
                <ListItemIcon sx={{ color: 'background.paper', pl: 1.75 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ pl: 3.5, pt: 1, pb: 1 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontSize: '1.5rem',
              textTransform: 'uppercase',
              letterSpacing: '.05rem',
            }}
          >
            Quick Access
          </Typography>
        </Box>
        <List disablePadding>
          {quickAccessList.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ pl: 1 }}>
              <ListItemButton
                onClick={() => {
                  item.onClick()
                  toggleDrawer(false)
                }}
                sx={{ py: 0.5 }}
              >
                <ListItemIcon sx={{ color: 'background.paper', pl: 1.5 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}

export default SideBar
