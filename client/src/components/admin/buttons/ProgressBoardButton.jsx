import HikingIcon from '@mui/icons-material/Hiking'
import WifiIcon from '@mui/icons-material/Wifi'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const ProgressBoardButton = ({ liveEventExists }) => {
  const navigate = useNavigate()
  return (
    <Button
      onClick={() => navigate('/progress')}
      variant='contained'
      sx={{
        bgcolor: 'primary.main',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'nowrap',
        p: 1,
        borderRadius: '5px',
      }}
    >
      {liveEventExists ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            px: 1,
            gap: 1,
          }}
        >
          <WifiIcon
            sx={{
              color: 'secondary.main',
              fontSize: {
                xxs: '1.2rem',
                md: '1.4rem',
                lg: '1.5rem',
                xl: '2rem',
              },
            }}
          />
          <Box sx={{ px: { xxs: 0.75, lg: 1 }, py: { xxs: 0.2, lg: 0.5 } }}>
            <Typography
              variant='h6'
              color='secondary.main'
              textTransform='uppercase'
              fontWeight='bold'
              letterSpacing='0.1rem'
              lineHeight={{
                xxs: '1rem',
                md: '1.3rem',
                lg: '1.45rem',
                xl: '1.75rem',
              }}
              fontSize={{
                xxs: '1rem',
                md: '1.3rem',
                lg: '1.45rem',
                xl: '1.75rem',
              }}
            >
              Live Event
            </Typography>
          </Box>

          <ExitToAppIcon
            sx={{
              color: 'background.paper',
              fontSize: {
                xxs: '1.2rem',
                md: '1.4rem',
                lg: '1.5rem',
                xl: '1.6rem',
              },
            }}
          />
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ px: { xxs: 0.75, lg: 1 }, py: { xxs: 0.2, lg: 0.5 } }}>
            <Typography
              variant='h6'
              color='background.paper'
              textTransform='uppercase'
              fontWeight='bold'
              letterSpacing='0.1rem'
              lineHeight={{
                xxs: '1rem',
                md: '1.3rem',
                lg: '1.45rem',
                xl: '1.75rem',
              }}
              fontSize={{
                xxs: '1rem',
                md: '1.3rem',
                lg: '1.45rem',
                xl: '1.75rem',
              }}
            >
              Progress Board
            </Typography>
          </Box>
          <HikingIcon
            sx={{
              color: 'secondary.main',
              fontSize: {
                xxs: '1.2rem',
                md: '1.4rem',
                lg: '1.5rem',
                xl: '1.75rem',
              },
            }}
          />
        </Box>
      )}
    </Button>
  )
}
export default ProgressBoardButton
