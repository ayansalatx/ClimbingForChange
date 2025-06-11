import React from 'react';
import { Button } from '@mui/material';

const CancelButton = ({ onClick, label = "Cancel" }) => {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      sx={{
        borderColor: '#3DB7C6',
        color: '#3DB7C6',
        '&:hover': {
          borderColor: '#3DB7C6',
          backgroundColor: 'rgba(61, 183, 198, 0.08)',
        },
      }}
    >
      {label}
    </Button>
  );
};

export default CancelButton;