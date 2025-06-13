import { Button } from '@mui/material';

export default function CreateButton({ onClick, disabled }) {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: '#191447',
        '&:hover': {
          backgroundColor: '#121234',
        },
        color: '#fff',
      }}
      onClick={onClick}
      disabled={disabled}
    >
      Create
    </Button>
  );
}