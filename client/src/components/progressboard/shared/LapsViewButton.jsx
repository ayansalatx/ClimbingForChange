import { Button } from '@mui/material'

const LapsViewButton = ({ label, onClick }) => {
  return (
    <Button
      variant="contained"
      sx={{
        minHeight: { xxs: '1.5rem', sm: '2rem' },
        borderWidth: '3px',
        p: { xxs: 0.5, xs: 'auto' },
        fontSize: { xxs: '.9rem', sm: '1rem' },
        textTransform: 'uppercase',
        fontWeight: 'bold',
        letterSpacing: '.05rem',
        backgroundColor: 'info.main',
        color: 'primary.main',
        '&:hover': {
          backgroundColor: 'secondary.dark',
        },
      }}
      onClick={onClick}
    >
      {label}
    </Button>
  )
}

export default LapsViewButton
