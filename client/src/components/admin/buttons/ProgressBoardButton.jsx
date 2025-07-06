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
        p: 2,
        borderRadius: '6px',
      }}
    >
      <Typography
        variant="h6"
        fontSize="1.75rem"
        color="background.paper"
        textTransform="uppercase"
        fontWeight="bold"
        letterSpacing="0.1rem"
        lineHeight="1.75rem"
        sx={{ pb: 1, fontSize: { xxs: '1.2rem', md: '1.4rem', xl: '1.75rem' } }}
      >
        Progress Board
      </Typography>
      <HikingIcon
        sx={{
          color: 'secondary.main',
          fontSize: liveEventExists ? { xxs: '3rem', md: '3.5rem', xl: '5rem' } : { xxs: '2rem', md: '3rem', xl: '4rem' },
        }}
      />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          visibility={liveEventExists ? 'visible' : 'hidden'}
          variant="h6"
          color={liveEventExists ? 'secondary.main' : 'background.paper'}
          textTransform="uppercase"
          fontWeight="bold"
          letterSpacing="0.1rem"
          sx={{ fontSize: liveEventExists ? { xxs: '1.2rem', md: '1.4rem', xl: '1.75rem' } : 0 }}
        >
          Live Event
        </Typography>
        <WifiIcon
          visibility={liveEventExists ? 'visible' : 'hidden'}
          sx={{
            color: 'secondary.main',
            fontSize: liveEventExists ? { xxs: '1.2rem', md: '1.4rem', xl: '1.75rem' } : 0,
            ml: '.5rem',
            
          }}
        ></WifiIcon>
      </Box>
    </Button>
  )
}
export default ProgressBoardButton
