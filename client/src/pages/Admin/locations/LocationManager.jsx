
import LocationTable from '../../../components/admin/forms/locationforms/LocationTable';
import C4CHorizontalGreenLogo from '../../../assets/C4C-branding/Climbing-For-Change-Full-Horizontal_Green.png';
import SearchBar from "../../../components/admin/forms/locationforms/SearchBar";
import Button from '@mui/material/Button';

import AddLocationModal from '../../../components/admin/modals/LocationModal.jsx';
import React, { useState } from 'react';

const LocationManager = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddLocation = (newLocation) => {
    console.log('Add location:', newLocation);
      setPopupOpen(false);
  };

  
  return (

    <div>
      <a href="https://www.climbingforchange.ca/" target="_blank">
        <img src={C4CHorizontalGreenLogo} alt="Climbing for Change Logo" height={150} />
      </a>
      <h1>Locations</h1>
     
     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <Button
          variant="contained"
          sx={{ backgroundColor: '#c9d82c', color: 'black', '&:hover': { backgroundColor: '#b3c623'}}}
          onClick={() => setPopupOpen(true)}
        >Add Location</Button>
      </div>

      <LocationTable searchTerm={searchTerm} />
      
      <AddLocationModal
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        onAdd={handleAddLocation}
      />

    </div>
  );
};

export default LocationManager;