import { Box } from '@mui/material'
import { useState } from 'react'

const CustomTooltip = ({ title, children, placement = 'top' }) => {
  const [visible, setVisible] = useState(false)

  const handleMouseEnter = () => setVisible(true)
  const handleMouseLeave = () => setVisible(false)

  const getTooltipPosition = () => {
    switch (placement) {
      case 'top':
        return {
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: '8px',
        }
      case 'bottom':
        return {
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginTop: '8px',
        }
      case 'left':
        return {
          right: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginRight: '8px',
        }
      case 'right':
        return {
          left: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginLeft: '8px',
        }
      default:
        return {
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: '8px',
        }
    }
  }

  return (
    <Box
      sx={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {visible && (
        <Box
          sx={{
            'position': 'absolute',
            'backgroundColor': (theme) => theme.palette.info.main,
            'color': (theme) => theme.palette.primary.main,
            'fontSize': {
              sm: '0.65rem',
              md: '0.65rem',
              lg: '0.75rem',
              xl: '0.9rem',
            },
            'px': 1,
            'py': 0.5,
            'borderRadius': 0.5,
            'boxShadow': 3,
            'zIndex': 9999,
            'whiteSpace': 'nowrap',
            'pointerEvents': 'none',
            ...getTooltipPosition(),
            // Add arrow for tooltip
            '&::after': placement === 'top' && {
              content: '""',
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '4px solid transparent',
              borderRight: '4px solid transparent',
              borderTop: (theme) => `4px solid ${theme.palette.info.main}`,
            },
          }}
        >
          {title}
        </Box>
      )}
    </Box>
  )
}

export default CustomTooltip
