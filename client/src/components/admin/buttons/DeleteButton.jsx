import React from 'react';
import { Button } from '@mui/material';

const DeleteButton = ({ onClick, label = "Delete" }) => {
  return (
    <Button variant="contained" color="error" onClick={onClick}>
      {label}
    </Button>
  );
};

export default DeleteButton;