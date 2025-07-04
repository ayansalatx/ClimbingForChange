import HikingIcon from '@mui/icons-material/Hiking'
import WifiIcon from '@mui/icons-material/Wifi'
import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const ProgressBoardButton = ({ liveEventExists }) => {
  const navigate = useNavigate()
  return (
    <Button
      onClick={() => navigate('/progress')}
      variant="contained"
      sx={{
        maxHeight: '14rem',
        my: '1rem',
        bgcolor: 'primary.main',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        px: 2,
        borderRadius: '8px',
      }}
    >
      <Typography
        variant="h6"
        fontSize="1.75rem"
        color="background.paper"
        textTransform="uppercase"
        fontWeight="bold"
        letterSpacing="0.1rem"
      >
        Progress Board
      </Typography>
      <HikingIcon sx={{ color: 'secondary.main', fontSize: liveEventExists ? '4rem' : '5.5rem' }} />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          visibility={liveEventExists ? 'visible': 'hidden'}
          variant="h6"
          fontSize={liveEventExists ? '1.75rem' : '0'}
          color={liveEventExists ? 'secondary.main' : 'background.paper'}
          textTransform="uppercase"
          fontWeight="bold"
          letterSpacing="0.1rem"
        >
          Live Event
        </Typography>
        <WifiIcon
          visibility={liveEventExists ? 'visible': 'hidden'}
          sx={{ color: 'secondary.main', fontSize: liveEventExists ? '1.75rem' : '0', ml: '.5rem' }}
        ></WifiIcon>
      </Box>
    </Button>
  )
}
export default ProgressBoardButton
