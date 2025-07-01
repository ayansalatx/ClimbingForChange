import { Fullscreen } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const FullscreenToggleButton = ({ eventId }) => {
  const navigate = useNavigate()

  // Navigate to fullscreen page for large onsite display
  const handleClick = () => {
    navigate(`/progress/fullscreen/${eventId}`)
  }

  return (
    <Tooltip
      title="Fullscreen"
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: 'info.main',
            color: 'primary.main',
            fontSize: '0.75rem',
            borderRadius: .5,
            boxShadow: 3,
          },
        },
      }}
    >
      <IconButton
        onClick={handleClick}
        sx={{ ml: '.25rem', color: 'background.paper' }}
      >
        <Fullscreen fontSize="large" />
      </IconButton>
    </Tooltip>
  )
}

export default FullscreenToggleButton
