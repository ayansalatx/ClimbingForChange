import LeaveIcon from '@mui/icons-material/Logout'
import { IconButton, Tooltip } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const ExitButton = ({ eventId }) => {
  const navigate = useNavigate()

  // Navigate to fullscreen page for large onsite display
  const handleClick = () => {
    if (eventId) {
      navigate(`/progress/team/${eventId}`, { replace: true })
    }
  }

  return (
    <Tooltip
      title={'Back to Team'}
      slotProps={{
        tooltip: {
          sx: {
            bgcolor: 'info.main',
            color: 'primary.main',
            fontSize: {
              xxs: '.85rem',
            },
            px: {
              xxs: 1,
            },
            py: {
              xxs: 0.5,
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
            sm: 'visible',
            md: 'hidden',
          },
          ml: '.25rem',
          color: 'primary.main',
          '&:hover': {
            color: 'primary.light',
          },
          p: {
            sm: '0.45rem',
            md: '0.5rem',
          },
        }}
      >
        <LeaveIcon
          sx={{
            transform: 'scaleX(-1)',
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

export default ExitButton
