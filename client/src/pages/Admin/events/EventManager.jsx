import React, { useState } from 'react';
import EventsTable from '../../../components/admin/forms/eventforms/EventTable';
import C4CHorizontalGreenLogo from '../../../assets/C4C-branding/Climbing-For-Change-Full-Horizontal_Green.png';
import SearchBar from "../../../components/admin/forms/eventforms/SearchBar";
import Button from '@mui/material/Button';


import { Box, Typography } from '@mui/material';
import AddEventModal from '../../../components/admin/modals/EventModal.jsx';

const EventManager = () => {
  const [openPopup, setOpenPopup] = useState(false);
   const [searchTerm, setSearchTerm] = useState(''); 

  const handleOpenPopup = () => setOpenPopup(true);
  const handleClosePopup = () => setOpenPopup(false);

  const handleAddEvent = (eventData) => {
    handleClosePopup();
  };

  return (
    <Box sx={{ px: 4, py: 3 }}>
      <a href="https://www.climbingforchange.ca/" target="_blank" rel="noopener noreferrer">
        <img src={C4CHorizontalGreenLogo} alt="Climbing for Change Logo" height={100} />
      </a>

      <Typography variant="h4" mt={2} mb={2}>
        Events
      </Typography>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
      <SearchBar setSearchTerm={setSearchTerm} />
        <Button
          variant="contained"
          sx={{ backgroundColor: '#c9d82c', color: 'black', '&:hover': { backgroundColor: '#b3c623'}}}
          onClick={handleOpenPopup}
        >Add Event</Button>
      </div>
      
      <EventsTable searchTerm={searchTerm} />

      <AddEventModal
        open={openPopup}
        onClose={handleClosePopup}
        onAdd={handleAddEvent}
      />
    </Box>
  );
};

export default EventManager;