import Hiking from '@mui/icons-material/Hiking'
import { Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const ProgressBoardButton = () => {
  const navigate = useNavigate()
  return (
    <Button
      onClick={() => navigate('/progress')}
      variant="contained"
      sx={{
        height: '3rem',
        bgcolor: 'primary.main',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        gap: 1.5,
        px: 2,
      }}
    >
      <Typography
        variant="h6"
        fontSize="large"
        color="background.paper"
        textTransform="uppercase"
        fontWeight="bold"
        letterSpacing="0.1rem"
      >
        Progress Board
      </Typography>
      <Hiking sx={{ color: 'secondary.main', fontSize: '2rem' }} />
    </Button>
  )
}
export default ProgressBoardButton
