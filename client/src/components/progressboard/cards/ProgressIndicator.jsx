import { alpha, Box, CircularProgress, Typography } from '@mui/material'
import theme from '../../../styles/theme'

const ProgressIndicator = ({ progress, label, color, shadow }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '4px',
        backgroundColor: alpha(theme.palette.background.paper, 0.5),
        boxShadow: '0px 3px 0 rgba(0, 0, 0, 0.3)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '4px',
          p: { md: 4, lg: 2 },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            position: 'relative',
            aspectRatio: '1',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress
            variant="determinate"
            value={100}
            thickness={5}
            size={'100%'}
            sx={{
              width: '100%',
              height: '100%',
              color: alpha(theme.palette.primary.main, 0.75),
              filter: 'drop-shadow(0 0 4px rgba(0, 0, 0, 0.3))',
            }}
          />
          <CircularProgress
            variant="determinate"
            value={progress}
            thickness={5}
            size={'100%'}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              color: color,
              filter: shadow,
              '& .MuiCircularProgress-circle': {
                strokeLinecap: 'round',
              },
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                fontSize: { md: '1.2rem', lg: '1.35rem', xl: '1.5rem' },
                letterSpacing: '0.1rem',
                color: 'primary.main',
                textTransform: 'uppercase',
              }}
            >
              {label}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ProgressIndicator
