import { Fullscreen } from '@mui/icons-material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const FullscreenToggleButton = ({ eventId }) => {
  const navigate = useNavigate()

  // Navigate to fullscreen page for large onsite display
  const handleClick = () => {
    if (eventId) {
      navigate(`/progress/fullscreen/${eventId}`)
    }
  }

  return (
    <Tooltip
      title={
        eventId
          ? (
            'Fullscreen'
          )
          : (
            <Box display="flex" alignItems="center" gap={0.5}>
              <ErrorOutlineIcon sx={{ fontSize: '1.15rem' }} />
              <Typography>Select Event</Typography>
            </Box>
          )
      }
      slotProps={{
        tooltip: {
          sx: {
            bgcolor: 'info.main',
            color: 'primary.main',
            fontSize: {
              sm: '0.65rem',
              md: '0.65rem',
              lg: '0.75rem',
              xl: '0.9rem',
            },
            px: {
              sm: 1,
            },
            py: {
              sm: 0.5,
            },
            borderRadius: 0.5,
            boxShadow: 3,
          },
        },
      }}
    >
      <IconButton
        onClick={handleClick}
        sx={{
          visibility: {
            xs: 'hidden',
            sm: 'visible',
            md: 'visible',
            lg: 'visible',
            xl: 'visible',
          },
          ml: '.25rem',
          color: 'background.paper',
          p: {
            sm: '0.45rem',
            md: '0.5rem',
          },
        }}
      >
        <Fullscreen
          sx={{
            fontSize: {
              sm: '1.5rem',
              md: '1.75rem',
              lg: '2rem',
              xl: '2.25rem',
            },
          }}
        />
      </IconButton>
    </Tooltip>
  )
}

export default FullscreenToggleButton
