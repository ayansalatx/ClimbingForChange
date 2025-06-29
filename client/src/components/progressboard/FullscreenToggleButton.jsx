import { Fullscreen } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const FullscreenToggleButton = ({eventId}) => {
  const navigate = useNavigate()

  // Navigate to fullscreen page for large onsite display
  const handleClick = () => {
    navigate(`/progress/fullscreen/${eventId}`)
  }

  return (
    <Tooltip title='Fullscreen'>
      <IconButton onClick={handleClick}  sx={{ ml: '.25rem' }} >
        <Fullscreen />
      </IconButton>
    </Tooltip>
  )
}

export default FullscreenToggleButton
