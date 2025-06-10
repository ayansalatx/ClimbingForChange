import React, { useState } from 'react';
import MountainsTable from '../../../components/admin/forms/mountainforms/MountainTable.jsx';
import C4CHorizontalGreenLogo from '../../../assets/C4C-branding/Climbing-For-Change-Full-Horizontal_Green.png';
import SearchBar from '../../../components/admin/forms/mountainforms/SearchBar.jsx';

import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import AddMountainModal from '../../../components/admin/modals/MountainModal.jsx';

const Mountains = () => {
  const [openPopup, setOpenPopup] = useState(false);

  const handleOpenPopup = () => setOpenPopup(true);
  const handleClosePopup = () => setOpenPopup(false);

  const handleAddMountain = (mountainData) => {
    console.log('Added Mountain:', mountainData);
    handleClosePopup();
  };

  return (
    <Box sx={{ px: 4, py: 3 }}>
      <a href="https://www.climbingforchange.ca/" target="_blank" rel="noopener noreferrer">
        <img src={C4CHorizontalGreenLogo} alt="Climbing for Change Logo" height={100} />
      </a>

      <Typography variant="h4" mt={2} mb={2}>
        Mountains
      </Typography>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <SearchBar />
        <Button
          variant="contained"
          sx={{ backgroundColor: '#c9d82c', color: 'black', '&:hover': { backgroundColor: '#b3c623'}}}
          onClick={handleOpenPopup}
        >
          Add Mountain
        </Button>
      </div>
      
      <MountainsTable />

      <AddMountainModal
        open={openPopup}
        onClose={handleClosePopup}
        onAdd={handleAddMountain}
      />
    </Box>
  );
};

export default Mountains;
